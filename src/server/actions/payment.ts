"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireAuth, requireAdmin } from "@/lib/auth/guards";
import { paymentRepo } from "@/server/repositories/payment";
import { licenseRepo } from "@/server/repositories/license";
import { plans, checkoutMethods } from "@/config/plans";
import { sendDiscordWebhook } from "@/lib/discord/webhook";

const orderSchema = z.object({
  plan: z.enum(["WEEKLY", "MONTHLY", "LIFETIME"]),
  method: z.enum(checkoutMethods),
});

export async function createOrder(formData: FormData) {
  const session = await requireAuth();
  const { plan, method } = orderSchema.parse({
    plan: formData.get("plan"),
    method: formData.get("method"),
  });
  const payment = await paymentRepo.create({
    userId: session.user.id,
    plan,
    method,
    amount: plans[plan].price,
  });
  redirect(`/dashboard/orders/${payment.id}`);
}

const txSchema = z.object({ id: z.string().cuid(), txRef: z.string().trim().min(6).max(200) });

export async function submitPayment(formData: FormData) {
  const session = await requireAuth();
  const { id, txRef } = txSchema.parse({ id: formData.get("id"), txRef: formData.get("txRef") });
  const payment = await paymentRepo.findById(id);
  if (!payment || payment.userId !== session.user.id || payment.status !== "PENDING") {
    redirect("/dashboard");
  }
  await paymentRepo.submitTx(id, txRef);

  const url = process.env.DISCORD_WEBHOOK_LOGS;
  if (url) {
    await sendDiscordWebhook(url, {
      embeds: [{
        title: "💸 Payment to review",
        color: 0x7c4dff,
        fields: [
          { name: "User", value: session.user.name ?? session.user.id, inline: true },
          { name: "Plan", value: `${payment.plan} — €${payment.amount}`, inline: true },
          { name: "Method", value: payment.method, inline: true },
          { name: "Tx / ref", value: txRef.slice(0, 200) },
        ],
        timestamp: new Date().toISOString(),
      }],
    });
  }
  revalidatePath(`/dashboard/orders/${id}`);
}

export async function confirmPayment(formData: FormData) {
  await requireAdmin();
  const id = z.string().cuid().parse(formData.get("id"));
  const payment = await paymentRepo.findById(id);
  if (!payment || payment.status === "CONFIRMED") return;

  const expiresAt =
    payment.plan === "WEEKLY" ? new Date(Date.now() + 7 * 86400000)
    : payment.plan === "MONTHLY" ? new Date(Date.now() + 30 * 86400000)
    : undefined;

  const license = await licenseRepo.create({ type: payment.plan, userId: payment.userId, expiresAt });
  await paymentRepo.setStatus(id, "CONFIRMED", license.id);
  revalidatePath("/admin/payments");
}

export async function rejectPayment(formData: FormData) {
  await requireAdmin();
  const id = z.string().cuid().parse(formData.get("id"));
  await paymentRepo.setStatus(id, "REJECTED");
  revalidatePath("/admin/payments");
}

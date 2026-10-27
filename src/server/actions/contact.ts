"use server";

import { z } from "zod";
import { contactRepo } from "@/server/repositories/contact";
import { notifyContact } from "@/lib/discord/webhook";
import { checkRateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(3).max(200),
  message: z.string().min(10).max(5000),
});

export type ContactFormState = { success: boolean; error?: string };

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const h = await headers();
  const ip = h.get("x-forwarded-for") ?? "unknown";
  const rl = await checkRateLimit(`contact:${ip}`);
  if (!rl.success) return { success: false, error: "Too many requests. Try again later." };

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) return { success: false, error: "Invalid form data." };

  await contactRepo.create(parsed.data);
  await notifyContact(parsed.data);

  return { success: true };
}

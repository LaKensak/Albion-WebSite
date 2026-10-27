interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

interface WebhookPayload {
  content?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields?: EmbedField[];
    timestamp?: string;
  }>;
}

export async function sendDiscordWebhook(webhookUrl: string, payload: WebhookPayload) {
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    console.error("Discord webhook failed");
    return false;
  }
}

export async function notifyContact(data: { name: string; email: string; subject: string; message: string }) {
  const url = process.env.DISCORD_WEBHOOK_CONTACT;
  if (!url) return;
  await sendDiscordWebhook(url, {
    embeds: [
      {
        title: `📩 ${data.subject}`,
        description: data.message.slice(0, 2000),
        color: 0x22d3ee,
        fields: [
          { name: "From", value: data.name, inline: true },
          { name: "Email", value: data.email, inline: true },
        ],
        timestamp: new Date().toISOString(),
      },
    ],
  });
}

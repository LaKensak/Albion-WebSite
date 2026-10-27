export const siteConfig = {
  name: "Albion Radar",
  description: "The most advanced external overlay for Albion Online.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  discordInvite: "discord.gg/ton-serveur",
  socials: {
    discord: "discord.gg/ton-serveur",
  },
  accent: "#22d3ee",
  keywords: [
    "albion online",
    "albion radar",
    "albion esp",
    "albion overlay",
    "albion combat assist",
  ],
} as const;

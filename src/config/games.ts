export const games = [
  {
    slug: "albion-online",
    name: "Albion Online",
    genre: "OPEN-WORLD MMORPG",
    tagline: "Know the world around you.",
    description:
      "Player ESP, resource tracking, radar and extended camera for every zone.",
    features: ["Player ESP", "Resources", "Radar", "Extended camera"],
    image: "/games/albion-online.jpg",
    status: "live",
  },
  {
    slug: "rust",
    name: "Rust",
    genre: "SURVIVAL / OPEN WORLD",
    tagline: "Survival starts with awareness.",
    description:
      "Player ESP, world item tracking, aimbot and homing for the open world.",
    features: ["Player ESP", "World ESP", "Aimbot", "Homing"],
    image: "/games/rust.jpg",
    status: "live",
  },
  {
    slug: "arc-raiders",
    name: "ARC Raiders",
    genre: "EXTRACTION SHOOTER",
    tagline: "The next frontier.",
    description:
      "A new perspective is in development. Follow our updates for availability.",
    features: [],
    image: "/games/arc-raiders.jpg",
    status: "soon",
  },
  {
    slug: "cod-mw4",
    name: "Call of Duty",
    genre: "FIRST-PERSON SHOOTER",
    tagline: "Stay one move ahead.",
    description:
      "In development. Follow our updates for supported titles and availability.",
    features: [],
    image: "/games/cod.jpg",
    status: "soon",
  },
] as const;

import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "60 s"),
      analytics: true,
      prefix: "albion-radar",
    })
  : null;

export async function checkRateLimit(identifier: string) {
  if (!rateLimiter) return { success: true, remaining: 999 };
  return rateLimiter.limit(identifier);
}

import { EvaluationContext } from "@/types/smart-rules";
import { Redis } from "@upstash/redis";
import * as crypto from "crypto";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export class RulesCache {
  static async getCachedEvaluation(linkId: string, contextHash: string) {
    const key = `rules:${linkId}:${contextHash}`;
    const cached: string | null = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  static async setCachedEvaluation(
    linkId: string,
    contextHash: string,
    result: any,
    ttlSeconds = 300
  ) {
    const key = `rules:${linkId}:${contextHash}`;
    await redis.setex(key, ttlSeconds, JSON.stringify(result));
  }

  static createContextHash(context: EvaluationContext): string {
    return crypto
      .createHash("md5")
      .update(
        JSON.stringify({
          country: context.country,
          device: context.device,
          platform: context.platform,
          hour: new Date(context.timestamp).getHours(),
          day: new Date(context.timestamp).getDay(),
          isAuth: context.isAuthenticated,
        })
      )
      .digest("hex");
  }
}

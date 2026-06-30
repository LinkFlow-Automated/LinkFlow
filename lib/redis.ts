import Redis from 'ioredis';

const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis || new Redis(process.env.REDIS_URL!);

globalForRedis.redis = redis;

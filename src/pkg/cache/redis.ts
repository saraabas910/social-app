
import { Redis } from "ioredis";
import  IcacheProvider from "./cache.interface.js";
interface IRedisCache {
  host: string;
  port: number;
  password: string;
}

export class RedisCache implements IcacheProvider  {
  private client: Redis;

  constructor(config: IRedisCache) {
    this.client = new Redis({
      port: config.port,
      host: config.host,
      password: config.password,
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });

    this.client.on("error", (err: Error) => {
      console.error("Redis error:", err.message);
    });

    this.client.connect()
      .then(() => {
        console.log("Connected to Redis");
      })
      .catch((error: Error) => {
        console.error("Redis connection failed:", error.message);
      });
  }

  async set(
    key: string,
    value: string,
    ttl: number
  ): Promise<string> {
    return this.client.set(key, value, "EX", ttl);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }
  async ttl(key: string): Promise<number> {
  return this.client.ttl(key);
}
}

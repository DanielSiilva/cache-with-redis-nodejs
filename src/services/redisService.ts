import redis from "redis";
import { promisify } from "util";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

const client = redis.createClient({
  host: redisHost,
  port: redisPort,
});

export const redisClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
};

import { createClient } from "redis";
import { promisify } from "util";

const redisHost = process.env.REDIS_HOST || "localhost";
const redisPort = parseInt(process.env.REDIS_PORT || "6379", 10);

const client = createClient({
  socket: {
    host: redisHost,
    port: redisPort,
  },
});

client.connect().catch(console.error);

export const redisClient = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
};

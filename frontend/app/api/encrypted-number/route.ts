import { Redis } from "@upstash/redis";

export async function GET() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const encryptedNumber = await redis.get("EncryptedNumber");

  if (!encryptedNumber) {
    return Response.json({ status: 404, message: "No encrypted number found" });
  }
  return Response.json({ status: 200, message: "Encrypted number found", encryptedNumber });
}

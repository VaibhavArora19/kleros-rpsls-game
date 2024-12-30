import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

export async function GET() {
  console.log("Request is coming fine");
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const contractAddress = await redis.get("SmartContractAddress");

  if (!contractAddress) {
    return Response.json({ status: 404, message: "No contract address found" });
  }
  return Response.json({ status: 200, message: "Contract address found", contractAddress });
}

export async function POST(req: NextRequest) {
  const { contractAddress, encryptedNumber } = await req?.json();

  console.log("contractAddress", contractAddress);
  console.log("encryptedNumber", encryptedNumber);

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  await redis.set("SmartContractAddress", contractAddress);

  await redis.set("EncryptedNumber", encryptedNumber);

  return Response.json({ status: 200, message: "Smart contract address and number saved" });
}

export async function DELETE() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  await redis.del("SmartContractAddress");

  await redis.del("EncryptedNumber");

  return Response.json({ status: 200, message: "Smart contract address and encryption number deleted" });
}

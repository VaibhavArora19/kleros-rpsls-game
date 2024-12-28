import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const contractAddress = await redis.get("SmartContractAddress");

  if (!contractAddress) {
    return Response.json({ status: 404, message: "No contract address found" });
  }
  Response.json({ status: 200, message: "Contract address found", contractAddress });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { contractAddress } = await req?.json();

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const isContractAddress = await redis.get("SmartContractAddress");

  if (isContractAddress) {
    return Response.json({ status: 404, message: "Contract address already exists" });
  }

  await redis.set("SmartContractAddress", contractAddress);

  Response.json({ message: "Smart contract address saved" });
}

export async function DELETE(req: NextResponse, res: NextResponse) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const contractAddress = await redis.get("SmartContractAddress");

  if (!contractAddress) {
    return Response.json({ status: 404, message: "No contract address found" });
  }

  await redis.del("SmartContractAddress");

  Response.json({ message: "Smart contract address deleted" });
}

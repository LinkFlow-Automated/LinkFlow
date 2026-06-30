import { redis } from "@/lib/redis";


export async function POST(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("sessionId");
  const body = await req.json();

  if (!sessionId) return new Response("Missing ID", { status: 400 });

  await redis.publish(`mcp:${sessionId}`, JSON.stringify(body));
  return new Response(null, { status: 202 });
}

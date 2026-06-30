import { mcpServer } from "@/lib/mcp";
import { SSETransport } from "@/lib/sse-transport";
import Redis from "ioredis";

export async function GET() {
  const sessionId = crypto.randomUUID();
  const redis = new Redis(process.env.REDIS_URL!);

  let controller: ReadableStreamDefaultController;
  const stream = new ReadableStream({
    start(c) { controller = c; },
    cancel() { redis.disconnect(); }
  });

  const transport = new SSETransport(async (msg) => {
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(msg)}\n\n`));
  });

  await mcpServer.connect(transport);

  // Subscribe to Redis for messages incoming from the POST route
  const channel = `mcp:${sessionId}`;
  await redis.subscribe(channel);
  redis.on("message", (_, msg) => transport.onmessage?.(JSON.parse(msg)));

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Connection": "keep-alive" }
  });
}

import { auth } from "@/lib/auth";
import { createMcpHandler } from "mcp-handler";
import { withMcpAuth } from "better-auth/plugins";
import { z } from "zod";

const handler = withMcpAuth(auth, (req, session) => {
  // session contains the access token record with scopes and user ID
  return createMcpHandler(
    (server) => {
      server.tool(
        "echo",
        "Echo a message",
        { message: z.string() },
        async ({ message }) => {
          return {
            content: [{ type: "text", text: `Tool echo: ${message}` }],
          };
        }
      );
    },
    {
      capabilities: {
        tools: {
          echo: {
            description: "Echo a message",
          },
        },
      },
    },
    {
      redisUrl: process.env.REDIS_URL,
      basePath: "/api",
      verboseLogs: true,
      maxDuration: 60,
    }
  )(req);
});

export { handler as GET, handler as POST, handler as DELETE };

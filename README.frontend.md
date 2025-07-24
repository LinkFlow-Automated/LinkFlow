# LinkFlow Backend API – Frontend Integration Guide

Welcome to the LinkFlow backend! This guide explains how frontend developers can interact with the authentication, API routes, and key features provided by the backend. Please read carefully to ensure smooth integration.

---

## 1. Authentication

### Auth Client
- Use the provided `authClient` from `lib/generated/auth-client.ts` for authentication in your frontend app.
- The client supports sign-in, sign-up, and session management.

#### Usage Example
```typescript
import { authClient, signIn, signUp, useSession } from "@/lib/generated/auth-client";

// Sign in
await signIn({ email, password });

// Sign up
await signUp({ email, password });

// Get session (React hook)
const { data: session } = useSession();
```

### Social Login
- Google login is enabled. Use the Google OAuth flow with the provided client ID.
- The backend expects the following environment variables to be set:
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

---

## 2. API Routes

### General Structure
- All API routes are under `/api/`.
- Auth-protected endpoints require a valid session or token.

### Example: MCP Tool Endpoint
- **Route:** `/api/[transport]`
- **Methods:** `GET`, `POST`, `DELETE`
- **Auth:** Requires a valid session (handled automatically by `authClient`)
- **Capabilities:**
  - `echo` tool: Send `{ message: string }` and receive a response with the same message.

#### Example Request
```typescript
const res = await fetch("/api/[transport]", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ tool: "echo", message: "Hello!" })
});
const data = await res.json();
// data.content[0].text === "Tool echo: Hello!"
```

---

## 3. Stripe Integration
- Stripe is integrated for payments and subscriptions.
- Use the publishable key from `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` for frontend Stripe.js.
- Backend handles customer creation and webhook events.

---

## 4. Environment Variables (Frontend)
- Use the following public env variables in your frontend:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - Any other `NEXT_PUBLIC_...` variables as needed

---

## 5. TypeScript Types
- Shared types can be added to `/types/` for consistency between frontend and backend.
- Use absolute imports (e.g., `@/lib/auth` or `@/types/user`).

---

## 6. Project Structure Reference
- `app/api/` – API routes
- `lib/` – Auth, Stripe, Prisma clients
- `lib/generated/auth-client.ts` – Auth client for frontend
- `prisma/schema.prisma` – Database schema

---

## 7. Tips for Frontend Devs
- Always check for a valid session before calling protected APIs.
- Use the provided hooks and clients for authentication.
- For new API endpoints, coordinate with the backend for request/response shapes.
- If you need new tools or capabilities, ask the backend team to add them to the MCP handler.

---

## Questions?
Ping the backend team for help with:
- New API requirements
- Auth/session issues
- Stripe/payment flows
- Database or type changes

---

Happy coding! 🚀

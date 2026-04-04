import { auth } from "@/lib/auth";
import { providers } from "@/lib/connect/registry";
import { parseOAuthState } from "@/lib/connect/oauth-state";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ provider: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { provider: providerName } = await context.params;
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!providerName || !code) {
    return NextResponse.json(
      { error: "missing provider or code" },
      { status: 400 }
    );
  }

  const provider = providers[providerName];
  if (!provider) {
    return NextResponse.json({ error: "unknown provider" }, { status: 400 });
  }

  // Validate CSRF state if present
  let returnUrl = "/admin";
  if (state) {
    const storedState = req.cookies.get("oauth_state")?.value;
    const parsed = parseOAuthState(state);

    if (storedState && storedState !== parsed.csrfToken) {
      return NextResponse.json(
        { error: "invalid CSRF state" },
        { status: 403 }
      );
    }

    returnUrl = parsed.returnUrl;
  }

  const tokens = await provider.exchangeCode(code);
  const profile = provider.getUser
    ? await provider.getUser(tokens.accessToken)
    : undefined;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Save to db
  const providerAccountId =
    profile?.id ?? `${providerName}:${session.user.id}`;
  await prisma.providerAcc.upsert({
    where: {
      provider_userId: { provider: providerName, userId: session.user.id },
    },
    update: {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresIn
        ? new Date(Date.now() + tokens.expiresIn * 1000)
        : null,
      scope: tokens.scope ?? provider.defaultScopes?.join(" ") ?? null,
    },
    create: {
      userId: session.user.id,
      provider: providerName,
      providerAccountId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresIn
        ? new Date(Date.now() + tokens.expiresIn * 1000)
        : null,
      scope: tokens.scope ?? provider.defaultScopes?.join(" "),
    },
  });

  // Redirect to the return URL (from state), with CSRF cookie cleanup
  const response = NextResponse.redirect(new URL(returnUrl, req.url));
  response.cookies.delete("oauth_state");
  return response;
}

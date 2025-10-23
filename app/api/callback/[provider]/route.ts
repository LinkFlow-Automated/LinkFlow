import { auth } from "@/lib/auth";
import { providers } from "@/lib/connect/registry";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ provider: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { provider: providerName } = await context.params;
  const code = req.nextUrl.searchParams.get("code");
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

  const tokens = await provider.exchangeCode(code);
  const profile = provider.getUser
    ? await provider.getUser(tokens.accessToken)
    : undefined;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  //save to db
  const providerAccountId = profile?.id ?? `${providerName}:${session.user.id}`;
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

  return NextResponse.redirect(new URL("/admin/aurora/breezies", req.url));
}

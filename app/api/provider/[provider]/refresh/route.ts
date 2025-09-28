import { auth } from "@/lib/auth";
import { providers } from "@/lib/connect/registry";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const providerName = (await params).provider;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // fetch the token acc data from db
  const account = await prisma.providerAcc.findUnique({
    where: {
      provider_userId: {
        provider: providerName,
        userId: session.user.id,
      },
    },
  });

  const now = new Date();
  const needRefresh = !account?.expiresAt || account.expiresAt < now;
  if (!needRefresh) {
    return NextResponse.json({ accessToken: account.accessToken });
  }

  const provider = providers[providerName];
  if (!provider?.refreshToken) {
    return NextResponse.json(
      { error: "refresh not supported" },
      { status: 400 }
    );
  }

  try {
    const refreshed = await provider.refreshToken(account?.refreshToken!);

    const updated = await prisma.providerAcc.update({
      where: { id: account?.id },
      data: {
        accessToken: refreshed.accessToken,
        expiresAt: refreshed.expiresIn
          ? new Date(Date.now() + refreshed.expiresIn * 1000)
          : null,
      },
    });

    return NextResponse.json({ accessToken: updated.accessToken });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "failed to refresh token" },
      { status: 500 }
    );
  }
}

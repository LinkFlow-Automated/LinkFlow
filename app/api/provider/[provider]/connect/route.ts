import { auth } from "@/lib/auth";
import { providers } from "@/lib/connect/registry";
import { generateOAuthState } from "@/lib/connect/oauth-state";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ provider: string }> }) {
    const { provider: providerName } = await context.params;
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const provider = providers[providerName];
    if (!provider) {
        return NextResponse.json({ error: "unknown provider" }, { status: 400 });
    }

    const returnUrl = req.nextUrl.searchParams.get("returnUrl") || "/admin";
    const state = await generateOAuthState(returnUrl);
    const authUrl = await provider.authUrl(state);

    const response = NextResponse.redirect(authUrl);
    response.cookies.set("oauth_state", state.split("|")[0], {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 600, // 10 minutes
        path: "/",
    });

    return response;
}

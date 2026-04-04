import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: { params: Promise<{ provider: string }> }) {
    const { provider: providerName } = await context.params;
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    await prisma.providerAcc.deleteMany({
        where: {
            provider: providerName,
            userId: session.user.id,
        },
    });

    return NextResponse.json({ success: true });
}

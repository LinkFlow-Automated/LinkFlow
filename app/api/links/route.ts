import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Your Prisma client
import { z } from "zod";
import { createLinkSchema } from "@/lib/validations/link";
import {
  filterOwnedLinkIds,
  getOwnedLink,
  getPrincipal,
  forbidden,
  unauthorized,
  userOwnsProfile,
} from "@/lib/api/guard";
import { enforceRateLimit } from "@/lib/api/rate-limit";

// NOTE: This is a legacy duplicate of /api/v1/links. It is not called by the
// app (link management uses server actions) but is kept authenticated so it is
// not an open door. Prefer /api/v1/links.
const API_RATE_LIMIT = { limit: 120, windowSec: 60 };

// GET - Fetch all links for one of the caller's profiles
export async function GET(request: NextRequest) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const { searchParams } = new URL(request.url);
    const profileId =
      searchParams.get("profileId") || searchParams.get("userId");

    if (!profileId) {
      return NextResponse.json(
        { error: "profileId is required" },
        { status: 400 }
      );
    }

    if (!(await userOwnsProfile(principal.userId, profileId))) {
      return forbidden();
    }

    const links = await prisma.link.findMany({
      where: { profileId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

// POST - Create a new link on a profile the caller owns
export async function POST(request: NextRequest) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const body = await request.json();
    const validatedData = createLinkSchema.parse(body);

    if (!(await userOwnsProfile(principal.userId, validatedData.profileId))) {
      return forbidden();
    }

    const link = await prisma.link.create({
      data: validatedData,
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}

// PUT - Update a link the caller owns
export async function PUT(request: NextRequest) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    if (!(await getOwnedLink(principal.userId, id))) {
      return forbidden();
    }

    if (
      updateData.profileId &&
      !(await userOwnsProfile(principal.userId, updateData.profileId))
    ) {
      return forbidden();
    }

    const link = await prisma.link.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a link the caller owns
export async function DELETE(request: NextRequest) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    if (!(await getOwnedLink(principal.userId, id))) {
      return forbidden();
    }

    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}

// PATCH - Batch update the order of links the caller owns
export async function PATCH(request: NextRequest) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const body = await request.json();
    const { updates } = body; // Array of { id, order }

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Updates must be an array" },
        { status: 400 }
      );
    }

    const ids = updates.map((u) => u?.id).filter(Boolean);
    const ownedIds = await filterOwnedLinkIds(principal.userId, ids);
    if (ownedIds.size !== ids.length) {
      return forbidden();
    }

    const results = await prisma.$transaction(
      updates.map(({ id, order }) =>
        prisma.link.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error updating links order:", error);
    return NextResponse.json(
      { error: "Failed to update links order" },
      { status: 500 }
    );
  }
}

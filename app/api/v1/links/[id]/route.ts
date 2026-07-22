import { deleteLink, updateLink } from "@/lib/services/link-management-server";
import { updateLinkSchema } from "@/lib/validations/link";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  getOwnedLink,
  getPrincipal,
  forbidden,
  unauthorized,
  userOwnsProfile,
} from "@/lib/api/guard";
import { enforceRateLimit } from "@/lib/api/rate-limit";

const API_RATE_LIMIT = { limit: 120, windowSec: 60 };

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `v1:links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const { id } = await params;
    // Ownership check doubles as existence check; 404 avoids leaking IDs.
    const link = await getOwnedLink(principal.userId, id);
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
    return NextResponse.json(link, { status: 200 });
  } catch (error) {
    console.error("Error fetching link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const principal = await getPrincipal(req);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `v1:links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const { id } = await params;

    if (!(await getOwnedLink(principal.userId, id))) {
      return forbidden();
    }

    const body = await req.json();

    // omit id from validatedData
    const validatedData = updateLinkSchema.parse(body);
    const { id: _, ...rest } = validatedData;

    // Never allow reassigning the link to a profile the caller doesn't own.
    if (
      rest.profileId &&
      !(await userOwnsProfile(principal.userId, rest.profileId))
    ) {
      return forbidden();
    }

    // Update the link
    const updatedLink = await updateLink({ id, ...rest });

    return NextResponse.json(updatedLink, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const principal = await getPrincipal(request);
    if (!principal) return unauthorized();

    const limited = await enforceRateLimit(
      `v1:links:${principal.userId}`,
      API_RATE_LIMIT
    );
    if (limited) return limited;

    const { id } = await params;

    if (!(await getOwnedLink(principal.userId, id))) {
      return forbidden();
    }

    const deletedLink = await deleteLink(id);
    return NextResponse.json(deletedLink, { status: 200 });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

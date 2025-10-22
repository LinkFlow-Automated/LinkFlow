import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Your Prisma client
import { z } from "zod";
import { createLinkSchema } from "@/lib/validations/link";

// GET - Fetch all links for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const links = await prisma.link.findMany({
      where: { profileId: userId },
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

// POST - Create a new link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log(body);
    // Validate the request body
    const validatedData = createLinkSchema.parse(body);

    const link = await prisma.link.create({
      data: validatedData,
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.log(error);
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

// PUT - Update a link
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
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

// DELETE - Delete a link
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
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

// PATCH - Batch update links order
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { updates } = body; // Array of { id, order }

    if (!Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Updates must be an array" },
        { status: 400 }
      );
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

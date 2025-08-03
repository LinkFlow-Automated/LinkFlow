import { NextRequest, NextResponse } from "next/server";
import { createLink, getLinks } from "@/lib/services/link-management";
import { getLinkQuerySchema, createLinkSchema } from "@/lib/validations/link";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryData = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validatedQuery = getLinkQuerySchema.parse(queryData);

    const links = await getLinks(validatedQuery);

    return NextResponse.json(links, { status: 200 });
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

    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validatedData = createLinkSchema.parse(body);

    const link = await createLink({ data: validatedData });

    return NextResponse.json(link, { status: 201 });
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

    if (error instanceof Error) {
      // Handle Prisma errors
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "Link with this ID already exists" },
          { status: 409 }
        );
      }
    }

    console.error("Error creating link:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

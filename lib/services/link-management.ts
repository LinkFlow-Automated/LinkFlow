import { type Visibility, type Link, type Prisma } from "../generated/prisma";
import { prisma } from "../prisma";

// Search, filter, and sort with Prisma
export const getLinks = async ({
  userId,
  search,
  category,
  visibility,
  sortBy = "order",
  sortOrder = "asc",
  page = 1,
  limit = 10,
}: {
  userId: string;
  search?: string;
  category?: string;
  visibility?: Visibility;
  sortBy?: "order" | "createdAt" | "title" | "clicks";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}) => {
  const where: Prisma.LinkWhereInput = {
    userId,
    isArchived: false,
    ...(category && { category }),
    ...(visibility && { visibility }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { url: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const [links, total] = await Promise.all([
    prisma.link.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.link.count({ where }),
  ]);

  return {
    links,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// Complex filtering example
export const getLinksAdvanced = async (filters: {
  userId: string;
  search?: string;
  categories?: string[];
  dateRange?: { from: Date; to: Date };
  minClicks?: number;
  featured?: boolean;
}) => {
  return prisma.link.findMany({
    where: {
      userId: filters.userId,
      isArchived: false,
      ...(filters.search && {
        OR: [
          { title: { contains: filters.search, mode: "insensitive" } },
          { description: { contains: filters.search, mode: "insensitive" } },
        ],
      }),
      ...(filters.categories?.length && {
        category: { in: filters.categories },
      }),
      ...(filters.dateRange && {
        createdAt: {
          gte: filters.dateRange.from,
          lte: filters.dateRange.to,
        },
      }),
      ...(filters.minClicks && {
        clicks: { gte: filters.minClicks },
      }),
      ...(filters.featured !== undefined && {
        featured: filters.featured,
      }),
    },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });
};

export const getLinkById = async (id: string) => {
  try {
    const link = await prisma.link.findUnique({ where: { id } });
    return link;
  } catch (error) {
    console.log(error);
  }
};

export const createLink = async ({ data }: { data: Link }) => {
  try {
    const response = await prisma.link.create({
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        order: data.order,
        category: data.category,
        clicks: data.clicks,
        createdAt: data.createdAt,
        autoSyncId: data.autoSyncId,
        rules: JSON.stringify(data.rules),
        visibility: data.visibility,
        isArchived: data.isArchived,
        platform: data.platform,
        userId: data.userId,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  }
};

const updateLink = async (data: any) => {
  try {
    const response = await prisma.link.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        url: data.url,
        order: data.order,
        category: data.category,
        clicks: data.clicks,
        createdAt: data.createdAt,
        autoSyncId: data.autoSyncId,
        rules: JSON.stringify(data.rules),
        visibility: data.visibility,
        isArchived: data.isArchived,
        platform: data.platform,
        userId: data.userId,
      },
    });
    return response;
  } catch (error) {
    console.log("error updating link", error);
  }
};

export const upsertLink = async (data: any) => {
  try {
    // Check if record exists
    const existingLink = await prisma.link.findUnique({
      where: { id: data.id },
    });

    if (existingLink) {
      // Update existing record
      return await updateLink(data);
    } else {
      // Create new record
      return await createLink(data);
    }
  } catch (error) {
    console.error("Error in upsertLink:", error);
    throw error;
  }
};

export const deleteLink = async (id: string) => {
  try {
    await prisma.link.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};

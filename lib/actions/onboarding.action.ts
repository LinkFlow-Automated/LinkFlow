"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { onboardingSchema, type OnboardingData } from "../schema/onboarding";

export const checkUsernameAvailability = async (username: string) => {
    const normalized = username.toLowerCase();
    try {
        const existing = await prisma.profile.findUnique({
            where: { username: normalized },
            select: { id: true },
        });
        return { available: !existing };
    } catch (error) {
        console.error("Username check failed:", error);
        return { available: false, error: "Failed to check username" };
    }
};

export const createProfile = async (data: OnboardingData) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
        return { error: "Not authenticated" };
    }

    const parsed = onboardingSchema.safeParse(data);
    if (!parsed.success) {
        return { error: "Invalid data", details: parsed.error.flatten() };
    }

    const { username, displayName, bio, backgroundColor, textColor, buttonStyle, fontFamily, links } =
        parsed.data;

    try {
        // Check if username is taken
        const existing = await prisma.profile.findUnique({
            where: { username },
            select: { id: true },
        });
        if (existing) {
            return { error: "Username is already taken" };
        }

        // Check if user already has profiles (to determine isPrimary)
        const existingProfiles = await prisma.profile.count({
            where: { userId: session.user.id },
        });

        // Create the profile + links in a transaction
        const profile = await prisma.$transaction(async (tx) => {
            const newProfile = await tx.profile.create({
                data: {
                    userId: session.user.id,
                    username,
                    slug: username,
                    displayName: displayName || null,
                    bio: bio || null,
                    isPrimary: existingProfiles === 0,
                    backgroundColor: backgroundColor || null,
                    textColor: textColor || null,
                    buttonStyle: buttonStyle || null,
                    fontFamily: fontFamily || null,
                },
            });

            // Create initial links if any
            if (links && links.length > 0) {
                await tx.link.createMany({
                    data: links.map((link, index) => ({
                        profileId: newProfile.id,
                        title: link.title,
                        url: link.url,
                        order: index,
                    })),
                });
            }

            return newProfile;
        });

        return { success: true, profile };
    } catch (error) {
        console.error("Profile creation failed:", error);
        return { error: "Failed to create profile. Please try again." };
    }
};

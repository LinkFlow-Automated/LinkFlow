import z from "zod";

// Step 1: Profile Basics
export const profileBasicsSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters")
        .regex(
            /^[a-zA-Z0-9-]+$/,
            "Username can only contain letters, numbers, and dashes"
        )
        .transform((val) => val.toLowerCase()),
    displayName: z.string().max(50, "Display name is too long").optional().or(z.literal("")),
    bio: z.string().max(160, "Bio must be 160 characters or less").optional().or(z.literal("")),
});

export type ProfileBasicsType = z.infer<typeof profileBasicsSchema>;

// Step 2: Appearance
export const appearanceSchema = z.object({
    backgroundColor: z.string().optional().or(z.literal("")),
    textColor: z.string().optional().or(z.literal("")),
    buttonStyle: z.string().optional().or(z.literal("")),
    fontFamily: z.string().optional().or(z.literal("")),
});

export type AppearanceType = z.infer<typeof appearanceSchema>;

// Step 3: First Links
export const linkItemSchema = z.object({
    title: z.string().min(1, "Title is required").max(100),
    url: z.string().url("Please enter a valid URL"),
});

export const firstLinksSchema = z.object({
    links: z.array(linkItemSchema).max(5, "You can add up to 5 links").default([]),
});

export type LinkItemType = z.infer<typeof linkItemSchema>;
export type FirstLinksType = z.infer<typeof firstLinksSchema>;

// Combined onboarding data
export const onboardingSchema = profileBasicsSchema
    .merge(appearanceSchema)
    .merge(firstLinksSchema);

export type OnboardingData = z.infer<typeof onboardingSchema>;

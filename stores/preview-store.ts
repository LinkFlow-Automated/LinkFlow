"use client";

import { create } from "zustand";
import type { SocialLink } from "@/lib/social-platforms";

// ---- Types ----

export interface PreviewLink {
    id: string;
    title: string;
    url: string;
    order: number;
    animation?: string | null;
    thumbnail?: string | null;
    thumbnailType?: string | null;
}

export interface PreviewWidget {
    id: string;
    type: string;
    position: number;
    config: Record<string, any>;
}

export interface PreviewProfileData {
    displayName: string;
    username: string;
    bio: string;
    image: string | null;
}

export interface PreviewDesignData {
    backgroundColor: string;
    textColor: string;
    buttonStyle: string;
    fontFamily: string;
}

export interface ServerProfileData {
    displayName?: string | null;
    username: string;
    bio?: string | null;
    image?: string | null;
    backgroundColor?: string | null;
    textColor?: string | null;
    buttonStyle?: string | null;
    fontFamily?: string | null;
    links?: PreviewLink[];
    widgets?: PreviewWidget[];
    socials?: SocialLink[];
}

interface PreviewState {
    // Profile
    displayName: string;
    username: string;
    bio: string;
    image: string | null;

    // Design
    backgroundColor: string;
    textColor: string;
    buttonStyle: string;
    fontFamily: string;

    // Links
    links: PreviewLink[];

    // Widgets
    widgets: PreviewWidget[];

    // Socials
    socials: SocialLink[];

    // Actions — Profile
    setProfile: (data: Partial<PreviewProfileData>) => void;

    // Actions — Design
    setDesign: (data: Partial<PreviewDesignData>) => void;

    // Actions — Links
    setLinks: (links: PreviewLink[]) => void;
    addLink: (link: PreviewLink) => void;
    updateLink: (id: string, data: Partial<PreviewLink>) => void;
    removeLink: (id: string) => void;

    // Actions — Widgets
    setWidgets: (widgets: PreviewWidget[]) => void;
    addWidget: (widget: PreviewWidget) => void;
    updateWidget: (id: string, data: Partial<PreviewWidget>) => void;
    removeWidget: (id: string) => void;

    // Actions — Socials
    setSocials: (socials: SocialLink[]) => void;

    // Hydration
    hydrateFromServer: (data: ServerProfileData) => void;
}

// ---- Store ----

export const usePreviewStore = create<PreviewState>((set) => ({
    // Profile defaults
    displayName: "",
    username: "",
    bio: "",
    image: null,

    // Design defaults
    backgroundColor: "#0f172a",
    textColor: "#ffffff",
    buttonStyle: "rounded",
    fontFamily: "inter",

    // Links
    links: [],

    // Widgets
    widgets: [],

    // Socials
    socials: [],

    // ---- Actions ----

    setProfile: (data) =>
        set((state) => ({
            ...state,
            ...data,
        })),

    setDesign: (data) =>
        set((state) => ({
            ...state,
            ...data,
        })),

    setLinks: (links) => set({ links }),

    addLink: (link) =>
        set((state) => ({
            links: [...state.links, link],
        })),

    updateLink: (id, data) =>
        set((state) => ({
            links: state.links.map((l) => (l.id === id ? { ...l, ...data } : l)),
        })),

    removeLink: (id) =>
        set((state) => ({
            links: state.links.filter((l) => l.id !== id),
        })),

    setWidgets: (widgets) => set({ widgets }),

    addWidget: (widget) =>
        set((state) => ({
            widgets: [...state.widgets, widget],
        })),

    updateWidget: (id, data) =>
        set((state) => ({
            widgets: state.widgets.map((w) => (w.id === id ? { ...w, ...data } : w)),
        })),

    removeWidget: (id) =>
        set((state) => ({
            widgets: state.widgets.filter((w) => w.id !== id),
        })),

    setSocials: (socials) => set({ socials }),

    hydrateFromServer: (data) =>
        set({
            displayName: data.displayName ?? "",
            username: data.username,
            bio: data.bio ?? "",
            image: data.image ?? null,
            backgroundColor: data.backgroundColor ?? "#0f172a",
            textColor: data.textColor ?? "#ffffff",
            buttonStyle: data.buttonStyle ?? "rounded",
            fontFamily: data.fontFamily ?? "inter",
            links: data.links ?? [],
            widgets: data.widgets ?? [],
            socials: data.socials ?? [],
        }),
}));

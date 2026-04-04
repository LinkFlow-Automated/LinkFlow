"use client";

import { usePreviewStore, type ServerProfileData } from "@/stores/preview-store";
import { useEffect, useRef } from "react";

/**
 * Client component that hydrates the preview store with server-fetched profile data.
 * Renders nothing — just runs the side-effect.
 */
export function PreviewHydrator({ data }: { data: ServerProfileData }) {
    const hydrate = usePreviewStore((s) => s.hydrateFromServer);
    const hasHydrated = useRef(false);

    useEffect(() => {
        if (!hasHydrated.current) {
            hydrate(data);
            hasHydrated.current = true;
        }
    }, [data, hydrate]);

    return null;
}

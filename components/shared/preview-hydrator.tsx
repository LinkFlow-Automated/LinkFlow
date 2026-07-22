"use client";

import { usePreviewStore, type ServerProfileData } from "@/stores/preview-store";
import { useEffect } from "react";

/**
 * Hydrates the preview store from server-fetched profile data. Re-runs whenever
 * `data` changes — i.e. on every server re-render (initial load and after a
 * `router.refresh()` following a save) — so the mini-phone preview stays in sync
 * with saved changes of any kind. Renders nothing.
 *
 * Note: `data` is referentially stable between server renders, so client-only
 * re-renders (live optimistic edits via the store setters) don't clobber state.
 */
export function PreviewHydrator({ data }: { data: ServerProfileData }) {
    const hydrate = usePreviewStore((s) => s.hydrateFromServer);

    useEffect(() => {
        hydrate(data);
    }, [data, hydrate]);

    return null;
}

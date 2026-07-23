"use client";

import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LinkCard from "./card/link/link-card";
import {
  getCardAnimation,
  type AnimationType,
} from "@/lib/utils/card-animation";
import { trackClick } from "@/lib/utils/track-click";
import {
  type AbTestConfig,
  type AbVariant,
  pickVariant,
  variantUrl,
} from "@/lib/utils/ab-testing";
import { FiLink } from "react-icons/fi";
import * as RiIcons from "react-icons/ri";

type IconComp = React.ComponentType<{ className?: string }>;

export type BioLinkItemData = {
  /** Present on the public page (enables click tracking + A/B); absent in preview. */
  id?: string;
  title: string;
  url: string;
  description?: string | null;
  category?: string | null;
  layout?: "compact" | "minimal" | "detailed";
  animation?: string | null;
  thumbnail?: string | null;
  /** "image" (thumbnail is a URL) or "icon" (a react-icons/ri name). */
  thumbnailType?: string | null;
  abTest?: AbTestConfig | null;
};

function renderThumbnail(data: BioLinkItemData): ReactNode {
  const { thumbnail, thumbnailType } = data;
  if (thumbnail) {
    if (thumbnailType === "image") {
      // Plain <img>: thumbnails come from arbitrary upload hosts not covered by
      // next.config remotePatterns, so next/image would reject some of them.
      return (
        <img
          src={thumbnail}
          alt=""
          className="size-full object-cover rounded-md"
        />
      );
    }
    if (thumbnailType === "icon") {
      const icons = RiIcons as Record<string, IconComp | undefined>;
      const Icon = icons[thumbnail];
      if (Icon) return <Icon className="size-full" />;
    }
  }
  return <FiLink className="size-full" />;
}

/**
 * Return a real destination, or null when the link has no usable URL yet —
 * empty, "#", or the create-time "https://example.com" placeholder. Null links
 * render as non-clickable so the public page never navigates to a placeholder.
 */
function resolveHref(url?: string | null): string | null {
  const u = (url ?? "").trim();
  if (!u || u === "#") return null;
  if (u === "https://example.com" || u === "http://example.com") return null;
  return u;
}

/** Sticky per-visitor A/B assignment, persisted in localStorage. */
function useAbVariant(id: string | undefined, config: AbTestConfig | null) {
  const [variant, setVariant] = useState<AbVariant>("A");

  useEffect(() => {
    if (!id || !config) return;
    const key = `lf_ab_${id}`;
    let v = typeof window !== "undefined" ? localStorage.getItem(key) : null;
    if (v !== "A" && v !== "B") {
      v = pickVariant(config.trafficSplit);
      try {
        localStorage.setItem(key, v);
      } catch {
        // storage unavailable (private mode) — assignment stays per-render
      }
    }
    setVariant(v as AbVariant);
  }, [id, config]);

  return variant;
}

export default function BioLinkItem({ data }: { data: BioLinkItemData }) {
  const anim = getCardAnimation((data.animation as AnimationType) || "none");
  const hasVariants = Boolean(anim.variants);

  const abActive = Boolean(data.abTest && data.id);
  const variant = useAbVariant(data.id, abActive ? data.abTest! : null);

  const destination = abActive
    ? variantUrl(data.abTest!, variant, data.url)
    : data.url;
  const href = resolveHref(destination);

  const handleClick =
    href && data.id
      ? () =>
          trackClick({
            linkId: data.id!,
            abVariant: abActive ? variant : undefined,
          })
      : undefined;

  return (
    <motion.div
      variants={anim.variants}
      initial={hasVariants ? "initial" : undefined}
      animate={hasVariants ? "animate" : undefined}
      whileHover={anim.whileHover}
      whileTap={anim.whileTap}
    >
      <LinkCard
        name={data.title}
        href={href ?? ""}
        description={data.description ?? undefined}
        category={data.category ?? undefined}
        layout={data.layout ?? "minimal"}
        icon={renderThumbnail(data)}
        onClick={handleClick}
      />
    </motion.div>
  );
}

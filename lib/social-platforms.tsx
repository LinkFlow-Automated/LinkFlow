import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaTiktok,
  FaTwitch,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import type { IconType } from "react-icons/lib";

export type SocialLink = { platform: string; url: string };

export type SocialPlatform = {
  value: string;
  label: string;
  icon: IconType;
  className?: string;
  /** URL prefix a handle is appended to. Empty = the user types a full URL. */
  baseUrl: string;
};

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { value: "github", label: "GitHub", icon: FaGithub, baseUrl: "https://github.com/" },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, className: "text-blue-500", baseUrl: "https://www.linkedin.com/in/" },
  { value: "instagram", label: "Instagram", icon: FaInstagram, className: "text-red-400", baseUrl: "https://instagram.com/" },
  { value: "twitter", label: "Twitter / X", icon: RiTwitterXFill, baseUrl: "https://x.com/" },
  { value: "youtube", label: "YouTube", icon: FaYoutube, className: "text-red-500", baseUrl: "https://youtube.com/@" },
  { value: "tiktok", label: "TikTok", icon: FaTiktok, baseUrl: "https://tiktok.com/@" },
  { value: "twitch", label: "Twitch", icon: FaTwitch, className: "text-purple-500", baseUrl: "https://twitch.tv/" },
  { value: "facebook", label: "Facebook", icon: FaFacebook, className: "text-blue-600", baseUrl: "https://facebook.com/" },
  { value: "spotify", label: "Spotify", icon: FaSpotify, className: "text-green-500", baseUrl: "https://open.spotify.com/user/" },
  { value: "website", label: "Website", icon: FaGlobe, baseUrl: "" },
];

export function socialPlatform(value: string) {
  return SOCIAL_PLATFORMS.find((p) => p.value === value);
}

/** Human-friendly prefix shown in the input (e.g. "github.com/"). */
export function socialPrefixLabel(platform: SocialPlatform): string {
  return platform.baseUrl.replace(/^https?:\/\/(www\.)?/, "");
}

/** Build the stored URL from a platform + the handle/URL the user typed. */
export function buildSocialUrl(platformValue: string, input: string): string {
  const p = socialPlatform(platformValue);
  const value = input.trim();
  if (!p || !p.baseUrl) {
    // Full-URL platform (e.g. Website): ensure a scheme.
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  }
  // Handle-based platform: strip a leading @ or slashes the user may paste.
  const handle = value.replace(/^@/, "").replace(/^\/+|\/+$/g, "");
  return `${p.baseUrl}${handle}`;
}

/** Reverse of buildSocialUrl — get the handle back out of a stored URL. */
export function extractSocialHandle(platformValue: string, url: string): string {
  const p = socialPlatform(platformValue);
  if (p?.baseUrl && url.startsWith(p.baseUrl)) return url.slice(p.baseUrl.length);
  return url;
}

/** Safely coerce the `Profile.socialLinks` JSON blob into a typed list. */
export function parseSocialLinks(raw: unknown): SocialLink[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (s): s is SocialLink =>
      !!s &&
      typeof s === "object" &&
      typeof (s as SocialLink).platform === "string" &&
      typeof (s as SocialLink).url === "string"
  );
}

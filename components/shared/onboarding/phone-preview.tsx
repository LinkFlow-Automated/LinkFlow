"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface PhonePreviewProps {
  displayName: string;
  username: string;
  bio: string;
  backgroundColor: string;
  textColor: string;
  buttonStyle: string;
  links: { title: string; url: string }[];
}

function getButtonRadius(style: string) {
  switch (style) {
    case "pill":
      return "9999px";
    case "sharp":
      return "0px";
    default:
      return "8px";
  }
}

function getButtonClasses(style: string, textColor: string) {
  const base = "w-full py-2.5 px-4 text-[10px] font-medium transition-all duration-200 text-center";
  switch (style) {
    case "outline":
      return `${base} bg-transparent`;
    case "shadow":
      return base;
    default:
      return base;
  }
}

export function PhonePreview({
  displayName,
  username,
  bio,
  backgroundColor,
  textColor,
  buttonStyle,
  links,
}: PhonePreviewProps) {
  const bgColor = backgroundColor || "#0f172a";
  const txtColor = textColor || "#ffffff";
  const radius = getButtonRadius(buttonStyle);

  return (
    <div className="relative mx-auto w-[220px]">
      {/* Phone Frame */}
      <div className="relative overflow-hidden rounded-[32px] border-[6px] border-foreground/90 bg-foreground/90 shadow-2xl shadow-foreground/10">
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-5 w-20 -translate-x-1/2 rounded-b-xl bg-foreground/90" />

        {/* Screen Content */}
        <div
          className="relative min-h-[420px] overflow-hidden pt-8 pb-6 px-4"
          style={{ backgroundColor: bgColor }}
        >
          {/* Avatar Circle */}
          <div className="flex flex-col items-center pt-4 pb-3">
            <div
              className="mb-2 flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold"
              style={{
                backgroundColor: `${txtColor}15`,
                color: txtColor,
              }}
            >
              {displayName
                ? displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                : "?"}
            </div>
            <p
              className="text-xs font-semibold"
              style={{ color: txtColor }}
            >
              {displayName || "Your Name"}
            </p>
            {username && (
              <p
                className="text-[9px] opacity-50"
                style={{ color: txtColor }}
              >
                @{username}
              </p>
            )}
            {bio && (
              <p
                className="mt-1.5 text-center text-[8px] leading-relaxed opacity-60 max-w-[160px]"
                style={{ color: txtColor }}
              >
                {bio.length > 60 ? `${bio.slice(0, 60)}...` : bio}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="mt-2 space-y-2">
            {links.length > 0
              ? links.slice(0, 4).map((link, i) => (
                  <div
                    key={i}
                    className={getButtonClasses(buttonStyle, txtColor)}
                    style={{
                      borderRadius: radius,
                      color: txtColor,
                      ...(buttonStyle === "outline"
                        ? { border: `1px solid ${txtColor}30` }
                        : { backgroundColor: `${txtColor}12` }),
                      ...(buttonStyle === "shadow"
                        ? {
                            boxShadow: `0 2px 8px ${txtColor}10`,
                          }
                        : {}),
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">
                        {link.title || "Untitled"}
                      </span>
                      <ExternalLink
                        className="ml-1 h-2.5 w-2.5 shrink-0 opacity-40"
                        style={{ color: txtColor }}
                      />
                    </div>
                  </div>
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full py-2.5 px-4 text-center"
                    style={{
                      borderRadius: radius,
                      backgroundColor: `${txtColor}08`,
                      border: `1px dashed ${txtColor}15`,
                    }}
                  >
                    <div
                      className="mx-auto h-2 rounded-full opacity-20"
                      style={{
                        backgroundColor: txtColor,
                        width: `${60 + i * 10}%`,
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

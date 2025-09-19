"use client";
import { clsx } from "clsx";

type Props = {
  direction?: "up" | "down"; // which side is solid
  className?: string;
  children: React.ReactNode;
};

export function FadeBlur({ direction = "down", className, children }: Props) {
  return (
    <div className={clsx("relative isolate", className)}>
      {children}

      {/* the blur mask */}
      <div
        aria-hidden
        className={clsx(
          "absolute inset-0 -z-10 pointer-events-none",
          direction === "down"
            ? "bg-gradient-to-b from-background via-background/80 to-transparent"
            : "bg-gradient-to-t from-background via-background/80 to-transparent"
        )}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage:
            direction === "down"
              ? "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)"
              : "linear-gradient(to top, black 0%, black 60%, transparent 100%)",
        }}
      />
    </div>
  );
}

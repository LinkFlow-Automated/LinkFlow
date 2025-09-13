// utils/cardTheme.ts
import { cn } from "@/lib/utils";
import { CardTheme } from "@/types/theme";

export function getCardThemeStyles(theme?: CardTheme) {
  if (!theme) return { className: "", style: {} };

  const borderRadiusClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  const shadowClasses = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    glow: "shadow-[0_0_15px_rgba(0,0,0,0.3)]",
  };

  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const className = cn(
    // border radius
    theme.borderRadius && borderRadiusClasses[theme.borderRadius],

    // shadow
    theme.shadow && shadowClasses[theme.shadow],

    // border
    theme.borderStyle === "solid" ? "border border-white/10" : "border-0",

    // padding
    theme.layout === "compact" ? paddingClasses.sm :
    theme.layout === "minimal" ? paddingClasses.none :
    paddingClasses.md
  );

  const style: React.CSSProperties = {};

  if (theme.background) {
    if (theme.background.type === "solid") {
      style.backgroundColor = theme.background.color;
    }
    if (theme.background.type === "gradient") {
      style.backgroundImage = `linear-gradient(135deg, ${theme.background.colors.join(
        ", "
      )})`;
    }
    if (theme.background.type === "image") {
      style.backgroundImage = `url(${theme.background.url})`;
      style.backgroundSize = "cover";
      style.backgroundPosition = "center";
    }
  }

  return { className, style };
}

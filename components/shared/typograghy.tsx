import React from "react";
import { cn } from "@/lib/utils";

// Main Hero Title Component
interface HeroTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h1
      className={cn(
        "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
        "font-black tracking-tight leading-[0.9]",
        "max-w-6xl",
        className
      )}
    >
      {children}
    </h1>
  );
};

// Section Title Component
interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "white";
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
  variant = "primary",
}) => {
  const variantClasses = {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-700 dark:text-gray-200",
    white: "text-white",
  };

  return (
    <h2
      className={cn(
        "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
        "font-black tracking-tight leading-tight",
        "text-center",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </h2>
  );
};

// Feature Title Component
interface FeatureTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const FeatureTitle: React.FC<FeatureTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={cn(
        "text-lg md:text-xl lg:text-2xl",
        "font-bold tracking-tight",
        "text-gray-900 dark:text-white",
        "leading-tight",
        className
      )}
    >
      {children}
    </h3>
  );
};

// Description Text Component
interface DescriptionProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "muted" | "white";
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  size = "md",
//   variant = "muted",
}) => {
  const sizeClasses = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl lg:text-2xl",
  };

//   const variantClasses = {
//     primary: "text-gray-900 dark:text-white",
//     muted: "text-gray-600 dark:text-gray-300",
//     white: "text-white/90",
//   };

  return (
    <p
      className={cn(
        sizeClasses[size],
        // variantClasses[variant],
        "leading-relaxed",
        "max-w-2xl",
        className
      )}
    >
      {children}
    </p>
  );
};

// Accent Text Component (for highlighted words)
interface AccentTextProps {
  children: React.ReactNode;
  className?: string;
  color?: "lime" | "yellow" | "blue" | "purple" | "primary";
}

export const AccentText: React.FC<AccentTextProps> = ({
  children,
  className,
  color = "lime",
}) => {
  const colorClasses = {
    lime: "text-lime-500",
    yellow: "text-yellow-400",
    blue: "text-blue-500",
    purple: "text-purple-500",
    primary: "text-primary/50"
  };

  return (
    <span className={cn(colorClasses[color], "font-black", className)}>
      {children}
    </span>
  );
};

// Label/Badge Text Component
interface LabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  variant = "primary",
}) => {
  const variantClasses = {
    primary: "bg-lime-400 text-black",
    secondary: "bg-gray-900 text-white dark:bg-gray-100 dark:text-black",
    outline: "border-2 border-current text-current bg-transparent",
  };

  return (
    <span
      className={cn(
        "inline-block px-3 py-1 rounded-full",
        "text-xs md:text-sm font-bold uppercase tracking-wide",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Caption/Small Text Component
interface CaptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Caption: React.FC<CaptionProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "text-xs md:text-sm",
        "text-gray-500 dark:text-gray-400",
        "font-medium",
        className
      )}
    >
      {children}
    </span>
  );
};

// Typography Layout Container
interface TypographyContainerProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "tight" | "normal" | "loose";
  align?: "left" | "center" | "right";
}

export const TypographyContainer: React.FC<TypographyContainerProps> = ({
  children,
  className,
  spacing = "normal",
  align = "center",
}) => {
  const spacingClasses = {
    tight: "space-y-4",
    normal: "space-y-6 md:space-y-8",
    loose: "space-y-8 md:space-y-12",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div
      className={cn(
        spacingClasses[spacing],
        alignClasses[align],
        "max-w-6xl mx-auto px-4",
        className
      )}
    >
      {children}
    </div>
  );
};

"use client";

import type { useForm } from "react-hook-form";
import type { AppearanceType } from "@/lib/schema/onboarding";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const PRESET_COLORS = [
  { value: "#0f172a", label: "Slate" },
  { value: "#18181b", label: "Zinc" },
  { value: "#1c1917", label: "Stone" },
  { value: "#f8fafc", label: "Snow" },
  { value: "#fafaf9", label: "Warm" },
  { value: "#fef2f2", label: "Rose" },
  { value: "#eff6ff", label: "Sky" },
  { value: "#f0fdf4", label: "Mint" },
  { value: "#fefce8", label: "Sun" },
  { value: "#fdf4ff", label: "Lilac" },
  { value: "#fff7ed", label: "Peach" },
  { value: "#f1f5f9", label: "Frost" },
];

const FONT_FAMILIES = [
  { value: "inter", label: "Inter", sample: "Aa" },
  { value: "roboto", label: "Roboto", sample: "Aa" },
  { value: "poppins", label: "Poppins", sample: "Aa" },
  { value: "playfair", label: "Playfair", sample: "Aa" },
  { value: "space-grotesk", label: "Space Grotesk", sample: "Aa" },
  { value: "outfit", label: "Outfit", sample: "Aa" },
];

const BUTTON_STYLES = [
  { value: "rounded", label: "Rounded", radius: "8px" },
  { value: "pill", label: "Pill", radius: "999px" },
  { value: "sharp", label: "Sharp", radius: "0px" },
  { value: "outline", label: "Outline", radius: "8px" },
  { value: "shadow", label: "Shadow", radius: "8px" },
];

export function StepAppearance({
  form,
}: {
  form: ReturnType<typeof useForm<AppearanceType>>;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Choose your style
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Customize colors and typography. You can refine these anytime.
        </p>
      </div>

      <div className="space-y-6">
        {/* Background Color */}
        <FormField
          control={form.control}
          name="backgroundColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Background
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="grid grid-cols-6 gap-2">
                    {PRESET_COLORS.map((color) => {
                      const isSelected = field.value === color.value;
                      const isLight =
                        color.value.startsWith("#f") ||
                        color.value.startsWith("#e");
                      return (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => field.onChange(color.value)}
                          className={cn(
                            "group relative flex h-10 w-full items-center justify-center rounded-lg transition-all duration-200",
                            isSelected
                              ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                              : "ring-1 ring-border hover:ring-foreground/30"
                          )}
                          style={{ backgroundColor: color.value }}
                          title={color.label}
                        >
                          {isSelected && (
                            <Check
                              className={cn(
                                "h-3.5 w-3.5",
                                isLight ? "text-foreground" : "text-background"
                              )}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-9 w-9 shrink-0 rounded-lg ring-1 ring-border"
                      style={{
                        backgroundColor: field.value || "#0f172a",
                      }}
                    />
                    <Input
                      type="text"
                      placeholder="#0f172a"
                      className="h-9 rounded-lg border-border bg-background text-xs font-mono transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
                      {...field}
                    />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Text Color */}
        <FormField
          control={form.control}
          name="textColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Text Color
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-1 ring-border">
                    <input
                      type="color"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      value={field.value || "#ffffff"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundColor: field.value || "#ffffff",
                      }}
                    />
                  </label>
                  <Input
                    type="text"
                    placeholder="#ffffff"
                    className="h-9 rounded-lg border-border bg-background text-xs font-mono transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button Style */}
        <FormField
          control={form.control}
          name="buttonStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Button Style
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-5 gap-2">
                  {BUTTON_STYLES.map((style) => {
                    const isSelected = field.value === style.value;
                    return (
                      <button
                        key={style.value}
                        type="button"
                        onClick={() => field.onChange(style.value)}
                        className={cn(
                          "flex h-9 items-center justify-center text-xs font-medium transition-all duration-200",
                          isSelected
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                        style={{
                          borderRadius: style.radius,
                          ...(style.value === "outline" && !isSelected
                            ? {
                                background: "transparent",
                                border: "1.5px solid hsl(var(--border))",
                              }
                            : {}),
                          ...(style.value === "shadow" && !isSelected
                            ? {
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                              }
                            : {}),
                        }}
                      >
                        {style.label}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Font Family */}
        <FormField
          control={form.control}
          name="fontFamily"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Font
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-2">
                  {FONT_FAMILIES.map((font) => {
                    const isSelected = field.value === font.value;
                    return (
                      <button
                        key={font.value}
                        type="button"
                        onClick={() => field.onChange(font.value)}
                        className={cn(
                          "flex h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-xs transition-all duration-200",
                          isSelected
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <span className="text-base font-semibold leading-none">
                          {font.sample}
                        </span>
                        <span className="text-[10px] opacity-70">
                          {font.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

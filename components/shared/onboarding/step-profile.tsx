"use client";

import type { useForm } from "react-hook-form";
import type { ProfileBasicsType } from "@/lib/schema/onboarding";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepProfile({
  form,
  onUsernameCheck,
  usernameStatus,
}: {
  form: ReturnType<typeof useForm<ProfileBasicsType>>;
  onUsernameCheck: (username: string) => void;
  usernameStatus: "idle" | "checking" | "available" | "taken";
}) {
  const username = form.watch("username");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Create your profile
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Choose a username to claim your personal Breezi link.
        </p>
      </div>

      <div className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Username
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-sm text-muted-foreground">
                      breezi.com/
                    </span>
                  </div>
                  <Input
                    placeholder="yourname"
                    className="h-11 rounded-lg border-border bg-background pl-[5.5rem] pr-10 text-sm transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]/g, "");
                      field.onChange(val);
                      if (val.length >= 3) {
                        onUsernameCheck(val);
                      }
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {usernameStatus === "checking" && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {usernameStatus === "available" && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success">
                        <Check className="h-3 w-3 text-success-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              </FormControl>
              {usernameStatus === "taken" && (
                <p className="text-xs text-destructive">
                  This username is already taken
                </p>
              )}
              {usernameStatus === "available" && username && (
                <p className="text-xs text-success">
                  {username} is available
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Display Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name"
                  className="h-11 rounded-lg border-border bg-background text-sm transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Bio
                </FormLabel>
                <span
                  className={cn(
                    "text-xs tabular-nums transition-colors",
                    (field.value?.length ?? 0) > 140
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {field.value?.length ?? 0}/160
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="A short bio about yourself..."
                  className="min-h-[80px] resize-none rounded-lg border-border bg-background text-sm transition-shadow focus-visible:ring-1 focus-visible:ring-foreground/20"
                  maxLength={160}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: number;
  title: string;
}

export function StepIndicator({
  steps,
  currentStep,
}: {
  steps: readonly Step[];
  currentStep: number;
}) {
  return (
    <nav aria-label="Onboarding progress" className="flex items-center gap-1">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            {/* Connector line */}
            {index > 0 && (
              <div className="mx-1.5 hidden sm:block">
                <div
                  className={cn(
                    "h-px w-10 transition-all duration-500 ease-out",
                    isCompleted ? "bg-foreground" : "bg-border"
                  )}
                />
              </div>
            )}

            {/* Step pill */}
            <button
              type="button"
              tabIndex={-1}
              className={cn(
                "relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ease-out select-none",
                isActive &&
                "bg-foreground text-background shadow-sm",
                isCompleted &&
                "bg-foreground/8 text-foreground",
                !isActive && !isCompleted &&
                "text-muted-foreground"
              )}
            >
              {/* Number or check */}
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold leading-none transition-all duration-300",
                  isCompleted && "bg-foreground text-background",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                ) : (
                  step.id
                )}
              </span>

              {/* Label -- always visible on sm+ */}
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          </div>
        );
      })}
    </nav>
  );
}

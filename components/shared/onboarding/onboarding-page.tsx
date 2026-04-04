"use client";

import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  profileBasicsSchema,
  appearanceSchema,
  type ProfileBasicsType,
  type AppearanceType,
  type OnboardingData,
} from "@/lib/schema/onboarding";
import {
  checkUsernameAvailability,
  createProfile,
} from "@/lib/actions/onboarding.action";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { User, Paintbrush, Link2, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { StepProfile } from "./step-profile";
import { StepAppearance } from "./step-appearance";
import { StepLinks } from "./step-links";
import { PhonePreview } from "./phone-preview";

const STEPS = [
  { id: 1, title: "Profile", icon: User },
  { id: 2, title: "Style", icon: Paintbrush },
  { id: 3, title: "Links", icon: Link2 },
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");
  const [checkTimer, setCheckTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const profileForm = useForm<ProfileBasicsType>({
    resolver: zodResolver(profileBasicsSchema),
    defaultValues: { username: "", displayName: "", bio: "" },
  });

  const appearanceForm = useForm<AppearanceType>({
    resolver: zodResolver(appearanceSchema),
    defaultValues: {
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      buttonStyle: "rounded",
      fontFamily: "inter",
    },
  });

  const [links, setLinks] = useState<{ title: string; url: string }[]>([]);

  // Watch values for live preview
  const displayName = profileForm.watch("displayName");
  const username = profileForm.watch("username");
  const bio = profileForm.watch("bio");
  const backgroundColor = appearanceForm.watch("backgroundColor");
  const textColor = appearanceForm.watch("textColor");
  const buttonStyle = appearanceForm.watch("buttonStyle");

  const handleUsernameCheck = useCallback(
    (uname: string) => {
      if (checkTimer) clearTimeout(checkTimer);
      setUsernameStatus("checking");
      const timer = setTimeout(async () => {
        const result = await checkUsernameAvailability(uname);
        setUsernameStatus(result.available ? "available" : "taken");
      }, 500);
      setCheckTimer(timer);
    },
    [checkTimer]
  );

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await profileForm.trigger();
      if (!valid) return;
      if (usernameStatus === "taken") {
        toast.error("Please choose a different username");
        return;
      }
      if (usernameStatus !== "available") {
        const uname = profileForm.getValues("username");
        if (uname.length >= 3) {
          setUsernameStatus("checking");
          const result = await checkUsernameAvailability(uname);
          if (!result.available) {
            setUsernameStatus("taken");
            toast.error("This username is already taken");
            return;
          }
          setUsernameStatus("available");
        }
      }
    }

    if (currentStep === 2) {
      const valid = await appearanceForm.trigger();
      if (!valid) return;
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    startTransition(async () => {
      const profileData = profileForm.getValues();
      const appearanceData = appearanceForm.getValues();

      const data: OnboardingData = {
        ...profileData,
        ...appearanceData,
        links,
      };

      const result = await createProfile(data);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success && result.profile) {
        toast.success("Profile created successfully!");
        router.push(`/admin/${result.profile.username}`);
      }
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Left: Form Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        {/* <header className="flex items-center justify-between border-b border-border px-6 py-4 sm:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
              <span className="text-xs font-bold text-background">B</span>
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">
              Breezi
            </span>
          </div>
          <StepIndicator steps={STEPS} currentStep={currentStep} />
          <div className="hidden w-16 sm:block" />
        </header> */}

        {/* Form Content */}
        <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10">
          <div className="mx-auto w-full max-w-md">
            {/* Step number label */}
            <div className="mb-6 flex items-center gap-2">
              <span className="flex h-5 items-center rounded-full bg-muted px-2.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Step {currentStep} of 3
              </span>
            </div>

            {/* Step Content with transition */}
            <div
              key={currentStep}
              className="animate-in fade-in-0 slide-in-from-right-4 duration-400"
            >
              {currentStep === 1 && (
                <Form {...profileForm}>
                  <StepProfile
                    form={profileForm}
                    onUsernameCheck={handleUsernameCheck}
                    usernameStatus={usernameStatus}
                  />
                </Form>
              )}

              {currentStep === 2 && (
                <Form {...appearanceForm}>
                  <StepAppearance form={appearanceForm} />
                </Form>
              )}

              {currentStep === 3 && (
                <StepLinks
                  links={links}
                  onAddLink={() =>
                    setLinks((prev) => [...prev, { title: "", url: "" }])
                  }
                  onRemoveLink={(index) =>
                    setLinks((prev) => prev.filter((_, i) => i !== index))
                  }
                  onUpdateLink={(index, field, value) =>
                    setLinks((prev) =>
                      prev.map((link, i) =>
                        i === index ? { ...link, [field]: value } : link
                      )
                    )
                  }
                />
              )}
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 1 || isPending}
                className={cn(
                  "gap-2 text-sm text-muted-foreground transition-all hover:text-foreground",
                  currentStep === 1 && "invisible"
                )}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isPending}
                  className="gap-2 rounded-lg bg-foreground px-6 text-sm text-background transition-all hover:bg-foreground/90"
                >
                  Continue
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinish}
                  disabled={isPending}
                  className="gap-2 rounded-lg bg-foreground px-6 text-sm text-background transition-all hover:bg-foreground/90"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Profile
                      <Sparkles className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Skip hint */}
            {currentStep === 2 && (
              <p className="mt-4 text-center text-xs text-muted-foreground animate-in fade-in-0 duration-700">
                Not sure yet? You can customize your style anytime later.
              </p>
            )}
            {currentStep === 3 && links.length === 0 && (
              <p className="mt-4 text-center text-xs text-muted-foreground animate-in fade-in-0 duration-700">
                You can skip this and add links from your dashboard.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right: Live Preview */}
      <div className="hidden border-l border-border bg-muted/50 lg:flex lg:w-[420px] lg:flex-col lg:items-center lg:justify-center xl:w-[480px]">
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Live Preview
            </p>
          </div>
          <PhonePreview
            displayName={displayName || ""}
            username={username || ""}
            bio={bio || ""}
            backgroundColor={backgroundColor || "#0f172a"}
            textColor={textColor || "#ffffff"}
            buttonStyle={buttonStyle || "rounded"}
            links={links}
          />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              breezi.com/<span className="font-medium text-foreground">{username || "..."}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

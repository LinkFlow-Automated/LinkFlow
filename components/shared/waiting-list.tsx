"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, Sparkles } from "lucide-react";
import CardFeature from "./card-feature";
import {
  AccentText,
  Description,
  HeroTitle,
  TypographyContainer,
} from "./typograghy";
import Image from "next/image";
import { joinWaitlist } from "@/lib/actions/waiting";

const FEATURES = [
  {
    icon: "/test/1.jpg",
    title: "Smart Links with Rules",
    description:
      "Show different content based on time, location, or device. Your links adapt to your audience automatically.",
  },
  {
    icon: "/test/2.jpg",
    title: "AI Insights That Matter",
    description:
      "Get analytics that tell you what to do next, not just numbers. AI explains your performance in plain language.",
  },
  {
    icon: "/test/2.png",
    title: "Telegram Bot Control",
    description:
      "Update your bio links instantly via Telegram. No need to log in - manage everything from your phone.",
  },
  {
    icon: "/test/3.png",
    title: "Full Customization",
    description:
      "Your bio page should look like you, not like everyone else. Complete design control for your brand.",
  },
  {
    icon: "/test/4.png",
    title: "Priority Verification",
    description:
      "Beta users get first access to profile verification badges for creators, businesses, and public figures.",
  },
  {
    icon: "/test/3.png",
    title: "Exclusive Early-Bird Perks",
    description:
      "Lifetime discounts, exclusive badges, and premium features reserved only for our beta community.",
  },
];

const MAX_SPOTS = 500; // Maximum number of spots available

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState(0);
  const [spotsLeft, setSpotsLeft] = useState(MAX_SPOTS);
  const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
  const [creatorsJoined, setCreatorsJoined] = useState(0);

  // Simulate decreasing spots for urgency (optional - remove if you want to use real data)
  useEffect(() => {
    // Get initial count of waitlist entries
    async function getInitialCount() {
      try {
        const result = await joinWaitlist(""); // Empty string will just return count
        if (result.success && result.position) {
          const totalJoined = result.position - 1;
          setCreatorsJoined(totalJoined);
          setSpotsLeft(MAX_SPOTS - totalJoined);
        }
      } catch (err) {
        console.error("Failed to get initial count:", err);
      }
    }
    getInitialCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // setError("");

    try {
      const result = await joinWaitlist(email);

      if (result.success) {
        setPosition(result.position as number);
        // Update spots left based on position
        setSpotsLeft(MAX_SPOTS - (result.position ?? 0));
        setIsSubmitted(true);
      } else {
        // setError(result.error || "Something went wrong");
      }
    } catch (err) {
        console.warn(err)
    //   setError("Failed to join waitlist");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center border-primary/20 shadow-2xl">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Image
              src={"/breezi-logo-resolution-logo-transparent.png"}
              alt="breezi logo"
              width={1000}
              height={1000}
              className="w-full h-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4">Welcome to Breezi!</h2>
          <p className="text-muted-foreground mb-6">
            You're now on the exclusive beta waitlist for the future of bio
            links. Get ready for AI-powered insights and smart link management.
          </p>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            Beta Position #{position}
          </Badge>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Hero Section */}
      <div className="mx-auto px-4 py-16 lg:py-24">
        <div className="md:max-w-4xl mx-auto text-center">
          {/* Exclusivity Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Exclusive Beta Access
          </div>

          {/* Main Headline */}
          <TypographyContainer>
            <HeroTitle className="text-4xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
              The Future of
              <br />
              <AccentText className="text-primary/70">
                Bio Links is Here
              </AccentText>
            </HeroTitle>
          </TypographyContainer>

          {/* Subheading */}
          <Description className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join the waitlist for{" "}
            <AccentText className="text-foreground">Breezi</AccentText> - the first bio
            link platform with AI insights, smart rules, and Telegram bot
            integration.
          </Description>

          {/* Scarcity Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <Badge variant="destructive" className="text-sm px-4 py-2">
              Only {spotsLeft} beta spots remaining
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {creatorsJoined} creators already joined
            </div>
          </div>

          {/* Email Capture Form */}
          <Card className="max-w-md mx-auto p-8 border-primary/20 shadow-2xl bg-card/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email for beta access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-center border-primary/20 focus:border-primary"
                  required
                />
                <Description className="text-xs text-muted-foreground">
                  Join creators, businesses, and influencers on the waitlist
                </Description>
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Securing Your Beta Spot...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Get Early Access to Breezi
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* Features Teaser */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <HeroTitle className="text-3xl font-bold text-center mb-4">
            Why Creators Choose Breezi
          </HeroTitle>
          <Description className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            The only bio link platform that thinks ahead, adapts automatically,
            and grows with your audience.
          </Description>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature) => (
              <CardFeature
                key={feature.title}
                image={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

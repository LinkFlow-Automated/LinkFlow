"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa6";
import { TbBrandGumroad } from "react-icons/tb";

// Platform configurations
const platformConfigs = {
  spotify: {
    name: "Spotify",
    color: "#1DB954",
    icon: FaSpotify,
    description:
      "Link Spotify to track favorite artists and get concert recommendations tailored to your listening.",
    cards: [
      {
        id: 1,
        title: "Tame Impala",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: "/tame-impala-artist-photo.jpg",
      },
      {
        id: 2,
        title: "Sampha",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        image: "/sampha-artist-photo.jpg",
      },
      {
        id: 3,
        title: "FKA twigs",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        image: "/fka-twigs-artist-photo.jpg",
      },
    ],
  },
  instagram: {
    name: "Instagram",
    color: "#E4405F",
    icon: FaInstagram,
    description:
      "Connect Instagram to showcase your visual content and reach a broader audience.",
    cards: [
      {
        id: 1,
        title: "Stories",
        background:
          "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
        image: "/instagram-stories-icon.jpg",
      },
      {
        id: 2,
        title: "Reels",
        background:
          "linear-gradient(135deg, #405de6 0%, #5851db 50%, #833ab4 100%)",
        image: "/instagram-reels-icon.png",
      },
      {
        id: 3,
        title: "Posts",
        background:
          "linear-gradient(135deg, #fcb045 0%, #fd1d1d 50%, #833ab4 100%)",
        image: "/instagram-posts-icon.jpg",
      },
    ],
  },
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    icon: FaYoutube,
    description:
      "Link YouTube to sync your video content and grow your subscriber base.",
    cards: [
      {
        id: 1,
        title: "Shorts",
        background: "linear-gradient(135deg, #ff0000 0%, #ff4444 100%)",
        image: "/youtube-shorts-icon.jpg",
      },
      {
        id: 2,
        title: "Videos",
        background: "linear-gradient(135deg, #cc0000 0%, #ff0000 100%)",
        image: "/youtube-videos-icon.jpg",
      },
      {
        id: 3,
        title: "Live",
        background: "linear-gradient(135deg, #ff4444 0%, #cc0000 100%)",
        image: "/youtube-live-icon.jpg",
      },
    ],
  },
  gumroad: {
    name: "Gumroad",
    color: "#FF90E8",
    icon: TbBrandGumroad,
    description:
      "Connect Gumroad to sell your digital products and reach more customers.",
    cards: [
      {
        id: 1,
        title: "Products",
        background: "linear-gradient(135deg, #ff90e8 0%, #ffc0e8 100%)",
        image: "/digital-products-icon.jpg",
      },
      {
        id: 2,
        title: "Analytics",
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        image: "/analytics-dashboard-icon.png",
      },
      {
        id: 3,
        title: "Sales",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        image: "/sales-chart-icon.jpg",
      },
    ],
  },
};

interface ConnectionDialogProps {
  platform: keyof typeof platformConfigs;
  step?: number;
  totalSteps?: number;
  onConnect?: () => void;
  onSkip?: () => void;
  onBack?: () => void;
}

export function ConnectionDialog({
  platform,
  step = 1,
  totalSteps = 3,
  onConnect,
  onSkip,
  onBack,
}: ConnectionDialogProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const config = platformConfigs[platform];

  // Auto-rotate cards
  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % config.cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [open, config.cards.length]);

  const handleConnect = () => {
    onConnect?.();
    // onOpenChange(false);
  };

  const handleSkip = () => {
    onSkip?.();
    // onOpenChange(false);
  };

  const handleBack = () => {
    onBack?.();
    // onOpenChange(false);
  };

  return (
    <Dialog >
      <DialogTrigger>
        <Button
          key={config.name}
          //   onClick={
          //     config.name === "Link"
          //       ? handleCreateLink
          //       : () => console.log("hi")
          //   }
          variant="outline"
          className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-muted/50 cursor-pointer bg-transparent"
        >
          <div className="flex items-center gap-3 w-full overflow-hidden">
            <div
              className={`p-2 rounded-lg ${config.color} text-white flex-shrink-0`}
            >
              <config.icon className="size-5" />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <span className="font-medium text-sm">{config.name}</span>
              <span className="text-xs text-muted-foreground text-left line-clamp-1 overflow-hidden w-full">
                {config.description}
              </span>
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md w-full max-w-[90vw] p-0 gap-0 bg-background border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="text-center">
            <span className="text-sm font-medium text-foreground">
              Connection — {step} of {totalSteps}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground text-balance">
              Connect Your{" "}
              <span className="inline-flex items-center gap-2">
                <config.icon className="text-2xl" />
                {config.name}
              </span>
            </h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Animated Cards Stack */}
          <div className="relative h-48 flex items-center justify-center">
            <div className="relative w-64 h-32">
              <AnimatePresence mode="popLayout">
                {config.cards.map((card, index) => {
                  const isActive = index === currentCardIndex;
                  const offset =
                    (index - currentCardIndex + config.cards.length) %
                    config.cards.length;

                  return (
                    <motion.div
                      key={card.id}
                      className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
                      style={{
                        background: card.background,
                      }}
                      initial={{
                        rotate: -15 * offset,
                        scale: 1 - offset * 0.1,
                        zIndex: config.cards.length - offset,
                        x: offset * 8,
                        y: offset * 4,
                      }}
                      animate={{
                        rotate: -15 * offset,
                        scale: 1 - offset * 0.1,
                        zIndex: config.cards.length - offset,
                        x: offset * 8,
                        y: offset * 4,
                      }}
                      exit={{
                        rotate: -15 * (offset + 1),
                        scale: 1 - (offset + 1) * 0.1,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <div className="p-4 h-full flex items-center justify-between text-white">
                        <div>
                          <h3 className="text-xl font-bold mb-1">
                            {card.title}
                          </h3>
                          <div className="w-8 h-1 bg-white/30 rounded-full" />
                        </div>
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/20 backdrop-blur-sm">
                          <Image
                            width={1000}
                            height={1000}
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Connect Button */}
          <Button
            onClick={handleConnect}
            className="w-full h-12 text-base font-medium"
            style={{
              backgroundColor: config.color,
              color: "white",
            }}
          >
            <config.icon className="mr-2 text-lg" />
            Connect {config.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

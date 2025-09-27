"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useImageColor } from "@/hooks/use-image-color";
import { getCardAnimation } from "@/lib/utils/card-animation";
import Image from "next/image";

interface SpotifyCardProps {
  className?: string;
  isExpanded?: boolean;
  artistImage: string;
  onToggle?: () => void;
}

export function CurrentlyPlayingCard({
  className,
  isExpanded = false,
  artistImage,
  onToggle,
}: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(65);

  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);

  const animation = getCardAnimation("fade-in");

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      whileHover={animation.whileHover}
      whileTap={animation.whileTap}
      variants={animation.variants}
      className="w-full max-w-md"
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "bg-card border-border relative overflow-hidden h-full w-full",
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
        onClick={onToggle}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent"
          animate={{
            opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.3,
            x: isPlaying ? [0, 100, 0] : 0,
          }}
          transition={{
            duration: 3,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        />

        <div className="relative p-3 h-full flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full flex flex-col"
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/40 to-accent/70 flex items-center justify-center"
                  animate={{
                    rotate: isPlaying ? 360 : 0,
                    scale: isPlaying ? [1, 1.05, 1] : 1,
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "linear",
                    },
                    scale: {
                      duration: 2,
                      repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      ref={imgRef}
                      src={artistImage || "/placeholder.svg"}
                      alt="Artist"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                </motion.div>
                <div className="flex-1">
                  <h3
                    className={cn(
                      "text-md font-semibold leading-tight drop-shadow-sm",
                      textColor
                    )}
                  >
                    The Seed
                  </h3>
                  <h3
                    className={cn(
                      "text-lg font-bold leading-tight drop-shadow-sm",
                      textColor
                    )}
                  >
                    Aurora
                  </h3>
                </div>
              </motion.div>

              <motion.div
                className="mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="w-full bg-muted rounded-full h-1">
                  <motion.div
                    className="bg-accent h-1 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

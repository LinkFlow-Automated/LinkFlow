"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useImageColor } from "@/hooks/use-image-color";
import { getCardAnimation } from "@/lib/utils/card-animation";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";

interface SpotifyCardProps {
  className?: string;
  isExpanded?: boolean;
  artistName?: string;
  artistImage?: string;
  onToggle?: () => void;
}

export function ArtistInfoCard({
  className,
  artistImage,
  artistName,
  onToggle,
}: SpotifyCardProps) {
  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);

  const animation = getCardAnimation("enter-in");

  return (
    <motion.div
      layout
      initial="initial"
      animate="animate"
      whileHover={animation.whileHover}
      whileTap={animation.whileTap}
      variants={animation.variants}
      className="max-w-full min-w-full"
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-lg p-0 m-0",
          "border-border h-full w-full",
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
        onClick={onToggle}
      >
        <div className="p-0 h-full flex flex-row">
          <div className="relative h-48 w-fit flex-shrink-0">
            <Image
              ref={imgRef}
              src={artistImage || "/placeholder.svg"}
              alt="Artist"
              width={80}
              height={80}
              className="w-full h-full object-cover shadow-lg rounded-l-2xl"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex flex-col justify-between p-2">
            <div className="flex flex-col justify-around">
              <span className="text-xs font-medium text-gray-400">
                PLATINUM
              </span>
              <h3
                className={cn(
                  "text-3xl font-semibold leading-tight drop-shadow-sm",
                  textColor
                )}
              >
                {artistName}
              </h3>
            </div>
            <div className="flex justify-between items-end">
              <div className="w-1/2 h-full">
                <p className="text-xs text-gray-400">LISTENING SINCE</p>
                <p className="text-2xl font-bold">JAN</p>
                <p className="text-2xl font-bold">2017</p>
              </div>

              <div className="text-right w-1/2 h-full">
                <p className="text-xs text-gray-400">IN THE FIRST</p>
                <p className="text-xl font-bold">1%</p>
                <p className="text-xs">First song</p>
                <p className="text-xl font-semibold">The Seed</p>
              </div>
            </div>
          </div>
          <div className="h-full flex items-center flex-col-reverse gap-2 justify-around py-2 pr-1">
            <p className="text-xs tracking-widest [writing-mode:vertical-rl] text-gray-300 font-semibold">
              Indie POP
            </p>
            <p className="text-xs tracking-widest [writing-mode:vertical-rl] text-gray-300 font-semibold">
              DNV1 CLUB
            </p>
            <FaSpotify />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

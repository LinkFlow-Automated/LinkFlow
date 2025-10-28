"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { useImageColor } from "@/hooks/use-image-color";

type Layout = "compact" | "minimal" | "detailed";

interface SongCardProps {
  className?: string;
  songName: string;
  artistName: string;
  artistImage: string;
  isNewRelease?: boolean;
  layout?: Layout;
  releaseDate?: string;
  duration?: string;
  genre?: string;
  onClick?: () => void;
}

export function NewSongCard({
  className,
  songName,
  artistName,
  artistImage,
  isNewRelease = false,
  layout = "minimal",
  releaseDate,
  duration,
  genre,
  onClick,
}: SongCardProps) {
  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);

  const layoutConfig = {
    compact: {
      padding: "p-2",
      imageSize: "h-12 w-12",
      imageSizeNum: 48,
      titleSize: "text-sm",
      subtitleSize: "text-xs",
      iconSize: "size-5",
      gap: "gap-2",
      showBadge: false,
      showDetails: false,
    },
    minimal: {
      padding: "p-3",
      imageSize: "h-18 w-18",
      imageSizeNum: 64,
      titleSize: "text-base",
      subtitleSize: "text-sm",
      iconSize: "size-6",
      gap: "gap-3",
      showBadge: true,
      showDetails: false,
    },
    detailed: {
      padding: "p-4",
      imageSize: "h-20 w-20",
      imageSizeNum: 80,
      titleSize: "text-lg",
      subtitleSize: "text-base",
      iconSize: "size-8",
      gap: "gap-4",
      showBadge: true,
      showDetails: true,
    },
  };

  const config = layoutConfig[layout];

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
      onClick={onClick}
    >
      <Card
        className={cn(
          "group cursor-pointer transition-all duration-300 hover:shadow-xl overflow-hidden",
          "border-0 backdrop-blur-sm",
          config.padding,
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
      >
        <div className={cn("flex items-center relative", config.gap)}>
          {/* Artist Image */}
          <div className={cn("relative flex-shrink-0", config.imageSize)}>
            <Image
              ref={imgRef}
              src={artistImage || "/placeholder.svg"}
              alt={artistName}
              width={config.imageSizeNum}
              height={config.imageSizeNum}
              className="w-full h-full object-cover shadow-lg rounded-xl"
              crossOrigin="anonymous"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {config.showBadge && isNewRelease && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-1"
              >
                <Badge
                  variant="secondary"
                  className={cn(
                    "bg-white/20 backdrop-blur-sm border-0 text-xs font-medium",
                    textColor === "text-white" ? "text-white" : "text-gray-800"
                  )}
                >
                  New Release
                </Badge>
              </motion.div>
            )}

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3
                className={cn(
                  "font-semibold leading-tight drop-shadow-sm truncate",
                  config.titleSize,
                  textColor
                )}
              >
                {songName}
              </h3>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <p
                className={cn(
                  "font-medium leading-tight drop-shadow-sm truncate opacity-90",
                  config.subtitleSize,
                  textColor
                )}
              >
                {artistName}
              </p>
            </motion.div>

            {/* Detailed Info */}
            {config.showDetails && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-2 flex flex-wrap gap-2"
              >
                {genre && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "bg-white/10 backdrop-blur-sm border-0 text-xs",
                      textColor === "text-white"
                        ? "text-white"
                        : "text-gray-800"
                    )}
                  >
                    {genre}
                  </Badge>
                )}
                {duration && (
                  <span className={cn("text-xs opacity-75", textColor)}>
                    {duration}
                  </span>
                )}
                {releaseDate && (
                  <span className={cn("text-xs opacity-75", textColor)}>
                    {releaseDate}
                  </span>
                )}
              </motion.div>
            )}
          </div>

          {/* Spotify Icon */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className={layout === "compact" ? "" : "absolute top-2 right-2"}
          >
            <FaSpotify className={config.iconSize} />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

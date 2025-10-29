"use client";

import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { getCardAnimation } from "@/lib/utils/card-animation";
import { useImageColor } from "@/hooks/use-image-color";

type LayoutType = "compact" | "minimal" | "detailed";

interface Track {
  name: string;
  image: string;
}

interface AlbumCardProps {
  className?: string;
  layout?: LayoutType;
  albumName: string;
  artistName: string;
  artistImage: string;
  trackCount: number;
  duration: string;
  isNewRelease?: boolean;
  tracks?: Track[];
}

export function NewAlbumCard({
  className,
  layout = "minimal",
  albumName,
  artistName,
  artistImage,
  trackCount,
  duration,
  isNewRelease = false,
  tracks = [],
}: AlbumCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);
  const animation = getCardAnimation("pulse");

  const canExpand = layout === "detailed" && tracks.length > 0;

  const layoutConfig = {
    compact: {
      imageSize: 48,
      padding: "p-2",
      gap: "gap-2",
      showBadge: false,
      titleSize: "text-sm",
      artistSize: "text-xs",
      metaSize: "text-[10px]",
      iconSize: "size-5",
    },
    minimal: {
      imageSize: 64,
      padding: "p-3",
      gap: "gap-3",
      showBadge: true,
      titleSize: "text-base",
      artistSize: "text-sm",
      metaSize: "text-xs",
      iconSize: "size-6",
    },
    detailed: {
      imageSize: 80,
      padding: "p-4",
      gap: "gap-4",
      showBadge: true,
      titleSize: "text-lg",
      artistSize: "text-base",
      metaSize: "text-sm",
      iconSize: "size-8",
    },
  };

  const config = layoutConfig[layout];

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
          "group cursor-pointer transition-all duration-300 hover:shadow-xl p-0 m-0 overflow-hidden",
          "border-0 backdrop-blur-sm",
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
      >
        <div
          className={cn(
            "flex items-center relative",
            config.padding,
            config.gap
          )}
        >
          <div className="relative flex-shrink-0">
            <Image
              ref={imgRef}
              src={artistImage || "/placeholder.svg"}
              alt={albumName}
              width={config.imageSize}
              height={config.imageSize}
              className="w-full h-full object-cover rounded-xl shadow-lg"
              crossOrigin="anonymous"
            />
          </div>

          <div className="flex-1 min-w-0">
            {config.showBadge && isNewRelease && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-2"
              >
                <Badge
                  variant="secondary"
                  className={cn(
                    "bg-white/20 backdrop-blur-sm border-0 text-xs font-medium",
                    textColor === "text-white" ? "text-white" : "text-gray-800"
                  )}
                >
                  New Album
                </Badge>
              </motion.div>
            )}

            <h3
              className={cn(
                "font-semibold leading-tight drop-shadow-sm line-clamp-1",
                config.titleSize,
                textColor
              )}
            >
              {albumName}
            </h3>

            <span
              className={cn(
                "font-bold leading-tight drop-shadow-sm block",
                config.artistSize,
                textColor
              )}
            >
              {artistName}
            </span>

            <span
              className={cn(
                "text-muted-foreground block mt-1",
                config.metaSize,
                textColor
              )}
            >
              {trackCount} tracks • {duration}
            </span>
          </div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="absolute top-2 right-2"
          >
            <FaSpotify className={config.iconSize} />
          </motion.div>
        </div>

        {canExpand && (
          <div className="px-4 pb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className={cn(
                "w-full flex items-center justify-center gap-2 rounded-lg mt-2",
                "hover:bg-white/10 transition-all duration-200",
                textColor
              )}
            >
              <span className="text-xs font-semibold">
                {isExpanded ? "Hide Tracks" : "Show Tracks"}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="size-4" />
              </motion.div>
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <CardFooter className="flex flex-col gap-2 p-0 pt-3">
                    <span
                      className={cn(
                        "text-xs font-semibold self-start",
                        textColor
                      )}
                    >
                      Tracks
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {tracks.slice(0, 8).map((track, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="flex flex-col gap-1"
                        >
                          <Image
                            src={track.image || "/placeholder.svg"}
                            alt={track.name}
                            width={80}
                            height={80}
                            className="rounded-md shadow-md w-full aspect-square object-cover"
                          />
                          <span
                            className={cn(
                              "text-[10px] font-semibold truncate",
                              textColor
                            )}
                          >
                            {track.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </CardFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

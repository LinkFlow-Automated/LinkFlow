/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
"use client";

import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { getCardAnimation } from "@/lib/utils/card-animation";
import { useImageColor } from "@/hooks/use-image-color";

type Layout = "compact" | "minimal" | "detailed";

interface SpotifyCardProps {
  className?: string;
  isExpanded?: boolean;
  artistImage: string;
  isNewRelease: boolean;
  onToggle?: () => void;
  layout: Layout
}

export function NewAlbumCard({
  className,
  isExpanded = true,
  artistImage,
  isNewRelease,
  onToggle,
  layout = "detailed"
}: SpotifyCardProps) {

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
      padding: "p-2",
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



 const config = layoutConfig[layout]

  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);

  const animation = getCardAnimation("pulse");

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
          `line-clamp-1 group cursor-pointer transition-all duration-300 hover:shadow-xl p-0 m-0 overflow-hidden`,
          "border-0 backdrop-blur-sm",
          config.padding,
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
        onClick={onToggle}
      >
        <div className={`p-2 flex items-center gap-4 relative ${config.gap}`}>
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-full flex flex-col gap-4"
              >
                <motion.div
                  className="flex items-center gap-3 mt-auto"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      ref={imgRef}
                      src={artistImage || "/placeholder.svg"}
                      alt="Artist"
                      width={80}
                      height={80}
                      className={`w-full h-full object-cover rounded-2xl shadow-lg ${config.imageSize}`}
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    {isNewRelease && (
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
                            textColor === "text-white"
                              ? "text-white"
                              : "text-gray-800"
                          )}
                        >
                          New Album
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
                          "text-md font-semibold leading-tight drop-shadow-sm line-clamp-1",
                          textColor
                        )}
                      >
                        What happened to the heart?
                      </h3>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="flex flex-col"
                    >
                      <span
                        className={cn(
                          "text-lg font-bold leading-tight drop-shadow-sm",
                          textColor
                        )}
                      >
                        Aurora
                      </span>
                      <span
                        className={cn(
                          "text-xs text-muted-foreground",
                          textColor
                        )}
                      >
                        14 tracks • 56:23
                      </span>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-8 h-8 rounded-ful">
                      <FaSpotify className="size-8" />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="space-y-3 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <CardFooter className="flex flex-col gap-2 p-0">
                    <span
                      className={cn(
                        "text-xs font-semibold self-start",
                        textColor
                      )}
                    >
                      Tracks
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(4)].map((_, idx) => (
                        <div key={idx}>
                          <Image
                            key={idx}
                            src="/test/aurora.jpg"
                            alt="Track"
                            width={80}
                            height={80}
                            className="rounded-md shadow-md"
                          />
                          <span
                            className={cn(
                              "text-xs font-semibold self-start",
                              textColor
                            )}
                          >
                            Aurora
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardFooter>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="compact"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <motion.div
                  className="flex items-center gap-3 mt-auto"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="relative w-fit h-full flex-shrink-0">
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
                  <div className="flex-1 min-w-0">
                    {isNewRelease && (
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
                            textColor === "text-white"
                              ? "text-white"
                              : "text-gray-800"
                          )}
                        >
                          New Album
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
                          "text-md font-semibold leading-tight drop-shadow-sm",
                          textColor
                        )}
                      >
                        Aurora
                      </h3>
                    </motion.div>
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="flex flex-col"
                    >
                      <span
                        className={cn(
                          "text-lg font-bold leading-tight drop-shadow-sm",
                          textColor
                        )}
                      >
                        After Hours
                      </span>
                      <span
                        className={cn(
                          "text-xs text-muted-foreground",
                          textColor
                        )}
                      >
                        14 tracks • 56:23
                      </span>
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="absolute top-2 right-2"
                  >
                    <div className="w-8 h-8 rounded-ful">
                      <FaSpotify className="size-8" />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}

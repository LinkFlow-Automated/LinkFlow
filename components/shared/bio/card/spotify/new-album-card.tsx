/** biome-ignore-all lint/suspicious/noArrayIndexKey: <> */
"use client";

import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { getCardAnimation } from "@/lib/utils/card-animation";
import { useImageColor } from "@/hooks/use-image-color";

interface SpotifyCardProps {
  className?: string;
  isExpanded?: boolean;
  artistImage: string;
  isNewRelease: boolean;
  onToggle?: () => void;
}

export function NewAlbumCard({
  className,
  isExpanded = true,
  artistImage,
  isNewRelease,
  onToggle,
}: SpotifyCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
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
          "group cursor-pointer transition-all duration-300 hover:shadow-xl p-0 m-0 overflow-hidden",
          "border-0 backdrop-blur-sm",
          className
        )}
        style={{
          backgroundColor: `${backgroundColor}CC`,
        }}
        onClick={onToggle}
      >
        <div className="p-2 flex items-center gap-4 relative">
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
                        <Image
                          key={idx}
                          src="/test/3.png"
                          alt="Track"
                          width={80}
                          height={80}
                          className="rounded-md shadow-md"
                        />
                      ))}
                    </div>
                  </CardFooter>
                </motion.div>

                {/* <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="mt-auto"
                >
                  <motion.button
                    className="mt-auto bg-accent hover:bg-accent/90 text-accent-foreground w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaying(!isPlaying);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      animate={{ rotate: isPlaying ? 360 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                    </motion.div>
                    {isPlaying ? "Pause" : "Play"}
                  </motion.button>
                </motion.div> */}
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

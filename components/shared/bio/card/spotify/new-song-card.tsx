"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { useImageColor } from "@/hooks/use-image-color";

interface SpotifyCardProps {
  className?: string;
  songName: string;
  artistImage: string;
  isNewRelease?: boolean;
}

export function NewSongCard({
  className,
  songName,
  artistImage,
  isNewRelease,
}: SpotifyCardProps) {
  const { backgroundColor, textColor, imgRef } = useImageColor(artistImage);

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
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
        <div className="p-2 flex items-center gap-4 relative">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              ref={imgRef}
              src={artistImage || "/placeholder.svg"}
              alt="Artist"
              width={80}
              height={80}
              className="w-full h-full object-cover shadow-lg rounded-2xl"
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
                  "text-md font-semibold leading-tight drop-shadow-sm",
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
              <h3
                className={cn(
                  "text-lg font-bold leading-tight drop-shadow-sm",
                  textColor
                )}
              >
                Aurora
              </h3>
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
        </div>
      </Card>
    </motion.div>
  );
}

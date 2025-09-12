"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { useEffect, useState, useRef } from "react";
import ColorThief from "colorthief";

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
  const [backgroundColor, setBackgroundColor] = useState<string>("#1f2937");
  const [textColor, setTextColor] = useState<string>("text-white");
  const imgRef = useRef<HTMLImageElement>(null);

  // Function to convert RGB array to hex
  const rgbToHex = (rgb: number[]): string => {
    return `#${rgb
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;
  };

  // Function to determine if color is light or dark
  const isLightColor = (rgb: number[]): boolean => {
    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    return brightness > 128;
  };

  // Function to darken a color
  const darkenColor = (rgb: number[], factor: number = 0.3): number[] => {
    return rgb.map((channel) => Math.round(channel * (1 - factor)));
  };

  useEffect(() => {
    const extractColors = async () => {
      if (imgRef.current?.complete) {
        try {
          const colorThief = new ColorThief();

          // Get dominant color
          const dominantColor = await colorThief.getColor(imgRef.current);

          // Darken the dominant color for better contrast
          const darkerRgb = darkenColor(dominantColor, 0.2);
          const darkerHex = rgbToHex(darkerRgb);

          // Set background color
          setBackgroundColor(darkerHex);

          // Set text color based on brightness
          const isLight = isLightColor(darkerRgb);
          setTextColor(isLight ? "text-gray-800" : "text-white");
        } catch (error) {
          console.error("Error extracting colors:", error);
          // Fallback gradient
          setBackgroundColor("#1f2937");
          setTextColor("text-white");
        }
      }
    };

    // Handle image load
    const handleImageLoad = () => {
      extractColors();
    };

    const imgElement = imgRef.current;
    if (imgElement) {
      if (imgElement.complete) {
        extractColors();
      } else {
        imgElement.addEventListener("load", handleImageLoad);
        return () => imgElement.removeEventListener("load", handleImageLoad);
      }
    }
  }, [artistImage]);

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
          <div className="relative w-fit h-full flex-shrink-0">
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
                Aurora
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
                {songName}
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

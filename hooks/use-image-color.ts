"use client";

import { darkenColor, isLightColor, rgbToHex } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

interface UseImageColorReturn {
  backgroundColor: string;
  textColor: string;
  imgRef: React.RefObject<HTMLImageElement>;
}

interface UseImageColorOptions {
  darkenFactor?: number;
  fallbackBackgroundColor?: string;
  fallbackTextColor?: string;
}

export const useImageColor = (
  imageSource: string | undefined,
  options: UseImageColorOptions = {}
): UseImageColorReturn => {
  const {
    darkenFactor = 0.2,
    fallbackBackgroundColor = "#1f2937",
    fallbackTextColor = "text-white",
  } = options;

  const [backgroundColor, setBackgroundColor] = useState<string>(fallbackBackgroundColor);
  const [textColor, setTextColor] = useState<string>(fallbackTextColor);
  const imgRef = useRef<HTMLImageElement>(null) as React.RefObject<HTMLImageElement>;

  useEffect(() => {
    const extractColors = async () => {
      if (imgRef.current?.complete) {
        try {
          const colorThief = new ColorThief();
          const dominantColor = await colorThief.getColor(imgRef.current);
          const darkerRgb = darkenColor(dominantColor, darkenFactor);
          const darkerHex = rgbToHex(darkerRgb);
          setBackgroundColor(darkerHex);
          const isLight = isLightColor(darkerRgb);
          setTextColor(isLight ? "text-gray-800" : "text-white");
        } catch (error) {
          console.error("Error extracting colors:", error);
          setBackgroundColor(fallbackBackgroundColor);
          setTextColor(fallbackTextColor);
        }
      }
    };

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
  }, [imageSource, darkenFactor, fallbackBackgroundColor, fallbackTextColor]);

  return {
    backgroundColor,
    textColor,
    imgRef,
  };
};
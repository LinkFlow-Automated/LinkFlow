"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { AnimationType, getCardAnimation } from "@/lib/utils/card-animation";

interface AnimationPreviewProps {
  animation: AnimationType;
  isSelected?: boolean;
}

export function AnimationPreview({
  animation,
  isSelected,
}: AnimationPreviewProps) {
  const [key, setKey] = useState(0);
  const animationConfig = getCardAnimation(animation);

  // Reset animation when selection changes
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [animation, isSelected]);

  return (
    <div className="relative h-24 w-full flex items-center justify-center bg-muted/30 rounded-lg overflow-hidden">
      <motion.div
        key={key}
        className="relative"
        initial="initial"
        animate="animate"
        {...animationConfig}
      >
        <Card
          className={`w-16 h-12 flex items-center justify-center border-2 transition-colors ${
            isSelected ? "border-primary bg-primary/10" : "border-border"
          }`}
        >
          <div className="w-8 h-2 bg-primary/60 rounded-full" />
        </Card>
      </motion.div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />
      </div>
    </div>
  );
}

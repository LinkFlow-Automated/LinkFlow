// utils/cardAnimations.ts
import { Variants, TargetAndTransition } from "framer-motion";

export type AnimationType =
  | "none"
  | "hover-rise"
  | "pulse"
  | "fade-in"
  | "slide-in"
  | "enter-in";

export const getCardAnimation = (
  animation: AnimationType = "none"
): {
  variants?: Variants;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
} => {
  switch (animation) {
    case "hover-rise":
      return {
        whileHover: { y: -4, scale: 1.02, transition: { duration: 0.2 } },
        whileTap: { scale: 0.97 },
      };

    case "pulse":
      return {
        variants: {
          initial: { scale: 1 },
          animate: {
            scale: [1, 1.05, 1],
            transition: { duration: 1.5, repeat: Infinity },
          },
        },
      };

    case "fade-in":
      return {
        variants: {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        },
      };

    case "slide-in":
      return {
        variants: {
          initial: { opacity: 0, x: -40 },
          animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        },
      };

    case "enter-in":
      return {
        variants: {
          initial: { opacity: 0, scale: 0 },
          animate: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              scale: { type: "spring" },
              visualDuration: 0.4,
              bounce: 0.5,
            },
          },
        },
      };

    default:
      return {};
  }
};

export const animationOptions = [
  {
    value: "none",
    label: "None",
    description: "No animation",
  },
  {
    value: "hover-rise",
    label: "Hover Rise",
    description: "Lifts and scales on hover",
  },
  {
    value: "pulse",
    label: "Pulse",
    description: "Continuous gentle pulsing",
  },
  {
    value: "fade-in",
    label: "Fade In",
    description: "Fades in from bottom",
  },
  {
    value: "slide-in",
    label: "Slide In",
    description: "Slides in from left",
  },
  {
    value: "enter-in",
    label: "Enter In",
    description: "Enter in animation",
  },
] as const;

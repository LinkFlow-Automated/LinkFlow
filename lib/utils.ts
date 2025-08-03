import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { UAParser } from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDeviceInfo(userAgent: string) {
  const parser = new UAParser(userAgent);

  const deviceType = parser.getDevice().type || "desktop";
  const os = parser.getOS().name;
  const browser = parser.getBrowser().name;

  return {
    device: deviceType,
    os,
    browser,
  };
}

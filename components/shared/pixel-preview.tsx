/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSection from "./bio/hero/hero-section";
import { ArtistInfoCard } from "./bio/card/spotify/artist-info-card";
import LinkCard from "./bio/card/link/link-card";
import { NewSongCard } from "./bio/card/spotify/new-song-card";
import { NewAlbumCard } from "./bio/card/spotify/new-album-card";

// Helper component for SVG icons to keep the main component clean
const WifiIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);

const SignalIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20h.01" />
    <path d="M7 20v-4" />
    <path d="M12 20v-8" />
    <path d="M17 20V8" />
    <path d="M22 20V4" />
  </svg>
);

const BatteryIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="13" x2="23" y2="11" />
  </svg>
);

// Main Pixel Preview Component
export const PixelPreview = () => {
  // State to hold the current time, initialized to a default value
  const [time, setTime] = useState("11:40");

  // Effect to update the time every minute
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateClock(); // Set initial time
    const timerId = setInterval(updateClock, 60000); // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] p-6 overflow-auto">
      {/* Main phone container with metallic border */}
      <div className="relative border-[0.375rem] rounded-[2.5rem] aspect-[9/19.5] w-full shadow-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-transparent">
        {/* Metallic border overlay */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 p-[2px]">
          <div className="w-full h-full rounded-[2.3rem] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>
        </div>

        {/* Inner metallic rim */}
        <div className="absolute inset-[2.5%] rounded-[2rem] bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 p-[0.5%]">
          <div className="w-full h-full rounded-[1.9rem] bg-gradient-to-br from-slate-800 to-slate-900"></div>
        </div>

        {/* Side buttons with metallic finish */}
        <div className="h-[6%] w-[1.5%] bg-gradient-to-r from-slate-400 to-slate-600 absolute -start-[2.5%] top-[16%] rounded-s-lg shadow-lg border-l border-slate-300"></div>
        <div className="h-[6%] w-[1.5%] bg-gradient-to-r from-slate-400 to-slate-600 absolute -start-[2.5%] top-[23%] rounded-s-lg shadow-lg border-l border-slate-300"></div>
        <div className="h-[8%] w-[1.5%] bg-gradient-to-r from-slate-600 to-slate-400 absolute -end-[2.5%] top-[18%] rounded-e-lg shadow-lg border-r border-slate-300"></div>

        {/* Main phone body with enhanced glass effect */}
        <div className="absolute inset-[0.3125rem] rounded-[2rem] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black shadow-inner">
          {/* Glass reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>

          {/* Screen content */}
          <div className="relative w-full h-full flex flex-col bg-background ">
            {/* Status Bar with glass effect */}
            {/* <div className="w-full px-4 pt-3 pb-2 flex justify-between items-center text-slate-800 dark:text-slate-200 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="text-sm font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                {time}
              </span>
              <div className="flex items-center space-x-1.5 text-slate-700 dark:text-slate-300">
                <SignalIcon className="w-4 h-4" />
                <WifiIcon className="w-4 h-4" />
                <BatteryIcon className="w-5 h-5" />
              </div>
            </div> */}

            {/* App Content Area with enhanced styling */}
            <div className="flex-grow p-0 overflow-y-auto flex flex-col gap-8 w-full pb-8">
              <div>
                <HeroSection />
              </div>
              <div className="flex flex-col gap-2 px-4">
                <ArtistInfoCard />
                <LinkCard />
                <NewSongCard />
                <NewAlbumCard />
              </div>
            </div>

            {/* Enhanced Navigation Bar */}
            {/* <div className="w-full pb-4 pt-2 flex justify-center items-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
              <div className="w-24 h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300 dark:from-slate-600 dark:via-slate-500 dark:to-slate-600 rounded-full shadow-sm"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

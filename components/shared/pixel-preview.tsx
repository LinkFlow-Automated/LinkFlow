/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <> */

"use client";

import HeroSection from "./bio/hero/hero-section";
import { ArtistInfoCard } from "./bio/card/spotify/artist-info-card";
import LinkCard from "./bio/card/link/link-card";
import { NewSongCard } from "./bio/card/spotify/new-song-card";
import { NewAlbumCard } from "./bio/card/spotify/new-album-card";

// Main Pixel Preview Component
export const PixelPreview = () => {

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
                <ArtistInfoCard isExpanded artistImage="/test/aurora1.jpg" artistName="Aurora"/>
                <LinkCard />
                <NewSongCard
                  songName="Counting Star"
                  artistImage="/test/2.png"
                  isNewRelease
                />
                <NewAlbumCard artistImage="/test/3.png" isNewRelease isExpanded={true} />
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

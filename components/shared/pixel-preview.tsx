/** biome-ignore-all lint/a11y/noSvgWithoutTitle: <explanation> */

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

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
)

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
)

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
)

// Main Pixel Preview Component
export const PixelPreview = () => {
  // State to hold the current time, initialized to a default value
  const [time, setTime] = useState("11:40")

  // Effect to update the time every minute
  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, "0")
      const minutes = String(now.getMinutes()).padStart(2, "0")
      setTime(`${hours}:${minutes}`)
    }

    updateClock() // Set initial time
    const timerId = setInterval(updateClock, 60000) // Update every minute

    // Cleanup interval on component unmount
    return () => clearInterval(timerId)
  }, [])

  return (
    <div className="relative mx-auto">
      {/* Outer glow effect */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-[3rem] blur-xl scale-105"></div> */}

      {/* Main phone container with metallic border */}
      <div className="relative border-[6px] rounded-[2.5rem] h-[780px] w-[380px] shadow-2xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border-transparent">
        {/* Metallic border overlay */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 p-[2px]">
          <div className="w-full h-full rounded-[2.3rem] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>
        </div>

        {/* Inner metallic rim */}
        <div className="absolute inset-[4px] rounded-[2rem] bg-gradient-to-br from-slate-600 via-slate-500 to-slate-700 p-[1px]">
          <div className="w-full h-full rounded-[1.9rem] bg-gradient-to-br from-slate-800 to-slate-900"></div>
        </div>

        {/* Side buttons with metallic finish */}
        <div className="h-[46px] w-[4px] bg-gradient-to-r from-slate-400 to-slate-600 absolute -start-[10px] top-[124px] rounded-s-lg shadow-lg border-l border-slate-300"></div>
        <div className="h-[46px] w-[4px] bg-gradient-to-r from-slate-400 to-slate-600 absolute -start-[10px] top-[178px] rounded-s-lg shadow-lg border-l border-slate-300"></div>
        <div className="h-[64px] w-[4px] bg-gradient-to-r from-slate-600 to-slate-400 absolute -end-[10px] top-[142px] rounded-e-lg shadow-lg border-r border-slate-300"></div>

        {/* Main phone body with enhanced glass effect */}
        <div className="absolute inset-[5px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-black shadow-inner">
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
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <img
                    src="https://placehold.co/48x48/7c3aed/ffffff?text=G"
                    alt="Google Logo"
                    className="w-12 h-12 rounded-full mr-4 shadow-lg ring-2 ring-white/50 dark:ring-slate-700/50"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).onerror = null
                      ;(e.target as HTMLImageElement).src = "https://placehold.co/48x48/cccccc/ffffff?text=G"
                    }}
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent mr-4"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                    Welcome
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Your day at a glance</p>
                </div>
              </div>

              {/* Enhanced Card with glass morphism */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl mb-4 border border-white/20 dark:border-slate-700/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-2 relative z-10">
                  Project Deadline
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-3 relative z-10">
                  Your team's project, "Phoenix Initiative," is due this Friday.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl relative z-10 border border-purple-500/20">
                  View Details
                </Button>
              </div>

              {/* Enhanced List with glass morphism */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 dark:border-slate-700/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <h2 className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent mb-3 relative z-10">
                  Upcoming Events
                </h2>
                <ul className="space-y-3 relative z-10">
                  <li className="flex items-center text-slate-700 dark:text-slate-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3 shadow-sm"></div>
                    <span>1:00 PM - Design Sync</span>
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-3 shadow-sm"></div>
                    <span>3:30 PM - Client Call</span>
                  </li>
                  <li className="flex items-center text-slate-700 dark:text-slate-200">
                    <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-red-600 rounded-full mr-3 shadow-sm"></div>
                    <span>6:00 PM - Team Dinner</span>
                  </li>
                </ul>
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
  )
}

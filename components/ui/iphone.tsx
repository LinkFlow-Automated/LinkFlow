import Image from "next/image"
import type { HTMLAttributes, ReactNode } from "react"

// 1. Updated Constants for "Edge-to-Edge" look
const PHONE_WIDTH = 433
const PHONE_HEIGHT = 882
const BEZEL = 10 // Uniform slim bezel
const SCREEN_X = BEZEL
const SCREEN_Y = BEZEL
const SCREEN_WIDTH = PHONE_WIDTH - BEZEL * 2 // 417
const SCREEN_HEIGHT = PHONE_HEIGHT - BEZEL * 2 // 866
// Reduced radius slightly so it stays inside the phone's outer curve (approx 62)
const SCREEN_RADIUS = 54

// Calculated percentages for the CSS overlays
const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100

// We use pixels for borderRadius to ensure it matches the SVG mask perfectly
const BORDER_RADIUS_CSS = `${SCREEN_RADIUS}px`

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  videoSrc?: string
  children?: ReactNode
}

export function Iphone({
  src,
  videoSrc,
  children,
  className,
  style,
  ...props
}: IphoneProps) {
  const hasVideo = !!videoSrc
  const hasChildren = !!children
  const hasMedia = hasVideo || !!src || hasChildren

  // Common style for all screen containers
  const screenStyle: React.CSSProperties = {
    left: `${LEFT_PCT}%`,
    top: `${TOP_PCT}%`,
    width: `${WIDTH_PCT}%`,
    height: `${HEIGHT_PCT}%`,
    borderRadius: BORDER_RADIUS_CSS,
  }

  return (
    <div
      className={`relative inline-block w-full align-middle leading-none ${className}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      {/* Video Layer */}
      {hasVideo && (
        <div className="pointer-events-none absolute z-0 overflow-hidden" style={screenStyle}>
          <video
            className="block size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        </div>
      )}

      {/* Image Layer */}
      {!hasVideo && src && (
        <div className="pointer-events-none absolute z-0 overflow-hidden" style={screenStyle}>
          <Image
            src={src}
            alt=""
            className="block size-full object-cover object-top"
          />
        </div>
      )}

      {/* Children Layer */}
      {!hasVideo && !src && hasChildren && (
        <div className="absolute z-0 overflow-hidden overflow-y-auto" style={screenStyle}>
          {children}
        </div>
      )}

      {/* Phone Frame SVG */}
      <svg
        viewBox={`0 0 ${PHONE_WIDTH} ${PHONE_HEIGHT}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 size-full pointer-events-none"
        style={{ transform: "translateZ(0)" }}
        aria-hidden="true"
        role="presentation"
      >
        <g mask={hasMedia ? "url(#screenPunch)" : undefined}>
          {/* Outer Case */}
          <path
            d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
            className="fill-[#E5E5E5] dark:fill-[#404040]"
          />
          {/* Buttons */}
          <path d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />
          <path d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z" className="fill-[#E5E5E5] dark:fill-[#404040]" />

          {/* Main Body */}
          <path
            d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
            className="fill-white dark:fill-[#171717]"
          />
        </g>

        {/* Dynamic Island Area */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          className="fill-[#171717] dark:fill-[#000]"
        />

        <defs>
          <mask id="screenPunch" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width={PHONE_WIDTH} height={PHONE_HEIGHT} fill="white" />
            {/* The "Hole" where the content shows through */}
            <rect
              x={SCREEN_X}
              y={SCREEN_Y}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              rx={SCREEN_RADIUS}
              ry={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
    </div>
  )
}
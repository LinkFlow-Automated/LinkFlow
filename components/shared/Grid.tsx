'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Example() {
  return (
    <div className="py-5 mt-[-100px] sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tight text-balance leading-tight text-center select-none">
          NOT JUST 👀 A LINK-IN-BIO.
          <br />
          A FULL CREATOR PLATFORM.
        </h2>
        <p className="text-center text-base/7 font-semibold text-gray-700 text-balance mt-5 select-none">Everything you need to grow your audience, no code or design team needed. <br /> Do it all from your AI-Powered Link-in-Bio.</p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center select-none">
                  Smart Link Optimization
                </p>
                <p className="mt-2 max-w-lg font-medium text-sm/6 text-gray-600 text-pretty max-lg:text-center select-none">
                  AI automatically highlights the most popular or relevant link based on real-time analytics and user behavior.
                </p>
              </div>
              <div className="@container relative min-h-120 w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div className="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <Image
                    alt="Users-trust"
                    src="/assets/Breezi.avif"
                    width={400}
                    height={300}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center select-none">AI Profile Personalization</p>
                <p className="mt-2 max-w-lg font-medium text-sm/6 text-gray-600 max-lg:text-center select-none">
                  AI suggests or changes layouts, colors, and font based on users branding or recent audience interaction trends.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <Image
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png"
                  width={300}
                  height={200}
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div className="absolute inset-px rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-bold tracking-tight text-gray-950 max-lg:text-center select-none">Content Intelligence</p>
                <p className="mt-2 max-w-lg font-medium text-sm/6 text-gray-600 max-lg:text-center select-none">
                  AI identifies trending topics in the user's niche and suggests links or content additions.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <Image
                  alt=""
                  src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png"
                  width={200}
                  height={152}
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5" />
          </div>
          <div className="relative lg:row-span-2">
            <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center select-none">
                  AI Assistant Integration
                </p>
                <p className="mt-2 max-w-lg font-medium text-sm/6 text-gray-600 max-lg:text-center select-none">
                  A virtual assistant helps users set up and manage their page. For visitors, the assistant can guide them to the most relevant link. 
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        NotificationSetting.jsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14">{/* Your code example */}</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-black/5 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
      
      {/* Get started button */}
      <div className="flex items-center gap-x-6 mt-10 justify-center ">
        <Button
          variant="default"
          className="px-7 py-4 text-sm font-semibold rounded-lg"
        >
          <a href="/">Get started</a>
        </Button>
      </div>
    </div>
  )
}

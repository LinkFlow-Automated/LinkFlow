import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-white-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            >
              <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-balance text-gray sm:text-4xl select-none">
                Boost your productivity. Start using breezi today.
              </h2>
              <p className="mt-6 text-lg/8 text-pretty text-gray-600 select-none">
              Breezi helps you streamline your workflow through our AI-powered automation engine; saving time, reducing effort, and boosting productivity!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <Button
                  variant="default"
                  className="px-7 py-4 text-sm font-semibold rounded-md"
                >
                  <a href="/">Get started</a>
                </Button>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">
              <Image
                alt="App screenshot"
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                width={1824}
                height={1080}
                className="absolute top-0 left-0 w-228 max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  
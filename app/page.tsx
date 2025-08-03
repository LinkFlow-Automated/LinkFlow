"use client";

import Image from "next/image";
import Grid from "@/components/shared/Grid";

export default function page() {
  return (
    <div className="bg-white">

      <div className="relative isolate px-6 pt-[-20px] lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of phrasing.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/** Header Text */}
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold uppercase tracking-tight leading-tight">
              OPTIMIZE LINK TITLES
              <br />
              <span className="text-gray-700">AND DESCRIPTIONS</span>
              <br />
              <span className="text-gray-500">AUTOMATICALLY.</span>
            </h1>

            {/* Header Image */}
            <Image
              alt="header"
              src="/header.webp"
              className="mt-[-12px] shadow-md mx-auto block"
              width={600}
              height={400}
            />

            {/** Header Description */}
            <div className="bg-transparent p-6 mt-2">
              <div className="flex flex-col sm:flex-col items-center justify-around gap-5">
                <p className="sm:text-lg/7 text-gray-900 text-pretty md:text-balance">
                  Linkflow can suggest keywords or meta descriptions to enhance
                  discoverability on search engines.
                </p>
                <div className="flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-lg bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-xs hover:bg-blue-700 whitespace-nowrap"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Header Background Image */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>

      {/* Grid Component */}
      <Grid />
    </div>
  );
}

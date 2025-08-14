"use client";

import Footer from "@/components/shared/Footer";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const pricingData = {
    freelancer: {
      monthly: 19,
      annually: 190, // 2 months free (10 months × $19)
    },
    startup: {
      monthly: 29,
      annually: 290, // 2 months free (10 months × $29)
    },
  };

  const getPrice = (plan: keyof typeof pricingData) => {
    return billingCycle === "monthly" ? pricingData[plan].monthly : pricingData[plan].annually;
  };

  const getPeriod = () => {
    return billingCycle === "monthly" ? "/month" : "/year";
  };

  return (
    <>
      <section className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 select-none">
        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base/7 font-semibold text-gray-600">Pricing</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
            Start for free.
            <br />
            <span className="text-gray-700 sm:text-6xl">Grow without limits.</span>
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Whether you're building your brand, launching your store, or just exploring ideas, Breezi is free to start and ready to grow with you.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <div className="inline-flex rounded-full bg-gray-100 p-1 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`${billingCycle === "monthly" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"} rounded-full px-4 py-2`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annually")}
                className={`${billingCycle === "annually" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"} rounded-full px-4 py-2`}
              >
                Annually
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Freelancer */}
          <div className="rounded-3xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h3 className="text-indigo-600 text-base/7 font-semibold">Freelancer</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-gray-900 text-5xl font-semibold tracking-tight">${getPrice("freelancer")}</span>
              <span className="text-gray-500 text-base">{getPeriod()}</span>
            </p>
            <p className="mt-6 text-gray-600 text-base/7">The essentials to provide your best work for clients.</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
              {[
                "5 products",
                "Up to 1,000 subscribers",
                "Basic analytics",
                "48-hour support response time",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 inset-ring inset-ring-indigo-200 hover:inset-ring-indigo-300 focus-visible:outline-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
            >
              Buy plan
            </a>
          </div>

          {/* Startup */}
          <div className="rounded-3xl ring-1 ring-gray-200 p-8 sm:p-10">
            <h3 className="text-indigo-600 text-base/7 font-semibold">Startup</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-gray-900 text-5xl font-semibold tracking-tight">${getPrice("startup")}</span>
              <span className="text-gray-500 text-base">{getPeriod()}</span>
            </p>
            <p className="mt-6 text-gray-600 text-base/7">A plan that scales with your rapidly growing business.</p>
            <ul role="list" className="mt-8 space-y-3 text-sm/6 text-gray-600 sm:mt-10">
              {[
                "25 products",
                "Up to 10,000 subscribers",
                "Advanced analytics",
                "24-hour support response time",
                "Marketing automation's",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
            >
              Buy plan
            </a>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl bg-gray-900 p-8 ring-1 ring-gray-900/10 shadow-2xl sm:p-10">
            <h3 className="text-indigo-400 text-base/7 font-semibold">Enterprise</h3>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-white">Custom</p>
            <p className="mt-6 text-gray-300 text-base/7">Dedicated support and infrastructure for your company.</p>
            <a
              href="#"
              className="mt-8 block rounded-md bg-white/10 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10"
            >
              Contact sales
            </a>
            <ul role="list" className="mt-12 space-y-3 text-sm/6 text-gray-300">
              {[
                "Unlimited products",
                "Unlimited subscribers",
                "Advanced analytics",
                "1-hour, dedicated support response time",
                "Marketing automation's",
                "Custom reporting tools",
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-indigo-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div>
        <Footer />
      </div>
    </>
  );
}

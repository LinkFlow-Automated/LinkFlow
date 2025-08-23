"use client";

import Image from "next/image";
import Grid from "@/components/shared/Grid";
import LogoCloud from "@/components/shared/LogoClouds";
import Cta from "@/components/shared/Cta";
import Faq from "@/components/shared/Faq";
import { Button } from "@/components/ui/button";
import Testimonials from "@/components/shared/testimonials";
import { Description } from "@/components/shared/typograghy";
import Hero from "@/components/shared/hero";
import Features from "@/components/shared/features";

export default function page() {
  return (
    <div className="">
      <Hero />
      {/* Grid Component */}
      <Grid />
      {/* LogoCloud Component */}
      <LogoCloud />
      {/* Features Component */}
      <Features />
      {/* Testimonials Component */}
      <Testimonials />
      {/* CTA Component */}
      <Cta />
      {/* FAQ Component */}
      <Faq />
    </div>
  );
}

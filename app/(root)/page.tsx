import Faq from "@/components/shared/Faq";
import Testimonials from "@/components/shared/testimonials";
import Hero from "@/components/shared/hero";
import Features from "@/components/shared/features";
import CircleWithCards from "@/components/shared/test";

export default function page() {
  return (
    <>
      <Hero />
      {/* Features Component */}
      <Features />
      <CircleWithCards />
      {/* Testimonials Component */}
      <Testimonials />
      {/* FAQ Component */}
      <Faq />
    </>
  );
}

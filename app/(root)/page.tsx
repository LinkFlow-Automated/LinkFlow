import Faq from "@/components/shared/Faq";
import Testimonials from "@/components/shared/testimonials";
import Hero from "@/components/shared/hero";
import Features from "@/components/shared/features";

export default function page() {
  return (
    <>
      <Hero />
      {/* Features Component */}
      <Features />
      {/* Testimonials Component */}
      <Testimonials />
      {/* FAQ Component */}
      <Faq />
    </>
  );
}

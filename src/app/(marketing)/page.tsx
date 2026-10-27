import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Setup } from "@/components/sections/setup";
import { TechSpecs } from "@/components/sections/tech-specs";
import { Pricing } from "@/components/sections/pricing";
import { Loyalty } from "@/components/sections/loyalty";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Setup />
      <TechSpecs />
      <Pricing />
      <Loyalty />
      <Faq />
      <Cta />
    </>
  );
}

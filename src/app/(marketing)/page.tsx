import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { Setup } from "@/components/sections/setup";
import { TechSpecs } from "@/components/sections/tech-specs";
import { Pricing } from "@/components/sections/pricing";
import { Loyalty } from "@/components/sections/loyalty";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Games } from "@/components/sections/games";
import { Showcase } from "@/components/sections/showcase";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Games />
      <Features />
      <Showcase />
      <Setup />
      <TechSpecs />
      <Pricing />
      <Loyalty />
      <Faq />
      <Cta />
    </>
  );
}

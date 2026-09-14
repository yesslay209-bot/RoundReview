import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Marquee } from "@/components/landing/marquee";
import { Features } from "@/components/landing/features";
import { MobileShowcase } from "@/components/landing/mobile-showcase";
import {
  AnalyticsPreview,
  FinalCta,
  Footer,
  HowItWorks,
  QuoteBand,
} from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#FAF9F5] text-[#191817]">
      <LandingNavbar />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <HowItWorks />
        <AnalyticsPreview />
        <QuoteBand />
        <MobileShowcase />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

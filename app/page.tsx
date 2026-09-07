import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { MobileShowcase } from "@/components/landing/mobile-showcase";
import {
  AnalyticsPreview,
  FinalCta,
  Footer,
  HowItWorks,
  Pricing,
} from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#070a18] text-white">
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AnalyticsPreview />
        <MobileShowcase />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

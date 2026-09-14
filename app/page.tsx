import { LandingNavbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { MobileShowcase } from "@/components/landing/mobile-showcase";
import {
  AnalyticsPreview,
  FinalCta,
  Footer,
  HowItWorks,
} from "@/components/landing/sections";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-white text-[#131834]">
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AnalyticsPreview />
        <MobileShowcase />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

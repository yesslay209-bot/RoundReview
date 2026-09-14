import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { Reveal } from "./reveal";
import { Flower, Starburst, Sticker, WaveDivider } from "./decor";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Log your rounds",
      body: "After each tournament, record every round — opponent, side, result, speaker points, and the judge's written feedback. Or paste your results straight from Tabroom.",
    },
    {
      n: "02",
      title: "See the patterns",
      body: "Analytics and insights surface what judges keep mentioning, which side you win more on, and where your speaks are trending.",
    },
    {
      n: "03",
      title: "Prepare with intent",
      body: "Before the next tournament, review your focus areas, run the prep checklist, and drill speeches with the built-in timer.",
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#FAF9F5] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full bg-[#DDE1F8] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3D4785]">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#191817] sm:text-4xl">
            Your next tournament starts with{" "}
            <span className="font-serif font-normal italic">your last one</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="h-full">
              <div className="group relative h-full rounded-2xl border border-[#E7E4DB] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#191817]">
                <span className="font-serif text-5xl italic text-[#DDD9CE] transition-colors group-hover:text-[#4F46E5]">
                  {s.n}
                </span>
                {i < steps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-4 top-1/2 hidden size-5 -translate-y-1/2 text-[#C9C5B8] md:block"
                    aria-hidden
                  />
                )}
                <h3 className="mt-3 font-display text-lg font-semibold text-[#191817]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#56534B]">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AnalyticsPreview() {
  const bars = [55, 68, 40, 75, 62, 85, 70, 92];
  return (
    <section id="analytics" className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="rounded-2xl border border-[#E7E4DB] bg-white p-6 shadow-[0_24px_50px_-30px_rgb(25_24_23/0.35)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9B978C]">
                  Win rate by tournament
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-[#191817]">70%</p>
              </div>
              <span className="rounded-full bg-[#E9F2EC] px-2.5 py-1 text-xs font-bold text-[#2F7A57]">
                ▲ trending up
              </span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-2.5" aria-hidden>
              {bars.map((h, i) => (
                <div key={i} className="group relative flex-1 rounded-t-md bg-[#F0EEE6]">
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-[#191817] transition-all duration-300 group-hover:bg-[#4F46E5]"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#EFEDE6] pt-5">
              {[
                ["Affirmative", "80%"],
                ["Negative", "60%"],
                ["Avg Speaks", "27.9"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] uppercase tracking-wider text-[#9B978C]">{k}</p>
                  <p className="font-display text-lg font-bold text-[#191817]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="order-1 lg:order-2">
          <p className="inline-block rounded-full bg-[#E3EDE3] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#3E6B4A]">
            Analytics
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#191817] sm:text-4xl">
            Know your record. Know your strengths.{" "}
            <span className="font-serif font-normal italic">Know what comes next.</span>
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Win/loss trends across the whole season",
              "Speaker point trajectory, round by round",
              "Side performance: Affirmative vs. Negative win rates",
              "Improvement areas ranked by how often judges mention them",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3A3830]">
                <Check className="mt-0.5 size-5 shrink-0 text-[#2F7A57]" aria-hidden />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard"
            className="link-draw mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#4F46E5]"
          >
            See it live in the demo <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Full-width typographic brand statement between sections. */
export function QuoteBand() {
  return (
    <section className="relative overflow-hidden bg-[#FAF9F5] py-20">
      <Flower className="absolute left-10 top-10 hidden w-12 -rotate-12 md:block" color="#F4EBC3" />
      <Starburst
        className="spin-slow absolute bottom-12 right-14 hidden w-9 md:block"
        color="#DDE1F8"
      />
      <WaveDivider />
      <Reveal className="mx-auto max-w-4xl px-4 pt-10 text-center sm:px-6">
        <p className="font-serif text-4xl italic leading-tight tracking-tight text-[#191817] sm:text-6xl">
          Every ballot{" "}
          <span className="rounded-lg bg-[#F9E3EC] px-2 box-decoration-clone">tells you</span>{" "}
          something.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-[#56534B]">
          {BRAND.name} makes sure you hear it — and turns it into what you practice next.
        </p>
      </Reveal>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-white pb-24 pt-4">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#DDE1F8] px-6 py-16 text-center">
            <Starburst
              className="spin-slow absolute left-8 top-8 w-8"
              color="#FAF9F5"
            />
            <Flower className="absolute -bottom-4 right-8 w-16 rotate-12" color="#F9E3EC" />
            <div className="absolute right-10 top-8 hidden rotate-6 sm:block">
              <Sticker color="butter">free to use</Sticker>
            </div>
            <h2 className="relative font-display text-3xl font-bold tracking-tight text-[#191817] sm:text-4xl">
              Turn feedback into{" "}
              <span className="font-serif font-normal italic">progress.</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-[#4A4C63]">
              {BRAND.tagline} Start tracking your season in under a minute.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#191817] px-7 py-3.5 text-sm font-bold text-[#FAF9F5] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgb(25_24_23/0.4)] active:translate-y-0"
              >
                Get Started Free <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/dashboard"
                className="link-draw text-sm font-semibold text-[#3D4785]"
              >
                or explore the live demo
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#E7E4DB] bg-[#FAF9F5]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-[#9B978C] sm:flex-row sm:px-6">
        <p className="font-display font-semibold text-[#3A3830]">{BRAND.name}</p>
        <div className="flex gap-6">
          <a href="#features" className="link-draw transition-colors hover:text-[#191817]">
            Features
          </a>
          <a href="#mobile" className="link-draw transition-colors hover:text-[#191817]">
            Mobile
          </a>
          <Link href="/resources" className="link-draw transition-colors hover:text-[#191817]">
            Resources
          </Link>
          <Link href="/signin" className="link-draw transition-colors hover:text-[#191817]">
            Sign In
          </Link>
        </div>
        <p>© 2026 {BRAND.name}</p>
      </div>
    </footer>
  );
}

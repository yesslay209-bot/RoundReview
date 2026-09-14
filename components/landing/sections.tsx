import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";

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
    <section id="how-it-works" className="bg-[#FBFBFE] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#5B5BD6]">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#131834] sm:text-4xl">
            Your next tournament starts with your last one
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-2xl border border-[#E7E8F2] bg-white p-7 shadow-[0_1px_2px_rgb(19_24_52/0.04)]"
            >
              <span className="font-display text-4xl font-bold text-[#E3E5F4]">{s.n}</span>
              {i < steps.length - 1 && (
                <ArrowRight
                  className="absolute -right-4 top-1/2 hidden size-5 -translate-y-1/2 text-[#C6C9D9] md:block"
                  aria-hidden
                />
              )}
              <h3 className="mt-3 font-display text-lg font-semibold text-[#131834]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5B6178]">{s.body}</p>
            </div>
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
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl border border-[#E7E8F2] bg-white p-6 shadow-[0_20px_50px_-24px_rgb(76_82_166/0.3)]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9AA0B5]">
                  Win rate by tournament
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-[#131834]">70%</p>
              </div>
              <span className="rounded-full bg-[#E5F6EE] px-2.5 py-1 text-xs font-bold text-[#12915B]">
                ▲ trending up
              </span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-2.5" aria-hidden>
              {bars.map((h, i) => (
                <div key={i} className="group relative flex-1 rounded-t-md bg-[#F1F2F9]">
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-[#6366F1] to-[#8B5CF6] transition-all duration-500 group-hover:from-[#5B5BD6] group-hover:to-[#A78BFA]"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#ECEDF5] pt-5">
              {[
                ["Affirmative", "80%"],
                ["Negative", "60%"],
                ["Avg Speaks", "27.9"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] uppercase tracking-wider text-[#9AA0B5]">{k}</p>
                  <p className="font-display text-lg font-bold text-[#131834]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-widest text-[#5B5BD6]">Analytics</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#131834] sm:text-4xl">
            Know your record. Know your strengths. Know what comes next.
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Win/loss trends across the whole season",
              "Speaker point trajectory, round by round",
              "Side performance: Affirmative vs. Negative win rates",
              "Improvement areas ranked by how often judges mention them",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3A3F55]">
                <Check className="mt-0.5 size-5 shrink-0 text-[#12A96B]" aria-hidden />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#5B5BD6] transition-colors hover:text-[#3F3FBF]"
          >
            See where you&apos;re improving <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="bg-[#FBFBFE] pb-24 pt-4">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5B5BD6] to-[#8B5CF6] px-6 py-16 text-center shadow-[0_30px_70px_-30px_rgb(91_91_214/0.7)]">
          <div
            className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#EC5C9B]/30 blur-[80px]"
            aria-hidden
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Turn feedback into progress.
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-white/80">
            {BRAND.tagline} Start tracking your season in under a minute.
          </p>
          <Link
            href="/signup"
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#3F3FBF] transition-all hover:bg-[#F0F1FF] active:scale-[0.98]"
          >
            Get Started Free <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#EAEBF3] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-[#9AA0B5] sm:flex-row sm:px-6">
        <p className="font-display font-semibold text-[#3A3F55]">{BRAND.name}</p>
        <div className="flex gap-6">
          <a href="#features" className="transition-colors hover:text-[#131834]">
            Features
          </a>
          <a href="#mobile" className="transition-colors hover:text-[#131834]">
            Mobile
          </a>
          <Link href="/resources" className="transition-colors hover:text-[#131834]">
            Resources
          </Link>
          <Link href="/signin" className="transition-colors hover:text-[#131834]">
            Sign In
          </Link>
        </div>
        <p>© 2026 {BRAND.name}</p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Log your rounds",
      body: "After each tournament, record every round — opponent, side, result, speaker points, and the judge's written feedback.",
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
    <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8ea0ff]">How It Works</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Your next tournament starts with your last one
        </h2>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            <span className="font-display text-4xl font-bold text-white/10">{s.n}</span>
            {i < steps.length - 1 && (
              <ArrowRight
                className="absolute -right-4 top-1/2 hidden size-5 -translate-y-1/2 text-white/20 md:block"
                aria-hidden
              />
            )}
            <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/55">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AnalyticsPreview() {
  const bars = [55, 68, 40, 75, 62, 85, 70, 92];
  return (
    <section id="analytics" className="relative overflow-hidden py-24">
      <div
        className="absolute left-0 top-1/4 h-[400px] w-[500px] rounded-full bg-[#3e5bff]/10 blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  Win rate by tournament
                </p>
                <p className="mt-1 font-display text-3xl font-bold text-white">70%</p>
              </div>
              <span className="rounded-full bg-[#2fbf7f]/15 px-2.5 py-1 text-xs font-bold text-[#2fbf7f]">
                ▲ trending up
              </span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-2.5" aria-hidden>
              {bars.map((h, i) => (
                <div key={i} className="group relative flex-1 rounded-t-md bg-white/5">
                  <div
                    className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-[#3e5bff] to-[#7c5cff] transition-all duration-500 group-hover:from-[#5b48f0] group-hover:to-[#9d85ff]"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {[
                ["Affirmative", "80%"],
                ["Negative", "60%"],
                ["Avg Speaks", "27.9"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">{k}</p>
                  <p className="font-display text-lg font-bold text-white">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-widest text-[#8ea0ff]">Analytics</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Know your record. Know your strengths. Know what comes next.
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Win/loss trends across the whole season",
              "Speaker point trajectory, round by round",
              "Side performance: Affirmative vs. Negative win rates",
              "Improvement areas ranked by how often judges mention them",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-white/65">
                <Check className="mt-0.5 size-5 shrink-0 text-[#2fbf7f]" aria-hidden />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#8ea0ff] transition-colors hover:text-white"
          >
            See where you&apos;re improving <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const tiers = [
    {
      name: "Debater",
      price: "Free",
      period: "",
      blurb: "Everything a competitor needs for a full season.",
      cta: "Get Started",
      highlight: false,
      features: [
        "Unlimited tournaments & rounds",
        "Judge feedback journal",
        "Season analytics",
        "Debate timer & checklist",
      ],
    },
    {
      name: "Varsity",
      price: "$6",
      period: "/month",
      blurb: "For debaters who want every edge.",
      cta: "Start Free Trial",
      highlight: true,
      features: [
        "Everything in Debater",
        "Advanced insights & trends",
        "Custom timer formats",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: "$29",
      period: "/month",
      blurb: "For squads and coaches.",
      cta: "Contact Us",
      highlight: false,
      features: [
        "Everything in Varsity",
        "Up to 25 team members",
        "Coach dashboards",
        "Shared evidence checklists",
      ],
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#8ea0ff]">Pricing</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Start free. Stay competitive.
        </h2>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`relative rounded-2xl border p-7 ${
              t.highlight
                ? "border-[#3e5bff]/60 bg-gradient-to-b from-[#3e5bff]/15 to-transparent shadow-[0_20px_60px_-20px_rgb(62_91_255/0.5)]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            {t.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#3e5bff] to-[#7c5cff] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-lg font-semibold text-white">{t.name}</h3>
            <p className="mt-3">
              <span className="font-display text-4xl font-bold text-white">{t.price}</span>
              <span className="text-sm text-white/40">{t.period}</span>
            </p>
            <p className="mt-2 text-sm text-white/50">{t.blurb}</p>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                  <Check className="mt-0.5 size-4 shrink-0 text-[#2fbf7f]" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`mt-7 block rounded-xl py-3 text-center text-sm font-bold transition-all active:scale-[0.98] ${
                t.highlight
                  ? "bg-gradient-to-r from-[#3e5bff] to-[#5b48f0] text-white hover:shadow-[0_8px_30px_-6px_rgb(62_91_255/0.7)]"
                  : "border border-white/15 text-white hover:border-white/35"
              }`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
      <div className="noise relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#151b38] to-[#0d1226] px-6 py-16 text-center">
        <div
          className="absolute -top-24 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-[#7c5cff]/25 blur-[90px]"
          aria-hidden
        />
        <h2 className="relative font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Turn feedback into progress.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-white/55">
          {BRAND.tagline} Start tracking your season in under a minute.
        </p>
        <Link
          href="/signup"
          className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#0b1024] transition-all hover:bg-[#e8ebff] active:scale-[0.98]"
        >
          Get Started Free <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-white/40 sm:flex-row sm:px-6">
        <p className="font-display font-semibold text-white/70">{BRAND.name}</p>
        <div className="flex gap-6">
          <a href="#features" className="hover:text-white/80 transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-white/80 transition-colors">
            Pricing
          </a>
          <Link href="/resources" className="hover:text-white/80 transition-colors">
            Resources
          </Link>
          <Link href="/signin" className="hover:text-white/80 transition-colors">
            Sign In
          </Link>
        </div>
        <p>© 2026 {BRAND.name}</p>
      </div>
    </footer>
  );
}

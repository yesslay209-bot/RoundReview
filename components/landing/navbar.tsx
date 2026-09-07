"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Gavel } from "lucide-react";
import { BRAND } from "@/lib/brand";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#analytics", label: "Analytics" },
  { href: "#mobile", label: "Mobile" },
  { href: "#pricing", label: "Pricing" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a18]/80 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3e5bff] to-[#7c5cff]">
            <Gavel className="size-4 text-white" aria-hidden />
          </span>
          {BRAND.name}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signin"
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#0b1024] transition-all hover:bg-[#e8ebff] active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#070a18] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3 border-t border-white/10 pt-4">
              <Link
                href="/signin"
                className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-lg bg-white px-4 py-2.5 text-center text-sm font-bold text-[#0b1024]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

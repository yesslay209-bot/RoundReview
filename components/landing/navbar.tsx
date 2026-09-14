"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { LogoMark } from "@/components/brand/logo";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#analytics", label: "Analytics" },
  { href: "#mobile", label: "Mobile" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E4DB] bg-[#FAF9F5]/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-display text-lg font-bold text-[#191817]"
        >
          <LogoMark className="size-9" />
          {BRAND.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-draw text-sm font-semibold text-[#56534B] transition-colors hover:text-[#191817]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/signin"
            className="link-draw text-sm font-semibold text-[#56534B] transition-colors hover:text-[#191817]"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-[#191817] px-5 py-2 text-sm font-bold text-[#FAF9F5] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgb(25_24_23/0.4)] active:translate-y-0"
          >
            Get Started
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-[#191817] md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#E7E4DB] bg-[#FAF9F5] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#56534B] hover:bg-[#F0EEE6] hover:text-[#191817]"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3 border-t border-[#E7E4DB] pt-4">
              <Link
                href="/signin"
                className="flex-1 rounded-full border border-[#D9D6CB] px-4 py-2.5 text-center text-sm font-semibold text-[#191817]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-full bg-[#191817] px-4 py-2.5 text-center text-sm font-bold text-[#FAF9F5]"
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

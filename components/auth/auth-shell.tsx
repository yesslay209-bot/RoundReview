import Link from "next/link";
import { Gavel } from "lucide-react";
import { BRAND } from "@/lib/brand";
import type { ReactNode } from "react";

export function AuthShell({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  return (
    <div className="noise relative flex min-h-dvh flex-col items-center justify-center bg-[#070a18] px-4 py-12">
      <div className="hero-grid absolute inset-0" aria-hidden />
      <div
        className="absolute top-0 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[#3e5bff]/20 blur-[100px]"
        aria-hidden
      />
      <Link
        href="/"
        className="relative mb-8 flex items-center gap-2 font-display text-xl font-bold text-white"
      >
        <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#3e5bff] to-[#7c5cff]">
          <Gavel className="size-4.5 text-white" aria-hidden />
        </span>
        {BRAND.name}
      </Link>
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-pop backdrop-blur-sm">
        {children}
      </div>
      <p className="relative mt-6 text-sm text-white/40">{footer}</p>
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4.5" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z"
      />
    </svg>
  );
}

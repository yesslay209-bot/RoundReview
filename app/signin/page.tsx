"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, GoogleIcon } from "@/components/auth/auth-shell";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#3e5bff] transition-colors";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock authentication: any credentials sign in. Replace with a real
  // provider (Supabase/Firebase/NextAuth) by swapping this handler.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <AuthShell
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[#8ea0ff] hover:text-white">
            Create an account
          </Link>
        </>
      }
    >
      <h1 className="font-display text-2xl font-bold text-white">Welcome back</h1>
      <p className="mt-1 text-sm text-white/50">Pick up right where your season left off.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-white/60">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@school.edu"
            className={inputClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-white/60">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-[#8ea0ff] hover:text-white transition-colors"
              onClick={() => alert("Password reset is not wired up in this demo build.")}
            >
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-[#3e5bff] to-[#5b48f0] py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_8px_30px_-6px_rgb(62_91_255/0.6)] active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-white/30">
        <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/35"
      >
        <GoogleIcon /> Continue with Google
      </button>
    </AuthShell>
  );
}

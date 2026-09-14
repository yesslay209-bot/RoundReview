"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, GoogleIcon } from "@/components/auth/auth-shell";

const inputClass =
  "w-full rounded-lg border border-[#D9DBEA] bg-white px-3.5 py-2.5 text-sm text-[#131834] placeholder:text-[#B7BBCB] focus:border-[#5B5BD6] transition-colors";

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
          <Link href="/signup" className="font-semibold text-[#5B5BD6] hover:text-[#3F3FBF]">
            Create an account
          </Link>
        </>
      }
    >
      <h1 className="font-display text-2xl font-bold text-[#131834]">Welcome back</h1>
      <p className="mt-1 text-sm text-[#8A90A5]">Pick up right where your season left off.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-[#5B6178]">
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
            <label htmlFor="password" className="text-xs font-semibold text-[#5B6178]">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-[#5B5BD6] hover:text-[#3F3FBF] transition-colors"
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
          className="w-full rounded-lg bg-[#5B5BD6] py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4747C2] active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-[#B7BBCB]">
        <span className="h-px flex-1 bg-[#EAEBF3]" /> or <span className="h-px flex-1 bg-[#EAEBF3]" />
      </div>

      <button
        onClick={() => router.push("/dashboard")}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-[#D9DBEA] py-2.5 text-sm font-semibold text-[#3A3F55] transition-colors hover:border-[#B9BDDC]"
      >
        <GoogleIcon /> Continue with Google
      </button>
    </AuthShell>
  );
}

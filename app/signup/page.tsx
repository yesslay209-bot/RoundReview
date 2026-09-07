"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell, GoogleIcon } from "@/components/auth/auth-shell";
import { DEBATE_FORMATS } from "@/lib/types";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#3e5bff] transition-colors";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock sign-up; swap for a real auth provider later.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("password") !== form.get("confirm")) {
      setError("Passwords don't match.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 500);
  };

  return (
    <AuthShell
      footer={
        <>
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-[#8ea0ff] hover:text-white">
            Sign in
          </Link>
        </>
      }
    >
      <h1 className="font-display text-2xl font-bold text-white">Create your account</h1>
      <p className="mt-1 text-sm text-white/50">Every round makes you better. Start tracking.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-white/60">
            Full Name
          </label>
          <input id="name" name="name" required placeholder="Alex Rivera" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-white/60">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@school.edu"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-white/60">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-xs font-semibold text-white/60">
              Confirm Password
            </label>
            <input id="confirm" name="confirm" type="password" required className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="school" className="mb-1.5 block text-xs font-semibold text-white/60">
            School
          </label>
          <input id="school" name="school" placeholder="Westfield High School" className={inputClass} />
        </div>
        <div>
          <label htmlFor="format" className="mb-1.5 block text-xs font-semibold text-white/60">
            Debate Format
          </label>
          <select id="format" name="format" className={inputClass} defaultValue="Lincoln-Douglas">
            {DEBATE_FORMATS.map((f) => (
              <option key={f} value={f} className="bg-[#0d1226]">
                {f}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="text-sm text-[#f2634e]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-[#3e5bff] to-[#5b48f0] py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_8px_30px_-6px_rgb(62_91_255/0.6)] active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create Account"}
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

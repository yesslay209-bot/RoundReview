"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Gavel,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  MessageSquareQuote,
  Moon,
  Settings,
  Sun,
  Timer,
  X,
} from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useAppData } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tournaments", label: "Tournaments", icon: CalendarDays },
  { href: "/feedback", label: "Judge Feedback", icon: MessageSquareQuote },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/timer", label: "Debate Timer", icon: Timer },
  { href: "/checklist", label: "Checklist", icon: ClipboardCheck },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex size-9 items-center justify-center rounded-lg text-soft transition-colors hover:bg-card2 hover:text-ink"
    >
      {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
    </button>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="App navigation" className="flex flex-1 flex-col gap-0.5 px-3">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-accent/10 text-accent"
                : "text-soft hover:bg-card2 hover:text-ink"
            )}
          >
            <item.icon className="size-4.5 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserFooter() {
  const { data } = useAppData();
  const initials = data.user.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="border-t border-line px-3 py-3">
      <div className="flex items-center gap-3 rounded-lg px-2 py-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-violet text-xs font-bold text-white">
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{data.user.name}</span>
          <span className="block truncate text-xs text-faint">{data.user.school}</span>
        </span>
        <ThemeToggle />
        <Link
          href="/"
          aria-label="Log out"
          className="flex size-9 items-center justify-center rounded-lg text-soft transition-colors hover:bg-card2 hover:text-ink"
        >
          <LogOut className="size-4.5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <div className="flex min-h-dvh bg-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-card lg:flex">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-6 py-5 font-display text-lg font-bold"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-violet">
            <Gavel className="size-4 text-white" aria-hidden />
          </span>
          {BRAND.name}
        </Link>
        <NavLinks />
        <UserFooter />
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-card/90 px-4 backdrop-blur-lg lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 font-display font-bold">
          <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-violet">
            <Gavel className="size-3.5 text-white" aria-hidden />
          </span>
          {BRAND.name}
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-soft hover:bg-card2"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-navy/60"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-card shadow-pop">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="flex items-center gap-2 font-display font-bold">
                <span className="flex size-7 items-center justify-center rounded-md bg-gradient-to-br from-accent to-violet">
                  <Gavel className="size-3.5 text-white" aria-hidden />
                </span>
                {BRAND.name}
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg p-2 text-soft hover:bg-card2"
              >
                <X className="size-5" />
              </button>
            </div>
            <NavLinks onNavigate={() => setDrawerOpen(false)} />
            <UserFooter />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 pt-14 lg:pl-60 lg:pt-0">
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

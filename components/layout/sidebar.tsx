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
import { LogoMark } from "@/components/brand/logo";
import { useAppData } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Your Season",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/tournaments", label: "Tournaments", icon: CalendarDays },
      { href: "/feedback", label: "Judge Feedback", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Improve",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/insights", label: "Insights", icon: Lightbulb },
    ],
  },
  {
    label: "Prepare",
    items: [
      { href: "/timer", label: "Debate Timer", icon: Timer },
      { href: "/checklist", label: "Checklist", icon: ClipboardCheck },
      { href: "/resources", label: "Resources", icon: BookOpen },
    ],
  },
  {
    label: null,
    items: [{ href: "/settings", label: "Settings", icon: Settings }],
  },
] as const;

/** Primary destinations for the mobile bottom tab bar. */
const TAB_BAR = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/tournaments", label: "Tourneys", icon: CalendarDays },
  { href: "/feedback", label: "Feedback", icon: MessageSquareQuote },
  { href: "/insights", label: "Insights", icon: Lightbulb },
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
    <nav
      aria-label="App navigation"
      className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 scrollbar-thin"
    >
      {NAV_GROUPS.map((group, gi) => (
        <div key={group.label ?? gi} className={cn(gi > 0 && "mt-3")}>
          {group.label && (
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-faint">
              {group.label}
            </p>
          )}
          {group.items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                  active ? "bg-accent/10 text-accent" : "text-soft hover:bg-card2 hover:text-ink"
                )}
              >
                <item.icon className="size-4.5 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function MobileTabBar({ onMore }: { onMore: () => void }) {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      {TAB_BAR.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors",
              active ? "text-accent" : "text-faint hover:text-soft"
            )}
          >
            <item.icon className="size-5" aria-hidden />
            {item.label}
          </Link>
        );
      })}
      <button
        onClick={onMore}
        className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-faint transition-colors hover:text-soft"
        aria-label="More options"
      >
        <Menu className="size-5" aria-hidden />
        More
      </button>
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
  const { hydrated } = useAppData();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setDrawerOpen(false), [pathname]);

  return (
    <div className="flex min-h-dvh bg-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-card lg:flex">
        <Link
          href="/dashboard"
          className="group flex items-center gap-2.5 px-6 py-5 font-display text-lg font-bold"
        >
          <LogoMark className="size-9" bubbleClass="text-ink" glyphClass="text-card" />
          {BRAND.name}
        </Link>
        <NavLinks />
        <UserFooter />
      </aside>

      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-card/90 px-4 backdrop-blur-lg lg:hidden">
        <Link href="/dashboard" className="group flex items-center gap-2 font-display font-bold">
          <LogoMark className="size-7" bubbleClass="text-ink" glyphClass="text-card" />
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
              <span className="group flex items-center gap-2 font-display font-bold">
                <LogoMark className="size-7" bubbleClass="text-ink" glyphClass="text-card" />
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

      {/* Content — rendered after hydration so date- and localStorage-derived
          values never mismatch the statically exported HTML. */}
      <div className="flex-1 pt-14 lg:pl-60 lg:pt-0">
        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 lg:py-8 lg:pb-8">
          {hydrated ? (
            children
          ) : (
            <div className="flex justify-center py-24" aria-label="Loading">
              <span className="size-8 animate-spin rounded-full border-2 border-line border-t-accent" />
            </div>
          )}
        </main>
      </div>

      <MobileTabBar onMore={() => setDrawerOpen(true)} />
    </div>
  );
}

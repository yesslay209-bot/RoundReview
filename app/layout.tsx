import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/ui/toast";
import { BRAND } from "@/lib/brand";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.name} — Debate Tournament Preparation & Performance Tracker`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Track tournaments, save judge feedback, analyze your debate performance, prepare with checklists, and practice with built-in debate tools.",
  openGraph: {
    title: `${BRAND.name} — Debate Tournament Preparation & Performance Tracker`,
    description:
      "Track tournaments, save judge feedback, analyze your debate performance, prepare with checklists, and practice with built-in debate tools.",
    type: "website",
    siteName: BRAND.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

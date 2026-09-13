import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Abeer Zoho CRM Plus | Implementation Solution",
  description:
    "Practical Zoho CRM Plus implementation guide for Al Abeer Medical Group — flows, architecture, and micro-steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="shell antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

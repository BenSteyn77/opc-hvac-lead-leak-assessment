import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HVAC Lead Leak Assessment | Find Where Leads Are Being Lost",
  description: "Assess 25 HVAC lead-system checkpoints and receive prioritized actions across calls, Google, website, follow-up and advertising.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

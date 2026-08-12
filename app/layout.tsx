import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HVAC Lead Leak Assessment | Omni Process Consulting",
  description: "Find missed calls, weak follow-up and potential revenue leaks across your HVAC lead system.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

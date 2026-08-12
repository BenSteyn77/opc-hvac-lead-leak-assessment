import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HVAC Lead Leak Assessment | Omni Process Consulting",
  description: "Find missed calls, weak follow-up and potential revenue leaks across your HVAC lead system.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "HVAC Lead Leak Assessment",
    description: "Find the calls, follow-up and revenue your system is losing.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "HVAC Lead Leak Assessment" }],
  },
  twitter: { card: "summary_large_image", title: "HVAC Lead Leak Assessment", description: "Find the calls, follow-up and revenue your system is losing.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

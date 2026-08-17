import type { Metadata } from "next";
import "./globals.css";
import { MetaPixel, metaPixelId } from "./meta-pixel";
import { GoogleAnalytics } from "./google-analytics";

export const metadata: Metadata = {
  title: "HVAC Lead Leak Assessment | Find Where Leads Are Being Lost",
  description: "Assess 25 HVAC lead-system checkpoints and receive prioritized actions across calls, Google, website, follow-up and advertising.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><GoogleAnalytics /><MetaPixel /><noscript><img height="1" width="1" style={{display:"none"}} src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`} alt="" /></noscript>{children}</body></html>;
}

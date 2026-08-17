"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export const gaMeasurementId = "G-H8F5K91T45";

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) { window.dataLayer!.push(args); };
    if (!document.querySelector(`script[data-ga4="${gaMeasurementId}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.dataset.ga4 = gaMeasurementId;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      document.head.appendChild(script);
      window.gtag("js", new Date());
      window.gtag("config", gaMeasurementId, { send_page_view: false });
    }
  }, []);

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}

export function trackGoogleEvent(event: string, parameters?: Record<string, unknown>) {
  window.gtag?.("event", event, parameters || {});
}

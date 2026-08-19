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

function initializeGoogleAnalytics() {
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
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    initializeGoogleAnalytics();
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [pathname]);

  // A real DOM node ensures Vinext hydrates this client component. A component
  // that rendered null was emitted in HTML but its effect never ran in Workers.
  return <span hidden aria-hidden="true" data-opc-analytics="ga4" />;
}

export function trackGoogleEvent(event: string, parameters?: Record<string, unknown>) {
  initializeGoogleAnalytics();
  window.gtag?.("event", event, parameters || {});
}

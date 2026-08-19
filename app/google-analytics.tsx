"use client";

import { useEffect, useRef } from "react";
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
  const initialPageViewSent = useRef(false);

  useEffect(() => {
    // The inline bootstrap below sends the first page view. Only send another
    // one when Next performs a client-side route change.
    if (!initialPageViewSent.current) {
      initialPageViewSent.current = true;
      return;
    }
    if (!window.gtag) return;
    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;gtag('js',new Date());gtag('config','${gaMeasurementId}');`,
        }}
      />
    </>
  );
}

export function trackGoogleEvent(event: string, parameters?: Record<string, unknown>) {
  window.gtag?.("event", event, parameters || {});
}

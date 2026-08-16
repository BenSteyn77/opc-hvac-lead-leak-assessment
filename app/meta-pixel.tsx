"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const metaPixelId = "1498246255101222";

export function MetaPixel() {
  useEffect(() => {
    if (window.fbq) return;
    const fbq = function (...args: unknown[]) {
      (fbq as unknown as { queue: unknown[][] }).queue.push(args);
    } as typeof window.fbq;
    Object.assign(fbq!, { push: fbq, loaded: true, version: "2.0", queue: [] });
    window.fbq = fbq;
    window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
    window.fbq("init", metaPixelId);
    window.fbq("track", "PageView");
  }, []);
  return null;
}

export function trackMetaEvent(event: string, parameters?: Record<string, unknown>) {
  window.fbq?.("track", event, parameters || {});
}

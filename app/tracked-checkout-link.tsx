"use client";

import { trackMetaEvent } from "./meta-pixel";

export default function TrackedCheckoutLink({ href, label }: { href: string; label: string }) {
  function beginCheckout() {
    sessionStorage.setItem("opc-hvac-assessment-checkout-started", "1");
    trackMetaEvent("InitiateCheckout", { content_name: "HVAC Lead Leak Assessment", content_category: "Interactive assessment", value: 17, currency: "USD" });
  }
  return <a className="lp-button" href={href} onClick={beginCheckout}>{label}<span>→</span></a>;
}

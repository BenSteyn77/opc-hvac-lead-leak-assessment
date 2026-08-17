"use client";

import { trackMetaEvent } from "./meta-pixel";
import { trackGoogleEvent } from "./google-analytics";

export default function TrackedCheckoutLink({ href, label }: { href: string; label: string }) {
  function beginCheckout() {
    sessionStorage.setItem("opc-hvac-assessment-checkout-started", "1");
    if (!sessionStorage.getItem("opc-hvac-assessment-checkout-id")) sessionStorage.setItem("opc-hvac-assessment-checkout-id", crypto.randomUUID());
    trackMetaEvent("InitiateCheckout", { content_name: "HVAC Lead Leak Assessment", content_category: "Interactive assessment", value: 17, currency: "USD" });
    trackGoogleEvent("begin_checkout", { currency: "USD", value: 17, items: [{ item_id: "hvac-lead-leak-assessment", item_name: "HVAC Lead Leak Assessment", price: 17, quantity: 1 }] });
  }
  return <a className="lp-button" href={href} onClick={beginCheckout}>{label}<span>→</span></a>;
}

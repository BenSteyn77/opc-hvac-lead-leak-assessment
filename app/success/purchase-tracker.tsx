"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "../meta-pixel";

export default function PurchaseTracker() {
  useEffect(() => {
    const purchaseKey = "opc-hvac-assessment-purchase-tracked";
    const checkoutStarted = sessionStorage.getItem("opc-hvac-assessment-checkout-started") === "1";
    const returnedFromStripe = document.referrer.includes("stripe.com") || new URLSearchParams(location.search).has("session_id");
    if (sessionStorage.getItem(purchaseKey) || (!checkoutStarted && !returnedFromStripe)) return;
    let attempts = 0;
    const send = () => {
      attempts += 1;
      if (window.fbq) {
        trackMetaEvent("Purchase", { content_name: "HVAC Lead Leak Assessment", content_type: "product", value: 17, currency: "USD" });
        sessionStorage.setItem(purchaseKey, "1");
        sessionStorage.removeItem("opc-hvac-assessment-checkout-started");
      } else if (attempts < 20) window.setTimeout(send, 250);
    };
    send();
  }, []);
  return null;
}

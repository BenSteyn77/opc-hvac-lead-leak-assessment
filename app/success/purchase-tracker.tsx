"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "../meta-pixel";
import { trackGoogleEvent } from "../google-analytics";

export default function PurchaseTracker() {
  useEffect(() => {
    const purchaseKey = "opc-hvac-assessment-purchase-tracked";
    const checkoutStarted = sessionStorage.getItem("opc-hvac-assessment-checkout-started") === "1";
    const returnedFromStripe = document.referrer.includes("stripe.com") || new URLSearchParams(location.search).has("session_id");
    if (sessionStorage.getItem(purchaseKey) || (!checkoutStarted && !returnedFromStripe)) return;
    let attempts = 0;
    let metaSent = false;
    let analyticsSent = false;
    const transactionId = sessionStorage.getItem("opc-hvac-assessment-checkout-id") || crypto.randomUUID();
    const send = () => {
      attempts += 1;
      if (window.fbq && !metaSent) {
        trackMetaEvent("Purchase", { content_name: "HVAC Lead Leak Assessment", content_type: "product", value: 17, currency: "USD" });
        metaSent = true;
      }
      if (window.gtag && !analyticsSent) {
        trackGoogleEvent("purchase", { transaction_id: transactionId, currency: "USD", value: 17, items: [{ item_id: "hvac-lead-leak-assessment", item_name: "HVAC Lead Leak Assessment", price: 17, quantity: 1 }] });
        analyticsSent = true;
      }
      if ((metaSent && analyticsSent) || attempts >= 20) {
        sessionStorage.setItem(purchaseKey, "1");
        sessionStorage.removeItem("opc-hvac-assessment-checkout-started");
        sessionStorage.removeItem("opc-hvac-assessment-checkout-id");
      } else window.setTimeout(send, 250);
    };
    send();
  }, []);
  return null;
}

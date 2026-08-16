import PurchaseTracker from "./purchase-tracker";

export default function SuccessPage() {
  return (
    <main className="success-page">
      <PurchaseTracker />
      <nav className="lp-nav"><a href="https://omniprocessconsulting.com/"><img src="/opc-logo.png" alt="Omni Process Consulting" /></a><span>Payment confirmed</span></nav>
      <section className="success-card">
        <div className="success-check">✓</div>
        <span className="lp-eyebrow">Your purchase is complete</span>
        <h1>Your HVAC Lead Leak Assessment is ready.</h1>
        <p>Set aside approximately eight minutes and answer based on what happens in your company today—not what the process is supposed to do.</p>
        <a className="lp-button" href="/assessment">Start My Assessment <span>→</span></a>
        <small>Bookmark this page if you would like to return later.</small>
      </section>
    </main>
  );
}

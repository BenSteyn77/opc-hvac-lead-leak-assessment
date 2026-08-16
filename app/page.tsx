import TrackedCheckoutLink from "./tracked-checkout-link";

const checkoutUrl = "https://buy.stripe.com/00w9ASeJW5GZdBX1WH6g800";

function OrderButton({ label = "Start My HVAC Assessment" }: { label?: string }) {
  return <TrackedCheckoutLink href={checkoutUrl} label={label} />;
}

const systems = [
  ["01", "Call capture", "See what happens when an urgent customer calls after hours—and whether the right information reaches the right person."],
  ["02", "Google Business Profile", "Check whether local customers can find accurate information, understand your services and see enough proof to trust you."],
  ["03", "Website conversion", "Evaluate whether your mobile website makes the service, location and next action immediately clear."],
  ["04", "Lead follow-up", "Examine whether new leads enter the right pipeline, receive confirmation and continue toward a clear outcome."],
  ["05", "Advertising accountability", "Determine whether you can connect ad spend to qualified leads, booked appointments and closed revenue."],
];

const faqs = [
  ["How long does it take?", "Most HVAC owners complete the assessment in approximately eight minutes."],
  ["Is this a PDF?", "No. It is an interactive assessment that scores your answers and creates a prioritized action plan."],
  ["Do you need access to my accounts?", "No. The assessment is self-guided and does not require access to your ads, CRM, website or Google account."],
  ["Does the revenue estimate guarantee results?", "No. It is a planning estimate based on the figures you enter. Actual results depend on lead quality, booking rates, job values and margins."],
  ["Is there a subscription?", "No. Your $17 purchase is a single payment with immediate online access."],
  ["Can I repeat it?", "Yes. Repeat the assessment after making improvements to see whether your scores change."],
];

export default function LandingPage() {
  return (
    <main className="lp-page">
      <div className="lp-bar">Built for HVAC owners who suspect good leads are slipping through the cracks.</div>

      <nav className="lp-nav">
        <a href="https://omniprocessconsulting.com/" aria-label="Omni Process Consulting home"><img src="/opc-logo.png" alt="Omni Process Consulting" /></a>
        <span>HVAC Lead Leak Assessment</span>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-copy">
          <span className="lp-eyebrow">25-point lead-system diagnostic</span>
          <h1>Find the hidden leaks costing your HVAC company calls, bookings and revenue.</h1>
          <p>Complete a practical 8-minute assessment of your call handling, Google presence, website, follow-up and advertising—then leave with a prioritized action plan showing what to fix first.</p>
          <ul><li>Score five critical parts of your lead system</li><li>Estimate the potential revenue affected by missed calls</li><li>Receive next steps based on your answers</li></ul>
          <div className="lp-price"><strong>$17</strong><span>one-time payment</span></div>
          <OrderButton />
          <small>Immediate access · No subscription · Secure Stripe checkout</small>
        </div>
        <div className="lp-product"><img src="/hvac-assessment-product.png" alt="HVAC Lead Leak Assessment diagnostic dashboard" /><div><b>8 minutes</b><span>to a clearer starting point</span></div></div>
      </section>

      <section className="lp-problem">
        <div><span className="lp-eyebrow">Getting the lead is only the beginning</span><h2>Small leaks become expensive when they happen every day.</h2></div>
        <div><p>Your company can have excellent technicians, strong reviews and a healthy advertising budget—and still lose valuable jobs between the first call and the booked appointment.</p><p>Most problems are not dramatic. They are repeated gaps: an after-hours call that reaches voicemail, an incomplete handoff, a confusing mobile page or a lead that never receives the next follow-up.</p></div>
      </section>

      <section className="lp-feature lp-feature-left" style={{backgroundImage:"linear-gradient(90deg,rgba(5,22,38,.96) 0%,rgba(5,22,38,.78) 48%,rgba(5,22,38,.12) 100%),url('/background-call-capture.png')"}}>
        <div><span className="lp-eyebrow">The opportunity</span><h2>One missed call could become a lost $5,000+ replacement opportunity.</h2><p>Not every missed call is worth $5,000. But during peak season, one unanswered no-heat call could begin as a repair enquiry and eventually become a major replacement job.</p><p>The assessment uses your own business numbers—not exaggerated promises or generic industry averages.</p></div>
      </section>

      <section className="lp-inline-cta"><h3>You cannot fix a leak you have not identified.</h3><p>Find the gaps before another valuable enquiry disappears.</p><OrderButton label="Find My Lead Leaks" /><small>Immediate access · One-time payment · No subscription</small></section>

      <section className="lp-systems">
        <div className="lp-section-head"><span className="lp-eyebrow">Five systems. Twenty-five checks.</span><h2>See the entire journey—not one isolated marketing channel.</h2><p>Answer based on what happens today, not what the process is supposed to do.</p></div>
        <div className="lp-system-grid">{systems.map(([number,title,copy])=><article key={number}><b>{number}</b><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="lp-feature lp-feature-right" style={{backgroundImage:"linear-gradient(90deg,rgba(5,22,38,.10) 0%,rgba(5,22,38,.76) 52%,rgba(5,22,38,.97) 100%),url('/background-online-presence.png')"}}>
        <div><span className="lp-eyebrow">More than visibility</span><h2>Being found is not the same as being chosen.</h2><p>Your Google profile and mobile website must quickly establish relevance, trust and a clear next action. The assessment reveals where that experience may be breaking down.</p></div>
      </section>

      <section className="lp-inline-cta lp-inline-dark"><h3>Twenty-five checks. Five critical systems. One clear place to start.</h3><p>Know which part of your lead process deserves attention first.</p><OrderButton /><small>Personalized results available immediately</small></section>

      <section className="lp-deliverables">
        <div className="lp-section-head"><span className="lp-eyebrow">Your results</span><h2>This is not another thin checklist.</h2><p>The assessment responds to your answers and produces a practical breakdown of your lead system.</p></div>
        <div className="lp-deliverable-grid">
          <div className="lp-result-card"><span>Your lead-system score</span><strong>0–100</strong><p>A single benchmark supported by five individual section scores.</p></div>
          <ul><li>Five category scores</li><li>Your three highest-priority weaknesses</li><li>Every failed check identified</li><li>A practical next step for each weakness</li><li>A conservative missed-revenue estimate</li><li>Real-world testing instructions</li></ul>
        </div>
      </section>

      <section className="lp-feature lp-feature-left" style={{backgroundImage:"linear-gradient(90deg,rgba(5,22,38,.97) 0%,rgba(5,22,38,.78) 48%,rgba(5,22,38,.12) 100%),url('/background-lead-follow-up.png')"}}>
        <div><span className="lp-eyebrow">Follow the handoffs</span><h2>Good leads often disappear between systems.</h2><p>The call, CRM, calendar, technician alert and customer follow-up may each work individually. The risk appears when nobody tests whether they work together.</p></div>
      </section>

      <section className="lp-inline-cta"><h3>One recovered opportunity could repay the assessment many times over.</h3><p>Stop relying on assumptions. See what deserves attention first.</p><OrderButton label="Show Me What to Fix First" /><small>Only $17 · No recurring charges</small></section>

      <section className="lp-fit">
        <div><span className="lp-eyebrow">Built for service businesses where calls matter</span><h2>This assessment is for you if…</h2></div>
        <ul><li>You own or manage an HVAC service company</li><li>You receive emergency or after-hours enquiries</li><li>You invest in Google or Meta advertising</li><li>You are unsure how many leads become booked jobs</li><li>Your calls, website, CRM and calendar do not work together</li><li>You want practical improvements before an expensive consultation</li></ul>
      </section>

      <section className="lp-feature lp-feature-right" style={{backgroundImage:"linear-gradient(90deg,rgba(5,22,38,.12) 0%,rgba(5,22,38,.76) 52%,rgba(5,22,38,.97) 100%),url('/background-ad-accountability.png')"}}>
        <div><span className="lp-eyebrow">Advertising accountability</span><h2>Clicks are not the result. Booked and closed work is.</h2><p>See whether your reporting connects advertising spend to qualified calls, appointments and revenue—or stops at activity that never reaches the schedule.</p></div>
      </section>

      <section className="lp-upgrade">
        <div><span className="lp-eyebrow">Available after your assessment</span><h2>Need a deeper review of the entire company?</h2><p>Assessment customers receive access to a private Complete Business Assessment offer covering calls, website, Google profile, advertising, CRM, calendar, follow-up and automation opportunities.</p></div>
        <div className="lp-upgrade-price"><span>Standard scope</span><s>$2,000</s><strong>$370</strong><p>Preferred-client offer available only through this assessment funnel.</p></div>
      </section>

      <section className="lp-guarantee"><b>Practical-value guarantee</b><p>Complete all 25 questions and review your results. If the assessment does not identify at least one practical improvement you can apply to your lead process, contact us within seven days for a refund.</p></section>

      <section className="lp-faq"><div className="lp-section-head"><span className="lp-eyebrow">Questions</span><h2>Before you begin</h2></div><div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>

      <section className="lp-final"><span className="lp-eyebrow">Your next missed call may already be looking elsewhere.</span><h2>Find the weak points between the first call and the booked job.</h2><p>Get your personalized HVAC Lead Leak Assessment and start strengthening the system today.</p><div className="lp-price"><strong>$17</strong><span>one-time payment</span></div><OrderButton label="Get Immediate Access" /><small>Secure Stripe checkout · Approximately 8 minutes · Actionable results</small></section>

      <footer className="lp-footer"><img src="/opc-logo.png" alt="Omni Process Consulting" /><p>© 2026 Omni Process Consulting. This assessment provides planning guidance, not guaranteed financial results.</p></footer>
    </main>
  );
}

"use client";

import { useMemo, useState } from "react";

type Answer = "yes" | "no" | null;

const sections = [
  {
    eyebrow: "Call capture",
    title: "What happens when a customer calls after hours?",
    intro: "Answer based on what happens today - not what the process is supposed to do.",
    questions: [
      "Every after-hours call receives an immediate, useful response.",
      "The caller is told what will happen next and when.",
      "The standby technician receives the name, address, symptoms and urgency by text.",
      "Missed calls trigger an automatic text-back within two minutes.",
      "A test call confirms the process works from call to booked appointment.",
    ],
    steps: [
      "Call your company after hours from an unfamiliar number and time how long it takes to receive a useful response.",
      "Rewrite the greeting so it states who will respond, what information is needed and the expected response time.",
      "Create one standby alert containing the caller's name, address, issue, urgency and callback number.",
      "Enable an immediate missed-call text that acknowledges the customer and asks whether the issue is urgent.",
      "Run one end-to-end test every month and record where the handoff fails.",
    ],
  },
  {
    eyebrow: "Google Business Profile",
    title: "Can local customers find and trust you?",
    intro: "Search your company name on Google and check the live profile on a phone.",
    questions: [
      "Phone, website, service area, category and opening hours are accurate.",
      "Your profile lists specific services such as furnace repair and no-heat service.",
      "Recent real photos and professional review replies are visible.",
      "The primary category and service areas match the work you most want to win.",
      "New reviews are requested consistently and mention the service and location naturally.",
    ],
    steps: [
      "Open your profile in Google Search and correct the phone, website, hours and service area.",
      "Add each profitable service individually with a plain-language description and no keyword stuffing.",
      "Upload current team, vehicle and completed-job photos, then reply to every unanswered review.",
      "Compare your primary category and service areas with three strong local competitors and correct any mismatch.",
      "Send a direct review link after completed jobs and let the customer describe their real experience.",
    ],
  },
  {
    eyebrow: "Website",
    title: "Does your mobile site turn urgency into a call?",
    intro: "Open your website on mobile data, not office Wi-Fi.",
    questions: [
      "Service, location and the next action are clear within three seconds.",
      "A visible Call Now button works without scrolling.",
      "The page shows real trust proof and a short emergency enquiry form.",
      "Core pages load quickly and are easy to use on a mobile connection.",
      "Each priority service and location has relevant, useful page content.",
    ],
    steps: [
      "Rewrite the first screen to show the service, service area and one clear call-to-action.",
      "Test the phone button on iPhone and Android and keep a sticky call button visible on mobile.",
      "Add recent reviews, licenses, guarantees and a short form that only asks what dispatch needs.",
      "Run the homepage through PageSpeed Insights and fix oversized images and major mobile layout issues first.",
      "Create useful pages for your highest-value service and location combinations instead of sending every click home.",
    ],
  },
  {
    eyebrow: "Follow-up",
    title: "Does every lead reach the right person?",
    intro: "Follow one recent lead from first contact through to its final outcome.",
    questions: [
      "The customer receives a confirmation text immediately.",
      "Every lead enters the CRM with source, urgency and a clear owner.",
      "Unbooked leads, estimates and completed jobs trigger the correct next step.",
      "No-response leads receive a structured sequence across more than one day.",
      "Management can see response time, booking status and lost-lead reasons.",
    ],
    steps: [
      "Send an immediate confirmation containing the request, next step and company contact details.",
      "Make source, urgency, owner and next action required fields before a lead can sit in the CRM.",
      "Create separate follow-ups for unbooked calls, open estimates, completed jobs and review requests.",
      "Use a short multi-day follow-up sequence and stop it automatically when the customer replies or books.",
      "Review a weekly pipeline report showing response time, booked, won, lost and the reason each lead was lost.",
    ],
  },
  {
    eyebrow: "Advertising",
    title: "Can you connect ad spend to booked revenue?",
    intro: "Clicks and cheap leads are not the result. Follow the money to closed work.",
    questions: [
      "Google Ads calls and forms are recorded as conversions.",
      "Emergency searches land on a matching HVAC page rather than a generic homepage.",
      "Weekly reporting includes qualified leads, booked jobs and closed revenue by source.",
      "Search terms and location targeting are reviewed regularly to remove wasted spend.",
      "Campaign decisions are based on cost per booked or closed job, not clicks alone.",
    ],
    steps: [
      "Test every ad phone number and form, then confirm each successful action appears as a conversion.",
      "Send urgent searches to a fast page that matches the exact service, location and next action.",
      "Build one weekly scorecard covering spend, leads, qualified leads, booked jobs and closed revenue by source.",
      "Review search terms and served locations weekly; exclude irrelevant queries and areas you cannot profitably serve.",
      "Calculate cost per booked job and cost per closed job before increasing or cutting campaign spend.",
    ],
  },
];

const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);

export default function Home() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(Array(totalQuestions).fill(null));
  const [calls, setCalls] = useState(10);
  const [missedPercent, setMissedPercent] = useState(30);
  const [averageInvoice, setAverageInvoice] = useState(700);
  const [closeRate, setCloseRate] = useState(70);

  const offsets = useMemo(() => {
    let current = 0;
    return sections.map((section) => {
      const offset = current;
      current += section.questions.length;
      return offset;
    });
  }, []);

  const yesCount = answers.filter((answer) => answer === "yes").length;
  const completed = answers.filter(Boolean).length;
  const score = Math.round((yesCount / totalQuestions) * 100);
  const missedCalls = calls * (missedPercent / 100);
  const revenueLeak = Math.round(missedCalls * averageInvoice * (closeRate / 100));
  const isResults = step === sections.length + 1;
  const isCalculator = step === sections.length;
  const currentSection = sections[step];
  const sectionComplete = currentSection
    ? currentSection.questions.every((_, index) => answers[offsets[step] + index] !== null)
    : true;

  const breakdown = sections
    .map((section, index) => ({
      title: section.eyebrow,
      failures: section.questions.filter((_, q) => answers[offsets[index] + q] === "no").length,
      score: Math.round((section.questions.filter((_, q) => answers[offsets[index] + q] === "yes").length / section.questions.length) * 100),
      actions: section.questions.flatMap((question, q) => answers[offsets[index] + q] === "no" ? [{ question, step: section.steps[q] }] : []),
    }));

  const priorities = breakdown
    .filter((item) => item.failures > 0)
    .sort((a, b) => b.failures - a.failures)
    .slice(0, 3);

  function setAnswer(questionIndex: number, answer: Answer) {
    setAnswers((current) => current.map((value, index) => (index === questionIndex ? answer : value)));
  }

  function reset() {
    setStarted(false);
    setStep(0);
    setAnswers(Array(totalQuestions).fill(null));
    setCalls(10);
    setMissedPercent(30);
    setAverageInvoice(700);
    setCloseRate(70);
  }

  if (!started) {
    return (
      <main className="shell intro-shell">
        <nav className="brandbar">
          <a className="brand" href="https://omniprocessconsulting.com/">OMNI <span>PROCESS</span></a>
          <span className="nav-note">HVAC lead systems</span>
        </nav>
        <section className="hero">
          <div className="hero-copy">
            <div className="pill">Free 8-minute assessment</div>
            <h1>Find the leaks between the first call and the booked job.</h1>
            <p className="lede">Check your after-hours response, Google profile, website, follow-up and advertising - then estimate what missed opportunities may be costing you.</p>
            <div className="hero-actions">
              <button className="primary" onClick={() => setStarted(true)}>Start the assessment <span>→</span></button>
              <span>No login. Results are instant.</span>
            </div>
            <div className="proof-row">
              <div><strong>5</strong><span>systems checked</span></div>
              <div><strong>25</strong><span>practical questions</span></div>
              <div><strong>1</strong><span>prioritized action plan</span></div>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Assessment preview">
            <span className="signal">Lead system live</span>
            <div className="call-card">
              <div className="call-icon">☎</div>
              <div><strong>After-hours no-heat call</strong><span>Captured and routed in seconds</span></div>
              <b>High intent</b>
            </div>
            <div className="pipeline">
              {['Call', 'Capture', 'CRM', 'Booked'].map((item, index) => <div key={item}><i>{index + 1}</i><span>{item}</span></div>)}
            </div>
            <div className="loss-card"><span>Potential leak</span><strong>Voicemail → competitor</strong></div>
          </aside>
        </section>
        <footer>Built for HVAC companies where every winter call counts.</footer>
      </main>
    );
  }

  return (
    <main className="shell app-shell">
      <nav className="brandbar compact">
        <button className="brand brand-button" onClick={reset}>OMNI <span>PROCESS</span></button>
        <span className="nav-note">HVAC Lead Leak Assessment</span>
      </nav>

      <div className="progress-wrap" aria-label={`Assessment progress: ${Math.min(step + 1, sections.length + 2)} of ${sections.length + 2}`}>
        <div className="progress-label"><span>Assessment progress</span><strong>{Math.round((Math.min(step + 1, sections.length + 2) / (sections.length + 2)) * 100)}%</strong></div>
        <div className="progress"><i style={{ width: `${(Math.min(step + 1, sections.length + 2) / (sections.length + 2)) * 100}%` }} /></div>
      </div>

      {currentSection && (
        <section className="assessment-card">
          <div className="step-count">0{step + 1}</div>
          <div className="section-heading">
            <span>{currentSection.eyebrow}</span>
            <h2>{currentSection.title}</h2>
            <p>{currentSection.intro}</p>
          </div>
          <div className="question-list">
            {currentSection.questions.map((question, index) => {
              const globalIndex = offsets[step] + index;
              return (
                <div className="question" key={question}>
                  <p><b>{String(index + 1).padStart(2, '0')}</b>{question}</p>
                  <div className="choice" role="group" aria-label={question}>
                    <button className={answers[globalIndex] === "yes" ? "selected yes" : ""} onClick={() => setAnswer(globalIndex, "yes")}>Yes</button>
                    <button className={answers[globalIndex] === "no" ? "selected no" : ""} onClick={() => setAnswer(globalIndex, "no")}>Not yet</button>
                  </div>
                </div>
              );
            })}
          </div>
          {!sectionComplete && <p className="helper">Answer all five questions to continue.</p>}
        </section>
      )}

      {isCalculator && (
        <section className="assessment-card calculator-card">
          <div className="step-count">06</div>
          <div className="section-heading"><span>Revenue estimate</span><h2>What could missed calls be worth?</h2><p>Use conservative numbers from your business. This is an estimate, not a guarantee.</p></div>
          <div className="inputs-grid">
            <label>After-hours calls per month<input type="number" min="0" value={calls} onChange={(e) => setCalls(Number(e.target.value))} /></label>
            <label>Unanswered or not followed up<input type="number" min="0" max="100" value={missedPercent} onChange={(e) => setMissedPercent(Number(e.target.value))} /><em>%</em></label>
            <label>Average completed repair invoice<input type="number" min="0" value={averageInvoice} onChange={(e) => setAverageInvoice(Number(e.target.value))} /><em>$</em></label>
            <label>Booking and approval rate<input type="number" min="0" max="100" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} /><em>%</em></label>
          </div>
          <div className="estimate"><span>Potential monthly repair revenue at risk</span><strong>${revenueLeak.toLocaleString()}</strong><p>{missedCalls.toFixed(1)} estimated missed qualified calls × ${averageInvoice.toLocaleString()} × {closeRate}% close rate</p></div>
        </section>
      )}

      {isResults && (
        <section className="results">
          <div className="result-hero">
            <div className={`score-ring ${score >= 80 ? 'good' : score >= 55 ? 'mid' : 'low'}`} style={{ '--score': `${score * 3.6}deg` } as React.CSSProperties}><div><strong>{score}</strong><span>/ 100</span></div></div>
            <div><span className="result-label">Your lead-system score</span><h2>{score >= 80 ? 'Strong foundation. Tighten the weak handoffs.' : score >= 55 ? 'Your system is working - but leads can still disappear.' : 'Urgent leaks are costing response time and opportunity.'}</h2><p>You completed {completed} checks. Your conservative estimate shows <b>${revenueLeak.toLocaleString()} in potential monthly repair revenue at risk.</b></p></div>
          </div>
          <div className="result-grid">
            <div className="priority-card"><span>Top priorities</span>{priorities.length ? priorities.map((item, index) => <div className="priority" key={item.title}><i>{index + 1}</i><div><strong>{item.title} · {item.score}%</strong><p>{item.failures} of 5 checks need attention. Start with: {item.actions[0]?.step}</p></div></div>) : <p className="all-clear">No major gaps were identified. Continue testing real calls and verify closed revenue by source.</p>}</div>
            <aside className="cta-card"><span>Want a second set of eyes?</span><h3>Company Lead-System Review</h3><p>We review calls, website, GBP, ads, CRM, calendar and follow-up - then show you what to fix first.</p><div className="price"><strong>$370</strong><s>Standard scope $2,000</s></div><a href="https://omniprocessconsulting.com/" target="_blank" rel="noreferrer">Request your review <span>→</span></a></aside>
          </div>
          <div className="breakdown-card">
            <div className="breakdown-heading"><span>Your complete breakdown</span><h3>What to do next, section by section</h3><p>Work through the lowest scores first. Complete one action, test it in the real world, then move to the next.</p></div>
            <div className="breakdown-list">
              {breakdown.map((item) => <article className="breakdown-section" key={item.title}>
                <div className="breakdown-score"><div><strong>{item.title}</strong><span>{5 - item.failures}/5 checks passed</span></div><b className={item.score >= 80 ? "good" : item.score >= 60 ? "mid" : "low"}>{item.score}%</b></div>
                {item.actions.length ? <ol>{item.actions.map((action) => <li key={action.question}><span>{action.question}</span><p><b>Next step:</b> {action.step}</p></li>)}</ol> : <p className="section-clear">Strong result. Retest this section quarterly and after any process or staffing change.</p>}
              </article>)}
            </div>
          </div>
          <button className="restart" onClick={reset}>Restart assessment</button>
        </section>
      )}

      {!isResults && (
        <div className="navigation">
          <button className="secondary" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>← Back</button>
          <button className="primary" disabled={Boolean(currentSection && !sectionComplete)} onClick={() => setStep((value) => Math.min(sections.length + 1, value + 1))}>{isCalculator ? 'See my results' : 'Continue'} <span>→</span></button>
        </div>
      )}
    </main>
  );
}

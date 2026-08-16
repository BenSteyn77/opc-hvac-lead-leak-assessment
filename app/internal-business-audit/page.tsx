"use client";

import { useEffect, useMemo, useState } from "react";

type Rating = "yes" | "partial" | "no" | "na" | null;
type Answer = { rating: Rating; evidence: string };
type Company = { businessName: string; contactName: string; email: string; phone: string; website: string; industry: string; teamSize: string; locations: string; monthlyLeads: string; monthlyRevenue: string; currentSystems: string; mainConcern: string };

const sections = [
  { title: "Lead capture & call handling", intro: "Test whether every enquiry is captured, owned and moved toward a clear next action.", questions: [
    ["Business calls are answered consistently during published hours.", "Confirm with call logs and at least three test calls."],
    ["After-hours calls receive an immediate, appropriate response.", "Test the full after-hours journey, including escalation."],
    ["Missed calls trigger an acknowledgement or text-back within five minutes.", "Check automation history and sample missed calls."],
    ["Web forms and chat enquiries reach a monitored destination immediately.", "Submit test leads from desktop and mobile."],
    ["Every new enquiry has a named owner and response deadline.", "Review the assignment rules and team expectations."],
    ["Urgent and high-value enquiries are identified and routed differently.", "Check qualification questions and escalation logic."],
    ["The company can report answered, missed, abandoned and recovered calls.", "Review at least 30 days of call reporting."],
    ["Lead-source information survives the handoff into the CRM or booking system.", "Trace sample enquiries from source to final record."],
  ]},
  { title: "Marketing & visibility", intro: "Evaluate whether the company is findable, credible and able to connect marketing activity to real demand.", questions: [
    ["The website clearly states services, service area and primary next action.", "Review the homepage on mobile within a five-second test."],
    ["Key services have dedicated, useful landing pages.", "Check coverage of the company’s most profitable services."],
    ["The Google Business Profile is complete, accurate and actively maintained.", "Review categories, hours, services, images and posts."],
    ["Reviews are requested consistently and answered appropriately.", "Inspect review velocity, recency and response quality."],
    ["Website forms, calls and booked appointments are tracked by source.", "Test analytics, call tracking and CRM attribution."],
    ["Paid campaigns use focused offers, locations and conversion actions.", "Review account structure and landing-page alignment."],
    ["Marketing reporting distinguishes clicks and leads from qualified opportunities.", "Inspect the last three reporting periods."],
    ["The company has a plan for previous visitors and unconverted leads.", "Check retargeting, nurture and reactivation activity."],
  ]},
  { title: "Sales & conversion", intro: "Follow qualified opportunities through booking, estimating, approval and structured follow-up.", questions: [
    ["New enquiries receive a clear confirmation and expectation for the next step.", "Review real customer messages and timing."],
    ["Qualification criteria are documented and used consistently.", "Compare staff handling of three similar enquiries."],
    ["Booking scripts or standards cover urgency, value and customer concerns.", "Review scripts, call recordings or training material."],
    ["Estimates are professional, clear and easy to approve.", "Inspect mobile presentation, options and payment steps."],
    ["Unapproved estimates enter a defined follow-up sequence.", "Review follow-up timing, channels and ownership."],
    ["No-shows, cancellations and stalled opportunities have recovery workflows.", "Check recent examples and system triggers."],
    ["Sales outcomes and loss reasons are recorded consistently.", "Sample closed, lost and undecided records."],
    ["Management can calculate lead-to-booking and booking-to-sale conversion.", "Verify the figures from source records, not estimates."],
  ]},
  { title: "Customer communication", intro: "Assess the communication surrounding the appointment, service experience and long-term relationship.", questions: [
    ["Customers receive appointment confirmations and useful reminders.", "Review timing, channel and message content."],
    ["The company sets clear arrival windows and update expectations.", "Inspect customer-facing templates and real examples."],
    ["Delays or schedule changes trigger proactive communication.", "Test the operational workflow and responsibility."],
    ["Technicians or field teams receive complete customer and job context.", "Review dispatch records and mobile access."],
    ["Completed work triggers a clear summary, invoice and next-step message.", "Inspect recent completed-job communications."],
    ["Review requests are timed appropriately and linked to the correct profile.", "Test the journey on mobile."],
    ["Complaints and negative feedback have an escalation and recovery process.", "Review ownership, response standards and examples."],
    ["Past customers receive relevant maintenance, renewal or reactivation communication.", "Check segmentation and recent campaigns."],
  ]},
  { title: "Operations & handoffs", intro: "Identify unclear ownership, repeated manual work and points where information or accountability disappears.", questions: [
    ["Core workflows are documented sufficiently for another person to follow.", "Review the highest-volume process documentation."],
    ["Each stage from enquiry to completed work has a clear owner.", "Map responsibility and escalation at every handoff."],
    ["Scheduling reflects capacity, geography, urgency and required skills.", "Inspect dispatch rules and recent exceptions."],
    ["Information is entered once and reused across connected systems.", "Look for duplicate typing and conflicting records."],
    ["The team uses standard statuses and definitions consistently.", "Compare records created by different staff members."],
    ["Managers can identify overdue work and stalled handoffs quickly.", "Review dashboards, alerts and daily routines."],
    ["Exceptions have a defined escalation path rather than relying on memory.", "Test common failure scenarios with the team."],
    ["Operational performance is reviewed on a consistent schedule.", "Inspect meeting rhythm, scorecards and assigned actions."],
  ]},
  { title: "Systems, data & reporting", intro: "Determine whether tools create visibility and control—or merely store disconnected information.", questions: [
    ["The company has a clear system of record for customers and opportunities.", "Identify where the authoritative customer record lives."],
    ["Phone, forms, CRM, calendar and field-service tools exchange required data.", "Trace one lead across the complete technology path."],
    ["Access permissions and former-user access are reviewed regularly.", "Inspect user lists, roles and offboarding practice."],
    ["Critical data is backed up or recoverable.", "Confirm vendor retention and export procedures."],
    ["Dashboards show operational outcomes rather than activity alone.", "Look for response, conversion, revenue and backlog measures."],
    ["Reports use consistent definitions and trusted source data.", "Reconcile one reported KPI against raw records."],
    ["Management reviews a small set of KPIs with accountable owners.", "Confirm frequency, owner and resulting decisions."],
    ["The company can connect marketing source to booked and closed revenue.", "Trace a sample of won jobs back to first touch."],
  ]},
  { title: "AI & automation readiness", intro: "Find practical automation opportunities while protecting safety, customer trust and management control.", questions: [
    ["Repetitive, rules-based tasks have been identified and quantified.", "List volume, time consumed and error frequency."],
    ["The company has selected use cases based on business value, not novelty.", "Compare proposed automation to clear operational goals."],
    ["Customer-facing automation has defined handoff and escalation rules.", "Test uncertainty, urgency and angry-customer scenarios."],
    ["AI is prevented from giving unsafe, invasive or unauthorized advice.", "Review guardrails, prompts and escalation boundaries."],
    ["Sensitive customer and business data has an approved handling policy.", "Review what data enters each vendor or model."],
    ["Automated actions are logged and can be reviewed by a person.", "Inspect audit trails and exception reporting."],
    ["A human owner is accountable for every automated workflow.", "Confirm monitoring, maintenance and failure response."],
    ["New automation is piloted, measured and improved before broad rollout.", "Review success metrics and rollback planning."],
  ]},
] as const;

const emptyCompany: Company = { businessName:"", contactName:"", email:"", phone:"", website:"", industry:"", teamSize:"", locations:"", monthlyLeads:"", monthlyRevenue:"", currentSystems:"", mainConcern:"" };
const storageKey = "opc-complete-business-audit-v1";
const answerKey = (s:number,q:number) => `${s}-${q}`;

export default function InternalBusinessAudit() {
  const [company,setCompany] = useState<Company>(emptyCompany);
  const [answers,setAnswers] = useState<Record<string,Answer>>({});
  const [section,setSection] = useState(-1);
  const [executiveSummary,setExecutiveSummary] = useState("");
  const [auditorNotes,setAuditorNotes] = useState("");
  const [status,setStatus] = useState("");
  const [loaded,setLoaded] = useState(false);

  useEffect(()=>{ try { const saved=localStorage.getItem(storageKey); if(saved){const data=JSON.parse(saved);setCompany(data.company||emptyCompany);setAnswers(data.answers||{});setExecutiveSummary(data.executiveSummary||"");setAuditorNotes(data.auditorNotes||"");setSection(data.section??-1);} } finally {setLoaded(true);} },[]);
  useEffect(()=>{ if(loaded) localStorage.setItem(storageKey,JSON.stringify({company,answers,executiveSummary,auditorNotes,section,savedAt:new Date().toISOString()})); },[company,answers,executiveSummary,auditorNotes,section,loaded]);

  const allQuestions=sections.flatMap((s,si)=>s.questions.map((q,qi)=>({section:s.title,sectionIndex:si,question:q[0],test:q[1],key:answerKey(si,qi)})));
  const rated=allQuestions.filter(q=>answers[q.key]?.rating);
  const scoreFor=(si:number)=>{const qs=sections[si].questions.map((_,qi)=>answers[answerKey(si,qi)]).filter(a=>a?.rating&&a.rating!=="na");if(!qs.length)return 0;return Math.round(qs.reduce((sum,a)=>sum+(a.rating==="yes"?2:a.rating==="partial"?1:0),0)/(qs.length*2)*100)};
  const overallScore=useMemo(()=>{const applicable=rated.filter(q=>answers[q.key].rating!=="na");if(!applicable.length)return 0;return Math.round(applicable.reduce((sum,q)=>sum+(answers[q.key].rating==="yes"?2:answers[q.key].rating==="partial"?1:0),0)/(applicable.length*2)*100)},[answers,rated]);
  const findings=allQuestions.filter(q=>answers[q.key]?.rating==="no"||answers[q.key]?.rating==="partial").sort((a,b)=>(answers[a.key].rating==="no"?-1:1)-(answers[b.key].rating==="no"?-1:1));
  const completed=rated.length;
  const total=allQuestions.length;
  const companyReady=Boolean(company.businessName&&company.contactName&&company.email&&company.industry&&company.mainConcern);

  function updateAnswer(key:string,patch:Partial<Answer>){setAnswers(current=>({...current,[key]:{rating:current[key]?.rating||null,evidence:current[key]?.evidence||"",...patch}}));}
  function newAudit(){if(!confirm("Clear this audit and start a new one? The saved progress on this device will be removed."))return;localStorage.removeItem(storageKey);setCompany(emptyCompany);setAnswers({});setExecutiveSummary("");setAuditorNotes("");setSection(-1);setStatus("");}
  function buildReport(){return [
    `COMPLETE BUSINESS ASSESSMENT`, `Business: ${company.businessName}`, `Contact: ${company.contactName} | ${company.email} | ${company.phone}`, `Website: ${company.website||"Not supplied"}`, `Industry: ${company.industry}`, `Team / locations: ${company.teamSize||"Not supplied"} / ${company.locations||"Not supplied"}`, `Lead volume / revenue: ${company.monthlyLeads||"Not supplied"} / ${company.monthlyRevenue||"Not supplied"}`, `Current systems: ${company.currentSystems||"Not supplied"}`, `Primary concern: ${company.mainConcern}`, ``, `OVERALL SCORE: ${overallScore}/100`, ...sections.map((s,i)=>`${s.title}: ${scoreFor(i)}/100`), ``, `EXECUTIVE SUMMARY`, executiveSummary||"Not yet completed", ``, `PRIORITY FINDINGS`, ...(findings.length?findings.map((f,i)=>`${i+1}. [${answers[f.key].rating?.toUpperCase()}] ${f.section}: ${f.question}\nEvidence: ${answers[f.key].evidence||"No note recorded"}\nRecommended validation/action: ${f.test}`):["No partial or failed controls recorded."]), ``, `AUDITOR NOTES`, auditorNotes||"None", ``, `FULL AUDIT RECORD`, ...allQuestions.map(q=>`[${(answers[q.key]?.rating||"unanswered").toUpperCase()}] ${q.section} — ${q.question}\nEvidence: ${answers[q.key]?.evidence||"None"}`)
  ].join("\n")}
  async function emailReport(){if(!companyReady){setStatus("Complete the required company information first.");setSection(-1);return;}if(completed<total){setStatus(`Complete all ${total} audit checks before sending. ${total-completed} remain.`);return;}setStatus("Sending report…");try{const response=await fetch("https://formspree.io/f/xvznzweb",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:`Completed $370 Business Audit — ${company.businessName}`,business_name:company.businessName,client_contact:company.contactName,client_email:company.email,overall_score:`${overallScore}/100`,executive_summary:executiveSummary||"Not completed",priority_findings:findings.slice(0,12).map(f=>`${f.section}: ${f.question}`).join(" | "),complete_audit_report:buildReport()})});if(!response.ok)throw new Error("Report service rejected the submission.");setStatus("Report emailed successfully to the OPC Formspree recipient.");}catch(error){setStatus(`Could not send the report. ${error instanceof Error?error.message:"Please try again."}`)}}

  return <main className="iba-page">
    <header className="iba-header"><div><img src="/opc-logo.png" alt="Omni Process Consulting"/><span>Internal audit workspace</span></div><button onClick={newAudit}>New audit</button></header>
    <div className="iba-shell">
      <aside className="iba-sidebar"><div className="iba-progress"><span>Audit completion</span><strong>{completed}/{total}</strong><i><b style={{width:`${completed/total*100}%`}}/></i></div><button className={section===-1?"active":""} onClick={()=>setSection(-1)}>Company profile</button>{sections.map((s,i)=><button className={section===i?"active":""} onClick={()=>setSection(i)} key={s.title}><span>{String(i+1).padStart(2,"0")}</span><div>{s.title}<small>{scoreFor(i)}% · {s.questions.filter((_,q)=>answers[answerKey(i,q)]?.rating).length}/8</small></div></button>)}<button className={section===sections.length?"active":""} onClick={()=>setSection(sections.length)}>Report &amp; send</button></aside>
      <section className="iba-content">
        {section===-1&&<div><div className="iba-title"><span>Step 01</span><h1>Company profile and audit context</h1><p>Capture the facts needed to interpret the findings and produce a useful final report.</p></div><div className="iba-form-grid">{[
          ["Business name *","businessName"],["Primary contact *","contactName"],["Client email *","email"],["Telephone","phone"],["Website","website"],["Industry *","industry"],["Team size","teamSize"],["Locations / service areas","locations"],["Approx. monthly leads","monthlyLeads"],["Approx. monthly revenue","monthlyRevenue"]
        ].map(([label,key])=><label key={key}>{label}<input value={company[key as keyof Company]} onChange={e=>setCompany({...company,[key]:e.target.value})}/></label>)}<label className="wide">Current platforms and systems<textarea value={company.currentSystems} onChange={e=>setCompany({...company,currentSystems:e.target.value})} placeholder="Phone, CRM, website, calendar, field-service platform, ad platforms, reporting…"/></label><label className="wide">Primary concern or desired outcome *<textarea value={company.mainConcern} onChange={e=>setCompany({...company,mainConcern:e.target.value})}/></label></div><div className="iba-next"><span>{companyReady?"Required profile information complete.":"Complete all required fields before sending the report."}</span><button onClick={()=>setSection(0)}>Begin audit →</button></div></div>}
        {section>=0&&section<sections.length&&<div><div className="iba-title"><span>Section {section+1} of {sections.length}</span><h1>{sections[section].title}</h1><p>{sections[section].intro}</p></div><div className="iba-question-list">{sections[section].questions.map((q,qi)=>{const key=answerKey(section,qi),answer=answers[key]||{rating:null,evidence:""};return <article className="iba-question" key={q[0]}><div className="iba-q-head"><b>{String(qi+1).padStart(2,"0")}</b><div><h2>{q[0]}</h2><p><strong>Verify:</strong> {q[1]}</p></div></div><div className="iba-ratings">{([['yes','In place'],['partial','Partial'],['no','Not in place'],['na','N/A']] as const).map(([value,label])=><button className={answer.rating===value?`selected ${value}`:""} onClick={()=>updateAnswer(key,{rating:value})} key={value}>{label}</button>)}</div><label>Evidence, observation or context<textarea value={answer.evidence} onChange={e=>updateAnswer(key,{evidence:e.target.value})} placeholder="Record what you checked, what you found, and any important exception…"/></label></article>})}</div><div className="iba-next"><button className="secondary" onClick={()=>setSection(section-1)}>← Previous</button><span>{sections[section].questions.filter((_,q)=>answers[answerKey(section,q)]?.rating).length}/8 completed · Section score {scoreFor(section)}%</span><button onClick={()=>setSection(section===sections.length-1?sections.length:section+1)}>{section===sections.length-1?"Build report":"Next section"} →</button></div></div>}
        {section===sections.length&&<div><div className="iba-title"><span>Final review</span><h1>Complete, review and email the audit</h1><p>The report includes the company context, all scores, every response, evidence notes and recommended validation steps.</p></div><div className="iba-scoreboard"><div><span>Overall score</span><strong>{overallScore}</strong><small>/100</small></div><div>{sections.map((s,i)=><p key={s.title}><span>{s.title}</span><b>{scoreFor(i)}%</b></p>)}</div></div><label className="iba-report-field">Executive summary<textarea value={executiveSummary} onChange={e=>setExecutiveSummary(e.target.value)} placeholder="Summarize the business condition, the most important connected problems and the recommended order of action…"/></label><label className="iba-report-field">Confidential auditor notes<textarea value={auditorNotes} onChange={e=>setAuditorNotes(e.target.value)} placeholder="Internal context, commercial opportunities, follow-up questions or implementation considerations…"/></label><div className="iba-findings"><h2>Priority findings <span>{findings.length}</span></h2>{findings.slice(0,12).map((f,i)=><article key={f.key}><b>{i+1}</b><div><span>{f.section} · {answers[f.key].rating}</span><h3>{f.question}</h3><p>{answers[f.key].evidence||"No evidence note recorded."}</p><small>Suggested validation/action: {f.test}</small></div></article>)}</div><div className="iba-send"><div><strong>Send the complete report to OPC</strong><p>This emails the audit to the recipient configured in your existing Formspree account. It does not email the client.</p></div><button onClick={emailReport}>Email report to myself</button></div>{status&&<p className="iba-status" role="status">{status}</p>}<details className="iba-raw"><summary>Preview complete email report</summary><pre>{buildReport()}</pre></details></div>}
      </section>
    </div>
  </main>
}

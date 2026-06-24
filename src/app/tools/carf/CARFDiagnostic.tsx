"use client"

import { useState, useEffect } from "react"
import { Turnstile } from "@marsidev/react-turnstile"

const ZONES = [
  { id: 1, name: "Self-Certification & Due Diligence", color: "#A32D2D", bg: "#FCEBEB", dot: "#A32D2D" },
  { id: 2, name: "Transaction Data & FMV Accuracy", color: "#BA7517", bg: "#FFF2CC", dot: "#BA7517" },
  { id: 3, name: "Governance & Framework Overlap", color: "#534AB7", bg: "#EEEDFE", dot: "#534AB7" },
  { id: 4, name: "Timeline & Scalability", color: "#185FA5", bg: "#E6F1FB", dot: "#185FA5" },
  { id: 5, name: "Penalty & Enforcement Exposure", color: "#993556", bg: "#FBEAF0", dot: "#993556" },
  { id: 6, name: "Change of Circumstances", color: "#1D9E75", bg: "#E2EFDA", dot: "#1D9E75" },
]

const QUESTIONS = [
  // Zone 1
  {
    zone: 1,
    q: "Are self-certification forms currently collected from all new users at onboarding?",
    context: "CARF requires valid self-certifications,including TIN and tax residency,from every new user from January 2026.",
    opts: [
      "Yes,automated and mandatory before account creation",
      "Partially,collected for some users or some jurisdictions only",
      "No,we are still building this into our onboarding flow",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 1,
    q: "Have you launched a remediation campaign for pre-existing users who never provided self-certifications?",
    context: "Pre-existing accounts must be remediated before the May 2027 reporting deadline.",
    opts: [
      "Yes,campaign is live and tracking completion rates",
      "Planned but not yet launched",
      "Not yet,this is on our backlog",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 1,
    q: "Does your platform perform reasonableness checks,cross-referencing self-certifications against AML/KYC data for conflicting indicia?",
    context: "Simple acceptance of self-certifications without cross-referencing is not sufficient under CARF. Conflicting indicia must be investigated.",
    opts: [
      "Yes,automated cross-check in place with documented process",
      "Manual review only,no systematic cross-referencing",
      "No,we accept self-certifications at face value",
    ],
    scores: [0, 1, 2],
  },
  // Zone 2
  {
    zone: 2,
    q: "Does your platform have a documented, consistently applied FMV methodology for crypto-to-crypto swaps?",
    context: "CARF requires fiat-equivalent fair market value at transaction time for every exchange, including crypto-to-crypto. The methodology must be documented and consistently applied.",
    opts: [
      "Yes,documented, locked, and applied consistently across all transactions",
      "Partially documented but not consistently applied",
      "No,we rely on ad hoc calculations or have not addressed this yet",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 2,
    q: "Can your systems produce transaction-level reporting,covering every individual trade, swap, and transfer,rather than year-end account balances?",
    context: "CARF is fundamentally different from CRS: it requires transaction-level data, not aggregate year-end figures.",
    opts: [
      "Yes,full transaction-level pipeline is operational",
      "Partially,we can produce some but not all transaction types",
      "No,our systems currently only produce account-level or aggregate data",
    ],
    scores: [0, 1, 2],
  },
  // Zone 3
  {
    zone: 3,
    q: "Has your institution assigned a single named owner responsible for CARF compliance,with accountability across tax, compliance, ops, and IT?",
    context: "CARF cuts across multiple functions. Without unified ownership, inconsistencies and late discoveries are near-certain.",
    opts: [
      "Yes,single named owner with cross-functional authority",
      "Shared responsibility across teams,no single owner",
      "No dedicated CARF owner has been assigned",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 3,
    q: "If your institution is both a CRS Reporting Financial Institution and an RCASP under CARF, have you applied the OECD's overlap mitigation rules to prevent double reporting?",
    context: "Entities with dual FI/RCASP status risk reporting the same client under both frameworks,creating contradictory filings.",
    opts: [
      "Yes,overlap mitigation rules applied and tested",
      "We are aware of the issue but have not yet resolved it",
      "We are unsure if we have dual status or how the overlap rules apply",
    ],
    scores: [0, 1, 2],
  },
  // Zone 4
  {
    zone: 4,
    q: "Have your AML/KYC systems been integrated with your CARF reporting pipeline so that data flows without manual intervention?",
    context: "Existing AML/KYC infrastructure was built for financial crime prevention, not tax transparency. CARF requires tight integration between the two.",
    opts: [
      "Yes,integrated and operational",
      "Partial integration,some manual steps remain",
      "No,the two systems are separate and not integrated",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 4,
    q: "Has your legal team reviewed and resolved the GDPR vs. CARF data collection conflict,including customer notification obligations under DAC8?",
    context: "DAC8 requires explicit customer notification that data will be reported to tax authorities,but this must not imply the customer has a choice, since reporting is legally mandated.",
    opts: [
      "Yes,legal basis documented, notifications updated, conflict resolved",
      "Under review,legal team engaged but no formal resolution yet",
      "Not yet reviewed,GDPR/CARF conflict has not been addressed",
    ],
    scores: [0, 1, 2],
  },
  // Zone 5
  {
    zone: 5,
    q: "Are you registered with HMRC as a Reporting Crypto-Asset Service Provider (if you have UK nexus)?",
    context: "UK RCASPs must register with HMRC. The registration deadline is January 2027. Non-registration triggers £1,000 + £300/day penalty.",
    opts: [
      "Yes,registered and confirmed",
      "Application in progress or planned",
      "Not yet,or we are unsure if we have UK nexus",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 5,
    q: "Have your senior leadership and board been briefed on CARF director liability exposure?",
    context: "Under DAC8 and several other jurisdictions' CARF implementations, personal criminal liability for directors is an explicit enforcement mechanism for severe non-compliance.",
    opts: [
      "Yes,formal briefing completed and documented",
      "Informally aware but no formal briefing",
      "No,this has not been discussed at board or senior leadership level",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 5,
    q: "Has your institution mapped its jurisdiction-specific penalty exposure across the EU (DAC8), UK (HMRC), and UAE?",
    context: "Penalties vary significantly by jurisdiction,from €500K per violation under DAC8 to £300 per customer under UK CARF. Without a penalty map, teams cannot prioritise correctly.",
    opts: [
      "Yes,full jurisdiction penalty map documented",
      "Partially mapped for some jurisdictions",
      "No,penalty exposure has not been formally mapped",
    ],
    scores: [0, 1, 2],
  },
  // Zone 6
  {
    zone: 6,
    q: "Has your annual end-of-year clean-up process been replaced with continuous, event-driven monitoring for changes in user tax residency, nationality, or account classification?",
    context: "CARF does not permit annual-cycle compliance. Changes must be detected and acted on when they occur,not at year-end.",
    opts: [
      "Yes,continuous monitoring system fully operational",
      "Partial monitoring,some events trigger review, others are caught at year-end",
      "No,we still operate on an annual review cycle",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 6,
    q: "Does every change-in-circumstance event generate an auditable record showing what changed, when it was detected, and what action was taken?",
    context: "Regulators require evidence not just that the right action was taken, but that it was taken at the right time. An audit trail for each event is essential.",
    opts: [
      "Yes,full audit trail for every change event, in a structured system",
      "Partial records exist but are not systematic or searchable",
      "No,changes are noted informally without structured documentation",
    ],
    scores: [0, 1, 2],
  },
  {
    zone: 6,
    q: "Can your platform split a user's CARF report across two jurisdictions within a single tax year,for example, if they change tax residency in June?",
    context: "Mid-year residency changes require split-period reporting. Platforms that can only report one jurisdiction per user per year will produce incorrect filings.",
    opts: [
      "Yes,split-period reporting is supported and tested",
      "Partially,workarounds exist but no clean automated solution",
      "No,our reporting system assigns one jurisdiction per user per year",
    ],
    scores: [0, 1, 2],
  },
]

interface Answer { zone: number; score: number }
type Screen = "intro" | "lead" | "quiz" | "results"
type LeadData = { name: string; email: string; company: string }

function getZoneStatus(avg: number) {
  if (avg <= 0.5) return { label: "READY", cls: "ct-status-good", bar: "#1D9E75", pct: 90 }
  if (avg <= 1.2) return { label: "REVIEW", cls: "ct-status-review", bar: "#BA7517", pct: 50 }
  return { label: "CRITICAL GAP", cls: "ct-status-critical", bar: "#A32D2D", pct: 20 }
}

function computeResults(answers: Answer[]) {
  const zoneScores: Record<number, number[]> = {}
  ZONES.forEach(z => (zoneScores[z.id] = []))
  answers.forEach(a => zoneScores[a.zone].push(a.score))

  const zoneAvg: Record<number, number> = {}
  ZONES.forEach(z => {
    const s = zoneScores[z.id]
    zoneAvg[z.id] = s.length === 0 ? 1 : s.reduce((a, b) => a + b, 0) / s.length
  })

  const totalScore = Math.round(
    (1 - Object.values(zoneAvg).reduce((a, b) => a + b, 0) / (ZONES.length * 2)) * 100
  )

  let riskLevel: string, riskColor: string, riskBg: string, gaugeColor: string
  if (totalScore >= 75) {
    riskLevel = "WELL PREPARED"; riskColor = "#0F6E56"; riskBg = "#E2EFDA"; gaugeColor = "#1D9E75"
  } else if (totalScore >= 50) {
    riskLevel = "PARTIAL READINESS"; riskColor = "#7A4E08"; riskBg = "#FFF2CC"; gaugeColor = "#BA7517"
  } else {
    riskLevel = "ACTION REQUIRED"; riskColor = "#791F1F"; riskBg = "#FCEBEB"; gaugeColor = "#A32D2D"
  }

  const criticalZones = ZONES.filter(z => zoneAvg[z.id] > 1.2).map(z => z.name)
  const reviewZones = ZONES.filter(z => zoneAvg[z.id] > 0.5 && zoneAvg[z.id] <= 1.2).map(z => z.name)
  let priorityText: string
  if (criticalZones.length > 0) {
    priorityText = `Your most critical gaps are in: ${criticalZones.join(" and ")}. These require immediate attention before your 2026 data collection is complete.`
  } else if (reviewZones.length > 0) {
    priorityText = `Your programme is partially built. Focus on strengthening: ${reviewZones.join(" and ")}. These areas need documented processes before May 2027.`
  } else {
    priorityText = "Your CARF readiness is strong. Ensure your audit trail is complete and your continuous monitoring is tested with real change-in-circumstance scenarios."
  }

  return { zoneAvg, totalScore, riskLevel, riskColor, riskBg, gaugeColor, priorityText }
}

const CSS = `
.carf-tool {
  --navy: #1e3a5f;
  --navy-mid: #2d4f7c;
  --gold: #d4af37;
  --gold-lt: #faf3d1;
  --teal: #1D9E75;
  --teal-lt: #E2EFDA;
  --red: #A32D2D;
  --red-lt: #FCEBEB;
  --amber: #BA7517;
  --amber-lt: #FFF2CC;
  --ice: #B5D4F4;
  --bg: #F0F4FA;
  --card: #FFFFFF;
  --text: #0F172A;
  --muted: #64748B;
  --border: #E2E8F0;
  --radius: 12px;
  font-family: var(--font-inter), system-ui, sans-serif;
  color: var(--text);
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
  padding-top: 80px;
}
.ct-header {
  background: var(--navy);
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.ct-header-brand {
  display: flex; align-items: center; gap: 0;
  border-left: 3px solid var(--gold); padding-left: 14px;
}
.ct-header-title { font-size: 15px; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
.ct-header-sub { font-size: 11px; color: var(--ice); margin-top: 2px; }
.ct-header-badge {
  background: rgba(212,175,55,0.2); color: var(--gold);
  font-size: 11px; font-weight: 600; padding: 4px 10px;
  border-radius: 20px; border: 1px solid rgba(212,175,55,0.4);
  white-space: nowrap;
}
.ct-progress-wrap { background: var(--navy-mid); padding: 12px 24px; position: sticky; top: 80px; z-index: 10; }
.ct-progress-meta {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 7px;
}
.ct-progress-label { font-size: 12px; color: #fff; font-weight: 600; }
.ct-progress-count { font-size: 12px; color: #fff; font-weight: 700; }
.ct-progress-bar {
  height: 8px; background: rgba(255,255,255,0.2);
  border-radius: 99px; overflow: hidden;
}
.ct-progress-fill {
  height: 100%; background: var(--gold);
  border-radius: 99px;
  transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
}
.ct-main {
  flex: 1;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
  padding: 28px 16px 40px;
}
.ct-intro-card {
  background: var(--card); border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(4,44,83,0.08);
  overflow: hidden;
}
.ct-intro-hero {
  background: var(--navy);
  padding: 32px 32px 28px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.ct-intro-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}
.ct-intro-hero h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(22px, 4vw, 32px);
  color: #fff; line-height: 1.25; margin-bottom: 12px;
  position: relative; z-index: 1;
}
.ct-intro-hero p, .ct-intro-meta { position: relative; z-index: 1; }
.ct-intro-hero p { font-size: 15px; color: var(--ice); line-height: 1.6; max-width: 520px; margin: 0 auto 20px; }
.ct-intro-meta { display: flex; justify-content: center; flex-wrap: wrap; gap: 16px; }
.ct-intro-meta-item { display: flex; align-items: center; gap: 6px; }
.ct-intro-meta-item span { font-size: 12px; color: #85B7EB; }
.ct-intro-body { padding: 28px 32px; }
.ct-intro-body h2 { font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 14px; }
.ct-zone-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
.ct-zone-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 12px; border-radius: 8px;
  font-size: 12.5px; font-weight: 500;
}
.ct-zone-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.ct-start-btn {
  display: block; width: 100%;
  background: var(--gold); color: var(--navy);
  font-size: 15px; font-weight: 800;
  padding: 15px 24px; border-radius: 10px; border: none;
  cursor: pointer; letter-spacing: 0.01em;
  transition: background 0.2s, transform 0.1s;
  font-family: inherit;
}
.ct-start-btn:hover { background: #e5c158; transform: translateY(-1px); }
.ct-lead-card {
  background: var(--card); border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(30,58,95,0.08);
  border-top: 4px solid var(--gold);
  max-width: 480px; margin: 40px auto; padding: 36px 32px;
}
.ct-lead-card h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 22px; color: var(--navy); margin-bottom: 6px;
}
.ct-lead-card p { font-size: 13px; color: var(--muted); margin-bottom: 24px; }
.ct-field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 16px; }
.ct-field label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--muted); }
.ct-field input {
  height: 42px; border: 1.5px solid var(--border); border-radius: 8px;
  padding: 0 12px; font-size: 14px; font-family: inherit; color: var(--text);
  outline: none; transition: border-color 0.18s;
}
.ct-field input:focus { border-color: var(--navy); }
.ct-field input.error { border-color: #e53e3e; }
.ct-field-error { font-size: 11px; color: #e53e3e; font-weight: 600; }
.ct-lead-submit {
  display: block; width: 100%; margin-top: 8px;
  background: var(--navy); color: #fff;
  font-size: 15px; font-weight: 700; padding: 14px 24px;
  border-radius: 10px; border: 1.5px solid transparent;
  cursor: pointer; font-family: inherit;
  transition: background 0.2s, border-color 0.2s;
}
.ct-lead-submit:hover:not(:disabled) { background: var(--navy-mid); border-color: var(--gold); }
.ct-lead-submit:disabled { opacity: 0.45; cursor: not-allowed; }
.ct-lead-note { font-size: 11px; color: var(--muted); text-align: center; margin-top: 12px; }
.ct-question-card {
  background: var(--card); border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(30,58,95,0.08);
  padding: 28px 28px 24px;
  border-top: 4px solid var(--gold);
  animation: ctFadeUp 0.3s ease;
}
@keyframes ctFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.ct-q-zone {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border-radius: 20px;
  font-size: 11px; font-weight: 600;
  margin-bottom: 16px;
}
.ct-q-num { font-size: 11px; font-weight: 600; color: var(--muted); margin-bottom: 6px; letter-spacing: 0.06em; }
.ct-q-text { font-size: 17px; font-weight: 700; color: var(--navy); line-height: 1.4; margin-bottom: 8px; }
.ct-q-context {
  font-size: 13px; color: var(--muted); line-height: 1.55;
  margin-bottom: 22px; padding: 10px 12px;
  background: var(--bg); border-radius: 8px;
  border-left: 3px solid var(--border);
}
.ct-options { display: flex; flex-direction: column; gap: 10px; }
.ct-option-btn {
  display: flex; align-items: flex-start; gap: 12px;
  background: var(--bg); border: 1.5px solid var(--border);
  border-radius: 10px; padding: 14px 16px;
  cursor: pointer; text-align: left;
  transition: all 0.18s;
  font-family: inherit; width: 100%;
}
.ct-option-btn:hover { border-color: var(--navy-mid); background: #EEF4FB; }
.ct-option-btn.selected { border-color: var(--gold); background: #fdf8e8; }
.ct-option-letter {
  min-width: 28px; height: 28px; border-radius: 50%;
  background: var(--border); color: var(--muted);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
  transition: all 0.18s;
}
.ct-option-btn.selected .ct-option-letter { background: var(--gold); color: var(--navy); }
.ct-option-text { font-size: 14px; color: var(--text); line-height: 1.5; }
.ct-q-footer {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 24px; padding-top: 18px;
  border-top: 1px solid var(--border);
}
.ct-skip-btn {
  font-size: 13px; color: var(--muted);
  background: none; border: none; cursor: pointer;
  padding: 8px 0; text-decoration: underline;
  font-family: inherit;
}
.ct-next-btn {
  background: var(--navy); color: #fff;
  font-size: 14px; font-weight: 700;
  padding: 11px 24px; border-radius: 8px; border: 1.5px solid transparent;
  cursor: pointer; font-family: inherit;
  transition: background 0.2s, border-color 0.2s;
  display: flex; align-items: center; gap: 6px;
}
.ct-next-btn:hover { background: var(--navy-mid); border: 1.5px solid var(--gold); }
.ct-next-btn:disabled { opacity: 0.4; cursor: not-allowed; border: none; }
.ct-results-card {
  background: var(--card); border-radius: var(--radius);
  box-shadow: 0 4px 24px rgba(4,44,83,0.08);
  overflow: hidden;
  animation: ctFadeUp 0.4s ease;
}
.ct-results-hero { background: var(--navy); padding: 32px; text-align: center; }
.ct-results-hero h2 { font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: #fff; margin-bottom: 6px; }
.ct-results-hero p { font-size: 14px; color: var(--ice); }
.ct-gauge-wrap { position: relative; width: 220px; height: 120px; margin: 24px auto 8px; }
.ct-gauge-svg { width: 220px; height: 120px; }
.ct-risk-badge {
  display: inline-block;
  padding: 6px 18px; border-radius: 20px;
  font-size: 13px; font-weight: 700;
  margin: 8px auto 0; letter-spacing: 0.04em;
}
.ct-results-body { padding: 28px; }
.ct-results-section-title {
  font-size: 12px; font-weight: 700; color: var(--muted);
  letter-spacing: 0.08em; text-transform: uppercase;
  margin-bottom: 14px;
}
.ct-zone-results { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.ct-zone-result-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px; border-radius: 8px;
  background: var(--bg);
}
.ct-zrr-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.ct-zrr-info { flex: 1; }
.ct-zrr-name { font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
.ct-zrr-bar-wrap { height: 5px; background: var(--border); border-radius: 99px; overflow: hidden; }
.ct-zrr-bar { height: 100%; border-radius: 99px; transition: width 1s ease 0.3s; }
.ct-zrr-status { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; white-space: nowrap; }
.ct-status-critical { background: #FCEBEB; color: #A32D2D; }
.ct-status-review { background: #FFF2CC; color: #BA7517; }
.ct-status-good { background: #E2EFDA; color: #0F6E56; }
.ct-actions-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
.ct-action-card { border-radius: 10px; padding: 16px; border: 1.5px solid var(--border); }
.ct-action-card h4 { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 5px; }
.ct-action-card p { font-size: 12px; color: var(--muted); line-height: 1.5; }
.ct-action-icon { font-size: 20px; margin-bottom: 8px; }
.ct-cta-block { background: var(--navy); border-radius: 12px; padding: 24px; text-align: center; }
.ct-cta-block h3 { font-family: Georgia, 'Times New Roman', serif; font-size: 20px; color: #fff; margin-bottom: 8px; }
.ct-cta-block p { font-size: 13px; color: var(--ice); margin-bottom: 20px; line-height: 1.6; }
.ct-cta-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.ct-cta-primary {
  background: var(--gold); color: var(--navy);
  font-size: 14px; font-weight: 800;
  padding: 12px 22px; border-radius: 8px; border: none;
  cursor: pointer; font-family: inherit; transition: background 0.2s;
}
.ct-cta-primary:hover { background: #e5c158; }
.ct-cta-secondary {
  background: transparent; color: var(--ice);
  font-size: 14px; font-weight: 600;
  padding: 12px 22px; border-radius: 8px;
  border: 1.5px solid rgba(255,255,255,0.25);
  cursor: pointer; font-family: inherit; transition: border-color 0.2s;
}
.ct-cta-secondary:hover { border-color: rgba(255,255,255,0.5); }
.ct-restart-btn {
  display: block; margin: 20px auto 0;
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: var(--muted);
  text-decoration: underline; font-family: inherit;
}
.ct-priority-text {
  font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 24px;
  padding: 14px; background: #F0F4FA; border-radius: 8px;
}
.ct-footer { background: var(--navy); padding: 14px 24px; text-align: center; margin-top: auto; }
.ct-footer p { font-size: 11px; color: #85B7EB; }
@media (max-width: 520px) {
  .ct-header { padding: 10px 16px; }
  .ct-header-title { font-size: 13px; }
  .ct-header-sub { font-size: 10px; }
  .ct-header-badge { display: none; }
  .ct-progress-wrap { padding: 10px 16px; }
  .ct-progress-label { font-size: 11px; }
  .ct-zone-grid { grid-template-columns: 1fr; }
  .ct-intro-body { padding: 20px 16px; }
  .ct-intro-hero { padding: 24px 16px 20px; }
  .ct-intro-hero h1 { font-size: 22px; }
  .ct-lead-card { margin: 20px 16px; padding: 24px 18px; }
  .ct-lead-card h2 { font-size: 18px; }
  .ct-question-card { padding: 20px 16px; }
  .ct-q-text { font-size: 16px; }
  .ct-option-btn { padding: 12px 14px; font-size: 13px; }
  .ct-results-hero { padding: 24px 16px; }
  .ct-gauge-wrap { width: 180px; height: 100px; }
  .ct-gauge-svg { width: 180px; height: 100px; }
  .ct-results-body { padding: 20px 16px; }
  .ct-actions-grid { grid-template-columns: 1fr; }
  .ct-cta-block { padding: 20px 16px; }
  .ct-cta-buttons { flex-direction: column; }
  .ct-cta-primary, .ct-cta-secondary { width: 100%; text-align: center; }
}
`

export function CARFDiagnostic() {
  const [screen, setScreen] = useState<Screen>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null)
  const [gaugeNum, setGaugeNum] = useState(0)
  const [barsVisible, setBarsVisible] = useState(false)
  const [results, setResults] = useState<ReturnType<typeof computeResults> | null>(null)
  const [leadData, setLeadData] = useState<LeadData | null>(null)
  const [leadForm, setLeadForm] = useState({ name: "", email: "", company: "" })
  const [leadErrors, setLeadErrors] = useState({ name: "", email: "", company: "" })
  const [leadLoading, setLeadLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState("")

  const q = QUESTIONS[current]
  const zone = q ? ZONES.find(z => z.id === q.zone)! : null
  const pct = Math.round((current / QUESTIONS.length) * 100)

  function handleStart() {
    setScreen("lead")
  }

  function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = { name: "", email: "", company: "" }
    let valid = true
    const nameTrim = leadForm.name.trim()
    const nameParts = nameTrim.split(/\s+/).filter(Boolean)
    if (nameTrim.length < 4 || nameParts.length < 2 || /\d/.test(nameTrim) || nameParts.some(p => p.length < 2)) {
      errs.name = "Enter your first and last name (no numbers)"; valid = false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) { errs.email = "Enter a valid email"; valid = false }
    const companyTrim = leadForm.company.trim()
    if (companyTrim.length < 3 || /^\d+$/.test(companyTrim) || !/[aeiouAEIOU]/.test(companyTrim)) {
      errs.company = "Enter a valid company name"; valid = false
    }
    setLeadErrors(errs)
    if (!valid || !turnstileToken) return
    setLeadData({ name: leadForm.name.trim(), email: leadForm.email.trim(), company: leadForm.company.trim() })
    setCurrent(0)
    setAnswers([])
    setSelectedOpt(null)
    setScreen("quiz")
  }

  function handleNext(opt: number | null) {
    const score = opt !== null ? q.scores[opt] : 1
    const newAnswers = [...answers, { zone: q.zone, score }]
    setAnswers(newAnswers)
    if (current + 1 < QUESTIONS.length) {
      setCurrent(c => c + 1)
      setSelectedOpt(null)
    } else {
      const r = computeResults(newAnswers)
      setResults(r)
      setGaugeNum(0)
      setBarsVisible(false)
      setScreen("results")
      if (leadData) {
        fetch("/api/tools/carf-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadData.name,
            email: leadData.email,
            company: leadData.company,
            score: r.totalScore,
            riskLevel: r.riskLevel,
            turnstileToken,
          }),
        }).catch(err => console.error("[CARF] Sync failed:", err))
      }
    }
  }

  function handleRestart() {
    setScreen("intro")
    setAnswers([])
    setResults(null)
    setLeadData(null)
    setLeadForm({ name: "", email: "", company: "" })
    setLeadErrors({ name: "", email: "", company: "" })
  }

  useEffect(() => {
    if (screen !== "results" || !results) return
    let n = 0
    const target = results.totalScore
    const step = () => {
      n = Math.min(n + 2, target)
      setGaugeNum(n)
      if (n < target) requestAnimationFrame(step)
    }
    const t1 = setTimeout(() => requestAnimationFrame(step), 100)
    const t2 = setTimeout(() => setBarsVisible(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [screen, results])

  const gaugeOffset = results ? 251.2 - (gaugeNum / 100) * 251.2 : 251.2

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="carf-tool">

        {/* Header */}
        <header className="ct-header">
          <div className="ct-header-brand">
            <div>
              <div className="ct-header-title">CARF 2026 Compliance Diagnostic</div>
              <div className="ct-header-sub">EduDubai · Global Education and Training Specialist</div>
            </div>
          </div>
          <div className="ct-header-badge">Free Assessment</div>
        </header>

        {/* Progress */}
        {screen === "quiz" && zone && (
          <div className="ct-progress-wrap">
            <div className="ct-progress-meta">
              <span className="ct-progress-label">Risk Zone {q.zone} of 6: {zone.name}</span>
              <span className="ct-progress-count">Q{current + 1} of {QUESTIONS.length}</span>
            </div>
            <div className="ct-progress-bar">
              <div className="ct-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        <main className="ct-main">

          {/* INTRO */}
          {screen === "intro" && (
            <div className="ct-intro-card">
              <div className="ct-intro-hero">
                <h1>Is Your Institution<br />CARF-Ready for 2027?</h1>
                <p>As of January 2026, CARF due diligence is live. First reporting exchanges begin May 2027. This 5-minute diagnostic assesses your readiness across all six operational risk zones,and tells you exactly where to act first.</p>
                <div className="ct-intro-meta">
                  <div className="ct-intro-meta-item"><span>⏱</span><span>5 minutes · 15 questions</span></div>
                  <div className="ct-intro-meta-item"><span>🔒</span><span>Private &amp; confidential</span></div>
                  <div className="ct-intro-meta-item"><span>📋</span><span>Instant personalised results</span></div>
                </div>
              </div>
              <div className="ct-intro-body">
                <h2>Six risk zones assessed:</h2>
                <div className="ct-zone-grid">
                  {ZONES.map(z => (
                    <div key={z.id} className="ct-zone-chip" style={{ background: z.bg }}>
                      <div className="ct-zone-dot" style={{ background: z.dot }} />
                      {z.name}
                    </div>
                  ))}
                </div>
                <button className="ct-start-btn" onClick={handleStart}>
                  Start Free Diagnostic →
                </button>
              </div>
            </div>
          )}

          {/* LEAD FORM */}
          {screen === "lead" && (
            <div className="ct-lead-card">
              <h2>Before you start</h2>
              <p>Enter your details to receive your personalised CARF readiness report.</p>
              <form onSubmit={handleLeadSubmit} noValidate>
                <div className="ct-field">
                  <label htmlFor="carf-name">Full Name*</label>
                  <input
                    id="carf-name"
                    type="text"
                    placeholder="Jane Smith"
                    value={leadForm.name}
                    className={leadErrors.name ? "error" : ""}
                    onChange={e => { setLeadForm(f => ({ ...f, name: e.target.value })); setLeadErrors(er => ({ ...er, name: "" })) }}
                  />
                  {leadErrors.name && <span className="ct-field-error">{leadErrors.name}</span>}
                </div>
                <div className="ct-field">
                  <label htmlFor="carf-email">Work Email*</label>
                  <input
                    id="carf-email"
                    type="email"
                    placeholder="jane@company.com"
                    value={leadForm.email}
                    className={leadErrors.email ? "error" : ""}
                    onChange={e => { setLeadForm(f => ({ ...f, email: e.target.value })); setLeadErrors(er => ({ ...er, email: "" })) }}
                  />
                  {leadErrors.email && <span className="ct-field-error">{leadErrors.email}</span>}
                </div>
                <div className="ct-field">
                  <label htmlFor="carf-company">Company Name*</label>
                  <input
                    id="carf-company"
                    type="text"
                    placeholder="Acme Financial Ltd"
                    value={leadForm.company}
                    className={leadErrors.company ? "error" : ""}
                    onChange={e => { setLeadForm(f => ({ ...f, company: e.target.value })); setLeadErrors(er => ({ ...er, company: "" })) }}
                  />
                  {leadErrors.company && <span className="ct-field-error">{leadErrors.company}</span>}
                </div>
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                  options={{ theme: "light" }}
                />
                <button type="submit" className="ct-lead-submit" disabled={!turnstileToken}>
                  Start Diagnostic →
                </button>
                <p className="ct-lead-note">Your data is kept private and never shared with third parties.</p>
              </form>
            </div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && zone && (
            <div className="ct-question-card" key={current}>
              <div className="ct-q-zone" style={{ background: zone.bg, color: zone.color }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: zone.dot, display: "inline-block" }} />
                Risk {q.zone} · {zone.name}
              </div>
              <div className="ct-q-num">QUESTION {current + 1} OF {QUESTIONS.length}</div>
              <div className="ct-q-text">{q.q}</div>
              <div className="ct-q-context">{q.context}</div>
              <div className="ct-options">
                {q.opts.map((opt, i) => (
                  <button
                    key={i}
                    className={`ct-option-btn${selectedOpt === i ? " selected" : ""}`}
                    onClick={() => setSelectedOpt(i)}
                  >
                    <div className="ct-option-letter">{["A", "B", "C"][i]}</div>
                    <div className="ct-option-text">{opt}</div>
                  </button>
                ))}
              </div>
              <div className="ct-q-footer">
                <button className="ct-skip-btn" onClick={() => handleNext(null)}>
                  Skip this question
                </button>
                <button
                  className="ct-next-btn"
                  onClick={() => handleNext(selectedOpt)}
                  disabled={selectedOpt === null}
                >
                  {current < QUESTIONS.length - 1 ? "Next question →" : "See my results →"}
                </button>
              </div>
            </div>
          )}

          {/* RESULTS */}
          {screen === "results" && results && (
            <div className="ct-results-card">
              <div className="ct-results-hero">
                <h2>Your CARF Readiness Score</h2>
                <p>Based on {QUESTIONS.length} questions across all six risk zones</p>
                <div className="ct-gauge-wrap">
                  <svg className="ct-gauge-svg" viewBox="0 0 220 120">
                    <path fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="18" strokeLinecap="round" d="M 30 110 A 80 80 0 0 1 190 110" />
                    <path
                      fill="none"
                      stroke={results.gaugeColor}
                      strokeWidth="18"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset={gaugeOffset}
                      d="M 30 110 A 80 80 0 0 1 190 110"
                      style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
                    />
                    <text x="110" y="72" textAnchor="middle" fontFamily="Georgia,serif" fontSize="38" fontWeight="700" fill="white">
                      {gaugeNum}
                    </text>
                    <text x="110" y="92" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fill="#85B7EB" letterSpacing="1">
                      READINESS SCORE
                    </text>
                  </svg>
                </div>
                <span className="ct-risk-badge" style={{ background: results.riskBg, color: results.riskColor }}>
                  {results.riskLevel}
                </span>
              </div>
              <div className="ct-results-body">
                <div className="ct-results-section-title">Zone-by-zone assessment</div>
                <div className="ct-zone-results">
                  {ZONES.map(z => {
                    const avg = results.zoneAvg[z.id]
                    const st = getZoneStatus(avg)
                    return (
                      <div key={z.id} className="ct-zone-result-row">
                        <div className="ct-zrr-dot" style={{ background: z.dot }} />
                        <div className="ct-zrr-info">
                          <div className="ct-zrr-name">{z.name}</div>
                          <div className="ct-zrr-bar-wrap">
                            <div className="ct-zrr-bar" style={{ width: barsVisible ? `${st.pct}%` : "0%", background: st.bar }} />
                          </div>
                        </div>
                        <div className={`ct-zrr-status ${st.cls}`}>{st.label}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="ct-results-section-title">Priority action</div>
                <p className="ct-priority-text" style={{ borderLeft: `3px solid ${results.gaugeColor}` }}>
                  {results.priorityText}
                </p>
                <div className="ct-results-section-title">Next steps</div>
                <div className="ct-actions-grid">
                  <div className="ct-action-card">
                    <div className="ct-action-icon">📋</div>
                    <h4>Download Readiness Checklist</h4>
                    <p>25 action items across all 6 risk zones with Yes/No/In Progress tracking.</p>
                  </div>
                  <div className="ct-action-card">
                    <div className="ct-action-icon">🎙</div>
                    <h4>Watch the Full Webinar</h4>
                    <p>The Hidden Operational Risks in CARF Reporting,free, 75 minutes, live Q&A.</p>
                  </div>
                </div>
                <div className="ct-cta-block">
                  <h3>Get Expert Guidance from EduDubai</h3>
                  <p>
                    Your score is the starting point. Our CARF specialists will go deeper,reviewing your specific gaps, jurisdictions, and operating model,and recommend the right training programme for your team.
                    <br /><br />
                    Speak to us at training@edudubai.org or call +971 50 3130 946.
                  </p>
                  <div className="ct-cta-buttons">
                    <button className="ct-cta-primary" onClick={() => window.location.href = "/contact"}>
                      Book Free Consultation →
                    </button>
                    <button className="ct-cta-secondary" onClick={() => window.location.href = "/courses"}>
                      Explore CARF Courses
                    </button>
                  </div>
                </div>
                <button className="ct-restart-btn" onClick={handleRestart}>
                  Retake the diagnostic
                </button>
              </div>
            </div>
          )}

        </main>


      </div>
    </>
  )
}

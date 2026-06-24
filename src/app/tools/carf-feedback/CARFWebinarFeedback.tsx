"use client"

import { useState, useRef, useCallback } from "react"
import { Turnstile } from "@marsidev/react-turnstile"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type RatingKey = "overall" | "relevance" | "clarity" | "practical" | "expertise"

interface FormState {
  ratings: Record<RatingKey, number>
  liked: string
  more: string
  recommend: number
  resources: string[]
  services: string[]
  otherService: string
  fullname: string
  email: string
  org: string
  jobtitle: string
  country: string
}

const INITIAL: FormState = {
  ratings: { overall: 0, relevance: 0, clarity: 0, practical: 0, expertise: 0 },
  liked: "",
  more: "",
  recommend: 0,
  resources: [],
  services: [],
  otherService: "",
  fullname: "",
  email: "",
  org: "",
  jobtitle: "",
  country: "",
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const RATING_QUESTIONS: { key: RatingKey; q: string; hint: string }[] = [
  { key: "overall", q: "Overall quality of the webinar", hint: "Content depth, programme structure, and delivery standard across the full session" },
  { key: "relevance", q: "Relevance to your professional responsibilities", hint: "How directly applicable was the content to your compliance programme or institutional obligations?" },
  { key: "clarity", q: "Clarity of explanation and use of practical examples", hint: "Were complex CARF obligations communicated clearly, with examples grounded in real operational scenarios?" },
  { key: "practical", q: "Practical value — applicability to your work", hint: "To what extent will you be able to apply what you learned to your institution's CARF readiness programme?" },
  { key: "expertise", q: "Subject matter expertise of the presenters", hint: "Did the presenters demonstrate authoritative, current knowledge of CARF and the broader AEOI regulatory landscape?" },
]

const SCALE_LABELS = ["Poor", "Below avg", "Satisfactory", "Good", "Excellent"]

const REC_MSG: Record<number, string> = {
  1: "We appreciate your candour and will use this to improve.",
  2: "Thank you — your feedback will help us develop future sessions.",
  3: "Thank you. We will work to ensure the next session exceeds your expectations.",
  4: "Thank you — we are pleased the session was of value to you.",
  5: "We are grateful for your endorsement and look forward to the next session.",
}

const RESOURCE_OPTIONS = [
  { value: "diagnostic", title: "CARF 2026 Compliance Diagnostic Assessment Tool", desc: "An interactive diagnostic covering all six operational risk zones discussed in today's session. Produces a personalised readiness score and a priority action plan calibrated to your institution's specific operating jurisdictions and risk profile.", badge: "Interactive Assessment Tool — Complimentary" },
  { value: "checklist", title: "CARF 2026 Operational Readiness Checklist — 25 items across all 6 risk zones", desc: "A structured 25-item action checklist with Yes / No / In Progress status tracking, priority ratings (Critical / High / Medium), jurisdiction focus, owner, and target date columns. Includes a live completion dashboard that auto-calculates your readiness score as items are completed.", badge: "Excel Workbook — 25 Action Items · 6 Risk Zones — Complimentary" },
]

const SERVICE_OPTIONS = [
  { value: "twc-demo", title: "TWC Software Demo", desc: "A live, personalised demonstration of Trans World Compliance's CRS/FATCA One platform — covering self-certification workflows, TIN validation, remediation flagging, changes-in-circumstances monitoring, and jurisdiction-specific XML generation for CARF, CRS, and FATCA.", badge: "30-minute live demonstration · Scheduled at your convenience" },
  { value: "role-training", title: "Role-Based Training", desc: "Tailored compliance training programmes delivered by EduDubai for specific roles within your institution — including compliance officers, AML analysts, operations leads, legal counsel, and board members.", badge: "In-person · Virtual · Blended · MENA & GCC · India" },
  { value: "consulting", title: "Consulting in Policy and Procedure Development", desc: "Expert consulting support to develop, review, or strengthen your institution's CARF, CRS, and FATCA policies and procedures.", badge: "GCC · MENA · South Asia · Delivered by qualified compliance practitioners" },
]

const RESOURCE_NAMES: Record<string, string> = {
  diagnostic: "CARF 2026 Compliance Diagnostic Assessment Tool",
  checklist: "CARF 2026 Operational Readiness Checklist — 25 items across all 6 risk zones",
}

const SERVICE_NAMES: Record<string, string> = {
  "twc-demo": "TWC Software Demo — our team will be in touch to schedule",
  "role-training": "Role-Based Training — our team will contact you to discuss your requirements",
  consulting: "Consulting in Policy & Procedure Development — our team will be in touch",
}

// ---------------------------------------------------------------------------
// Certificate generator — background image + text overlay via Canvas 2D
// ---------------------------------------------------------------------------
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function downloadCertificatePDF(certId: string, name: string) {
  const bgImg = await loadImage("/certificate.png")

  const W = bgImg.width   // 1495
  const H = bgImg.height  // 1052
  // Use 2x on mobile (saves memory), 3x on desktop
  const isMobile = window.innerWidth < 768
  const S = isMobile ? 2 : 3
  const canvas = document.createElement("canvas")
  canvas.width = W * S
  canvas.height = H * S
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    alert("Certificate generation is not supported on this browser.")
    return
  }
  ctx.scale(S, S)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  // Draw certificate template as background
  ctx.drawImage(bgImg, 0, 0, W, H)

  // --- Participant name ---
  ctx.textBaseline = "top"
  ctx.fillStyle = "#020b1a"
  let fontSize = 82
  ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
  while (ctx.measureText(name).width > 785 && fontSize > 38) {
    fontSize -= 2
    ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`
  }
  ctx.fillText(name, 50, 300)

  // --- Certificate number ---
  ctx.font = "800 18px Arial, Helvetica, sans-serif"
  ctx.fillStyle = "#07101f"
  ctx.fillText(certId, 675, 762)

  // --- Export to PDF ---
  const { default: jsPDF } = await import("jspdf")
  const imgData = canvas.toDataURL("image/jpeg", 0.95)
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" })
  pdf.addImage(imgData, "JPEG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight())
  pdf.save(`${certId}-${name}.pdf`.replace(/\s+/g, "_"))
}

function generateCertNumber(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).substring(2, 6)
  return `CARF-2026-${ts.slice(-4)}${rand}`.toUpperCase()
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function ScaleTrack({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex w-full">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`flex-1 flex flex-col items-center gap-0.5 sm:gap-1 py-3 sm:py-2.5 px-0.5 sm:px-1 border border-r-0 last:border-r transition-colors ${
            value === v
              ? "bg-[#042C53] border-[#042C53] z-[1]"
              : "bg-[#FAFAF8] border-[#DDE3EC] hover:bg-[#EDF1F7]"
          }`}
        >
          <span className={`text-sm sm:text-base font-bold leading-none ${value === v ? "text-white" : "text-[#5A6A82]"}`}>{v}</span>
          <span className={`text-[8px] sm:text-[9px] uppercase tracking-wide text-center leading-tight ${value === v ? "text-white/70" : "text-[#5A6A82]"}`}>
            {SCALE_LABELS[v - 1]}
          </span>
        </button>
      ))}
    </div>
  )
}

function CheckItem({
  checked,
  onChange,
  title,
  desc,
  badge,
  children,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  title: string
  desc: string
  badge: string
  children?: React.ReactNode
}) {
  return (
    <label
      className={`flex items-start gap-3 p-3.5 border-[1.5px] rounded cursor-pointer select-none transition-all ${
        checked ? "border-[#1A8F68] bg-[#EAF5F0]" : "border-[#DDE3EC] bg-[#FAFAF8] hover:border-[#0C447C] hover:bg-white"
      }`}
    >
      <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className={`w-5 h-5 border-2 rounded-sm flex-shrink-0 mt-0.5 flex items-center justify-center text-xs transition-all ${
        checked ? "bg-[#1A8F68] border-[#1A8F68] text-white" : "border-[#DDE3EC] bg-white text-transparent"
      }`}>
        {checked && "✓"}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-[#1A2637] mb-0.5 leading-snug">{title}</p>
        <p className="text-xs text-[#5A6A82] leading-relaxed">{desc}</p>
        <span className="text-[10px] font-semibold text-[#1A8F68] uppercase tracking-wide mt-1 block">{badge}</span>
        {children}
      </div>
    </label>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function CARFWebinarFeedback() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const certNumberRef = useRef(generateCertNumber())
  const turnstileRef = useRef<string>("")
  const thankYouRef = useRef<HTMLDivElement>(null)

  const setRating = useCallback((key: RatingKey, val: number) => {
    setForm((f) => ({ ...f, ratings: { ...f.ratings, [key]: val } }))
  }, [])

  const toggleList = useCallback((field: "resources" | "services", val: string) => {
    setForm((f) => {
      const list = f[field]
      return { ...f, [field]: list.includes(val) ? list.filter((v) => v !== val) : [...list, val] }
    })
  }, [])

  const validate = (): boolean => {
    const errs: Record<string, boolean> = {}
    if (!form.liked.trim()) errs.liked = true
    if (!form.fullname.trim()) errs.fullname = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = true
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      const el = document.querySelector(".field-error")
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmitting(true)
    setSubmitError("")
    try {
      const res = await fetch("/api/tools/carf-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken: turnstileRef.current,
          ...form.ratings,
          liked: form.liked,
          more: form.more,
          recommend: form.recommend,
          resources: form.resources,
          services: form.services,
          otherService: form.otherService,
          fullname: form.fullname,
          email: form.email,
          org: form.org,
          jobtitle: form.jobtitle,
          country: form.country,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setSubmitError(data.error || "Submission failed. Your certificate will still download.")
      }
    } catch {
      setSubmitError("Network error. Your certificate will still download.")
    }

    setSubmitted(true)
    setTimeout(() => thankYouRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100)

    // auto-generate certificate PDF
    setGeneratingPDF(true)
    try {
      await downloadCertificatePDF(certNumberRef.current, form.fullname)
    } catch (err) {
      console.error("Certificate generation failed:", err)
    }
    setGeneratingPDF(false)
    setSubmitting(false)
  }

  const allThankItems = [
    ...form.resources.map((v) => RESOURCE_NAMES[v]).filter(Boolean),
    ...form.services.filter((v) => v !== "other").map((v) => SERVICE_NAMES[v]).filter(Boolean),
    ...(form.services.includes("other") && form.otherService ? [`Other service enquiry: ${form.otherService}`] : []),
  ]

  // -------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#EDF1F7] flex flex-col">
      {/* Masthead */}
      <header className="bg-[#021E3A] border-b-[3px] border-[#1A8F68] px-4 sm:px-8 flex items-stretch justify-between gap-2 sm:gap-4 min-h-[48px] sm:min-h-[56px]">
        <div className="flex items-center gap-2 sm:gap-3.5 py-2 sm:py-3">
          <span className="font-serif text-[11px] sm:text-[13px] font-bold text-white tracking-wide border border-white/25 px-1.5 sm:px-2 py-0.5 sm:py-1">EDU</span>
          <div className="w-px h-4 sm:h-5 bg-white/20" />
          <span className="text-[10px] sm:text-xs text-white/65 tracking-wide">Edu-Dubai × Trans World Compliance</span>
        </div>
        <div className="hidden sm:flex items-center">
          <span className="text-[11px] text-[#1A8F68] tracking-widest uppercase font-semibold">Certificate Issued on Completion</span>
        </div>
      </header>

      <div className="flex-1 max-w-[700px] w-full mx-auto px-3 sm:px-4 py-5 sm:py-9 pb-10 sm:pb-14">
        {/* Hero + Banner — hidden after submit */}
        {!submitted && (<>
        <div className="bg-[#042C53] p-5 sm:p-9 pb-6 sm:pb-8 relative overflow-hidden mb-1">
          <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#1A8F68]" />
          <p className="text-[11px] font-semibold text-[#1A8F68] tracking-[0.1em] uppercase mb-3.5">Post-Webinar Feedback — Confidential</p>
          <h1 className="font-serif text-white text-[clamp(20px,3.5vw,28px)] leading-tight mb-2.5 font-normal">
            The Hidden Operational Risks<br />in CARF Reporting
          </h1>
          <p className="text-sm text-[#B5D4F4]/85 leading-relaxed max-w-[540px] mb-5">
            Your feedback enables us to improve future sessions and ensures your certificate of participation is issued promptly. All responses are treated with complete confidentiality.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-5 pt-4 border-t border-white/10">
            {[
              ["Event", "25 June 2026"],
              ["Format", "Live Webinar · 75 min"],
              ["Hosted by", "Edu-Dubai × Trans World Compliance"],
              ["Time required", "Approx. 3 minutes"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[10px] text-white/40 tracking-wider uppercase">{label}</span>
                <span className="text-[13px] text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instruction Banner */}
        <div className="bg-[#FAFAF8] border border-[#DDE3EC] border-l-4 border-l-[#C9952A] px-4 py-3 mb-7 text-[13px] text-[#5A6A82] leading-relaxed">
          <strong className="text-[#1A2637]">How to complete this form:</strong> Rate each item by selecting a score from 1 to 5. Provide written responses in the open-text fields. Complete Section 6 to receive your certificate of participation and any resources you select in Section 4.
        </div>
        </>)}

        {!submitted ? (
          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1 — Ratings */}
            <SectionCard accent="navy" num={1} title={<>Session Ratings <span className="text-[13px] text-[#5A6A82] font-sans not-italic">1 = Poor · 5 = Excellent</span></>}>
              <div className="space-y-5">
                {RATING_QUESTIONS.map((rq) => (
                  <div key={rq.key} className="pb-4 border-b border-[#DDE3EC] last:pb-0 last:border-b-0">
                    <p className="text-sm font-semibold text-[#1A2637] mb-0.5">{rq.q}</p>
                    <p className="text-xs text-[#5A6A82] mb-3 leading-relaxed">{rq.hint}</p>
                    <ScaleTrack value={form.ratings[rq.key]} onChange={(v) => setRating(rq.key, v)} />
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Section 2 — Assessment */}
            <SectionCard accent="teal" num={2} title="Your Assessment">
              <div className="space-y-5">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#1A2637]" htmlFor="q-liked">
                    What did you find most valuable about this session?<span className="text-[#8B1A1A] ml-0.5">*</span>
                  </label>
                  <p className="text-xs text-[#5A6A82] leading-relaxed mb-1">Please be specific — a particular risk zone, worked example, regulatory comparison, or demonstration segment.</p>
                  <textarea
                    id="q-liked"
                    maxLength={700}
                    value={form.liked}
                    onChange={(e) => { setForm((f) => ({ ...f, liked: e.target.value })); setErrors((er) => ({ ...er, liked: false })) }}
                    placeholder="For example: The worked example on crypto-to-crypto FMV calculation was highly instructive..."
                    className={`w-full p-3 border rounded text-sm bg-[#FAFAF8] text-[#1A2637] leading-relaxed min-h-[110px] resize-y transition-colors focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)] ${errors.liked ? "border-[#8B1A1A] bg-[#FDF2F2] field-error" : "border-[#DDE3EC]"}`}
                  />
                  <span className="text-[11px] text-[#5A6A82] text-right">{form.liked.length} / 700</span>
                  {errors.liked && <span className="text-xs text-[#8B1A1A]">Please share what you found most valuable.</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#1A2637]" htmlFor="q-more">
                    What additional topics or jurisdictions would you like covered in future sessions?
                  </label>
                  <p className="text-xs text-[#5A6A82] leading-relaxed mb-1">Areas of CARF, CRS 2.0, or related regulatory frameworks you would like explored in greater depth.</p>
                  <textarea
                    id="q-more"
                    maxLength={700}
                    value={form.more}
                    onChange={(e) => setForm((f) => ({ ...f, more: e.target.value }))}
                    placeholder="For example: A dedicated session on MAS Singapore's Wave 2 implementation..."
                    className="w-full p-3 border border-[#DDE3EC] rounded text-sm bg-[#FAFAF8] text-[#1A2637] leading-relaxed min-h-[110px] resize-y transition-colors focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)]"
                  />
                  <span className="text-[11px] text-[#5A6A82] text-right">{form.more.length} / 700</span>
                </div>
              </div>
            </SectionCard>

            {/* Section 3 — Recommend */}
            <SectionCard accent="navy" num={3} title="Likelihood to Recommend">
              <p className="text-xs text-[#5A6A82] mb-3">
                How likely are you to recommend this webinar to a colleague? <span className="text-[11px]">1 = Would not recommend · 5 = Would strongly recommend</span>
              </p>
              <div className="flex gap-2 flex-wrap mb-2">
                {[1, 2, 3, 4, 5].map((v) => {
                  const cls =
                    form.recommend === v
                      ? v <= 2 ? "bg-[#FDF2F2] border-[#8B1A1A] text-[#8B1A1A]"
                        : v === 3 ? "bg-[#FEF9ED] border-[#C9952A] text-[#C9952A]"
                        : "bg-[#EAF5F0] border-[#1A8F68] text-[#1A8F68]"
                      : "bg-[#FAFAF8] border-[#DDE3EC] text-[#5A6A82] hover:border-[#042C53] hover:text-[#042C53]"
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, recommend: v }))}
                      className={`w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] border-[1.5px] rounded text-[15px] sm:text-[17px] font-bold cursor-pointer transition-all flex items-center justify-center ${cls}`}
                    >
                      {v}
                    </button>
                  )
                })}
              </div>
              {form.recommend > 0 && (
                <p className="text-[13px] text-[#1A8F68] font-medium italic min-h-[18px] mt-2">{REC_MSG[form.recommend]}</p>
              )}
            </SectionCard>

            {/* Section 4 — Resources */}
            <SectionCard accent="gold" num={4} title="Resources — I Wish to Receive">
              <p className="text-xs text-[#5A6A82] mb-3 leading-relaxed">Please select the resources you would like sent to your registered email address. Both are complimentary and will be delivered within 24 hours.</p>
              <div className="space-y-2.5">
                {RESOURCE_OPTIONS.map((r) => (
                  <CheckItem
                    key={r.value}
                    checked={form.resources.includes(r.value)}
                    onChange={() => toggleList("resources", r.value)}
                    title={r.title}
                    desc={r.desc}
                    badge={r.badge}
                  />
                ))}
              </div>
            </SectionCard>

            {/* Section 5 — Services */}
            <SectionCard accent="purple" num={5} title="Services — I Wish to Receive">
              <p className="text-xs text-[#5A6A82] mb-3 leading-relaxed">Please indicate if you would like to be contacted regarding any of the following services. Selecting an option does not constitute a commitment.</p>
              <div className="space-y-2.5">
                {SERVICE_OPTIONS.map((s) => (
                  <CheckItem
                    key={s.value}
                    checked={form.services.includes(s.value)}
                    onChange={() => toggleList("services", s.value)}
                    title={s.title}
                    desc={s.desc}
                    badge={s.badge}
                  />
                ))}
                <CheckItem
                  checked={form.services.includes("other")}
                  onChange={() => toggleList("services", "other")}
                  title="Other — Please Specify"
                  desc="If you have a specific requirement not listed above, please tick this option and provide details below."
                  badge=""
                >
                  {form.services.includes("other") && (
                    <input
                      type="text"
                      value={form.otherService}
                      onChange={(e) => { e.stopPropagation(); setForm((f) => ({ ...f, otherService: e.target.value })) }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Please describe your requirement..."
                      className="w-full mt-2 p-2.5 border border-[#DDE3EC] rounded text-[13px] bg-[#FAFAF8] focus:outline-none focus:border-[#0C447C] focus:bg-white"
                    />
                  )}
                </CheckItem>
              </div>
            </SectionCard>

            {/* Section 6 — Certificate */}
            <SectionCard accent="teal" num={6} title="Certificate of Participation">
              <p className="text-xs text-[#5A6A82] mb-4 leading-relaxed">
                Complete the fields below to receive your certificate. Fields marked <strong>*</strong> are required. Your certificate will be auto-downloaded upon submission.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#1A2637]" htmlFor="f-name">Full name — as it should appear on your certificate<span className="text-[#8B1A1A] ml-0.5">*</span></label>
                  <p className="text-xs text-[#5A6A82] mb-1">Please enter your name exactly as you would like it to appear on the certificate.</p>
                  <input
                    type="text" id="f-name" autoComplete="name"
                    value={form.fullname}
                    onChange={(e) => { setForm((f) => ({ ...f, fullname: e.target.value })); setErrors((er) => ({ ...er, fullname: false })) }}
                    placeholder="e.g. Adv. Sanjay M. Prabhu"
                    className={`w-full p-3 border rounded text-sm bg-[#FAFAF8] text-[#1A2637] transition-colors focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)] ${errors.fullname ? "border-[#8B1A1A] bg-[#FDF2F2] field-error" : "border-[#DDE3EC]"}`}
                  />
                  {errors.fullname && <span className="text-xs text-[#8B1A1A]">Please enter your full name.</span>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#1A2637]" htmlFor="f-email">Email address<span className="text-[#8B1A1A] ml-0.5">*</span></label>
                  <p className="text-xs text-[#5A6A82] mb-1">Your certificate and selected resources will be sent to this address.</p>
                  <input
                    type="email" id="f-email" autoComplete="email"
                    value={form.email}
                    onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: false })) }}
                    placeholder="name@institution.com"
                    className={`w-full p-3 border rounded text-sm bg-[#FAFAF8] text-[#1A2637] transition-colors focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)] ${errors.email ? "border-[#8B1A1A] bg-[#FDF2F2] field-error" : "border-[#DDE3EC]"}`}
                  />
                  {errors.email && <span className="text-xs text-[#8B1A1A]">Please enter a valid email address.</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#1A2637]" htmlFor="f-org">Organisation</label>
                    <input
                      type="text" id="f-org" autoComplete="organization"
                      value={form.org}
                      onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                      placeholder="e.g. Emirates NBD, ADGM Academy..."
                      className="w-full p-3 border border-[#DDE3EC] rounded text-sm bg-[#FAFAF8] text-[#1A2637] focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)]"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-[#1A2637]" htmlFor="f-title">Job title</label>
                    <input
                      type="text" id="f-title"
                      value={form.jobtitle}
                      onChange={(e) => setForm((f) => ({ ...f, jobtitle: e.target.value }))}
                      placeholder="e.g. Head of Compliance"
                      className="w-full p-3 border border-[#DDE3EC] rounded text-sm bg-[#FAFAF8] text-[#1A2637] focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-[#1A2637]" htmlFor="f-country">Country / Jurisdiction</label>
                  <input
                    type="text" id="f-country"
                    value={form.country}
                    onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                    placeholder="e.g. UAE, Saudi Arabia, Singapore..."
                    className="w-full p-3 border border-[#DDE3EC] rounded text-sm bg-[#FAFAF8] text-[#1A2637] focus:outline-none focus:border-[#0C447C] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,68,124,0.07)]"
                  />
                </div>
              </div>
            </SectionCard>

            {/* Turnstile + Submit */}
            <div className="bg-white border border-[#DDE3EC] p-4 sm:p-7 text-center">
              <p className="text-[13px] text-[#5A6A82] leading-relaxed mb-5 max-w-[480px] mx-auto">
                By submitting this form, you confirm your attendance at the webinar hosted by Edu-Dubai × Trans World Compliance on 25 June 2026. Your responses are treated with complete confidentiality.
              </p>
              <div className="flex justify-center mb-4">
                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={(token) => { turnstileRef.current = token }}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-[#D4A32A] via-[#F0C040] to-[#D4A32A] text-[#042C53] text-[16px] font-extrabold py-4 px-10 rounded-lg w-full max-w-[420px] transition-all hover:from-[#E0B030] hover:via-[#FFD04A] hover:to-[#E0B030] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(212,163,42,0.45)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_15px_rgba(212,163,42,0.3)]"
              >
                {submitting ? "Submitting..." : "Submit Feedback & Download Certificate"}
              </button>
              <p className="mt-4 text-xs text-[#5A6A82]">
                Queries: <a href="mailto:training@edudubai.org" className="text-[#1A8F68] no-underline">training@edudubai.org</a>
              </p>
            </div>
          </form>
        ) : (
          /* Thank You */
          <div ref={thankYouRef} className="bg-white border border-[#DDE3EC] border-t-4 border-t-[#1A8F68] px-5 sm:px-9 py-8 sm:py-12 text-center animate-in fade-in slide-in-from-bottom-3 duration-400">
            <div className="w-14 h-14 rounded-full bg-[#EAF5F0] border-2 border-[#1A8F68] flex items-center justify-center mx-auto mb-5 text-[22px] text-[#1A8F68] font-bold">✓</div>
            <h2 className="font-serif text-2xl text-[#042C53] mb-2 font-normal">Thank you for your feedback.</h2>
            {submitError && (
              <p className="text-xs text-[#8B1A1A] bg-[#FDF2F2] border border-[#8B1A1A]/20 rounded px-3 py-2 mb-3 max-w-[440px] mx-auto">{submitError}</p>
            )}
            <p className="text-[15px] text-[#1A8F68] font-semibold mb-3.5">{form.fullname}</p>
            <p className="text-sm text-[#5A6A82] leading-relaxed mb-7 max-w-[440px] mx-auto">
              Your responses have been recorded. Your certificate of participation {generatingPDF ? "is being generated..." : "has been downloaded."} Selected resources will be sent to <strong>{form.email}</strong> within 24 hours.
            </p>

            <div className="bg-[#042C53] rounded p-4 sm:p-5 mb-5 text-left">
              <p className="text-[10px] text-white/50 tracking-wider uppercase mb-2">Certificate of Participation</p>
              <p className="font-serif text-[15px] text-white leading-relaxed mb-1.5">
                The Hidden Operational Risks in CARF Reporting: What Can Go Wrong — and How to Stop It Before 2027
              </p>
              <p className="text-xs text-[#B5D4F4]/70">Edu-Dubai × Trans World Compliance · 25 June 2026 · 75 Minutes</p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={() => downloadCertificatePDF(certNumberRef.current, form.fullname)}
                className="inline-flex items-center justify-center gap-2 bg-[#042C53] text-white text-sm font-semibold py-3 px-6 rounded transition-all hover:bg-[#0C447C]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                Download Certificate
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://edudubai.org/tools/carf-feedback")}&title=${encodeURIComponent("I just completed the CARF 2026 Webinar — The Hidden Operational Risks in CARF Reporting — hosted by Edu-Dubai × Trans World Compliance.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white text-sm font-semibold py-3 px-6 rounded transition-all hover:bg-[#004182]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Share on LinkedIn
              </a>
            </div>

            {/* CARF Diagnostic CTA */}
            <div className="bg-[#FAFAF8] border border-[#DDE3EC] rounded p-5 mb-6 text-center">
              <p className="text-sm text-[#1A2637] font-semibold mb-1">Assess your CARF readiness</p>
              <p className="text-xs text-[#5A6A82] mb-3">Take our free 5-minute diagnostic across all 6 risk zones discussed in the webinar.</p>
              <a
                href="/tools/carf"
                className="inline-flex items-center justify-center gap-2 bg-[#1A8F68] text-white text-sm font-semibold py-2.5 px-6 rounded transition-all hover:bg-[#157555]"
              >
                Take the CARF Diagnostic
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </a>
            </div>

            {allThankItems.length > 0 && (
              <div className="bg-[#EAF5F0] rounded p-4 text-left mb-5">
                <p className="text-[11px] font-bold text-[#1A8F68] tracking-wider uppercase mb-2">Resources & services — next steps</p>
                {allThankItems.map((item, i) => (
                  <div key={i} className="text-[13px] text-[#1A2637] py-1 border-b border-[#1A8F68]/15 last:border-b-0 flex items-center gap-2">
                    <span className="text-[#1A8F68] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[13px] text-[#5A6A82]">
              Questions? Contact us at{" "}
              <a href="mailto:training@edudubai.org" className="text-[#1A8F68] no-underline">training@edudubai.org</a>
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Section card wrapper
// ---------------------------------------------------------------------------
const ACCENT_COLORS: Record<string, string> = {
  navy: "border-l-[#042C53]",
  teal: "border-l-[#1A8F68]",
  gold: "border-l-[#C9952A]",
  purple: "border-l-[#534AB7]",
}

function SectionCard({ accent, num, title, children }: { accent: string; num: number; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className={`bg-white border border-[#DDE3EC] border-l-4 ${ACCENT_COLORS[accent] || ""} mb-5`}>
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-[#DDE3EC] flex items-baseline gap-2 sm:gap-3">
        <span className="text-[9px] sm:text-[10px] font-bold text-[#5A6A82] tracking-[0.1em] uppercase whitespace-nowrap">Section {num}</span>
        <span className="font-serif text-[15px] sm:text-[17px] text-[#042C53] font-normal leading-snug">{title}</span>
      </div>
      <div className="px-4 sm:px-6 py-4 sm:py-5">{children}</div>
    </div>
  )
}

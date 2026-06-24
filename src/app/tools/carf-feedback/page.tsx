import type { Metadata } from "next"
import { CARFWebinarFeedback } from "./CARFWebinarFeedback"

export const metadata: Metadata = {
  title: "CARF 2026 Webinar Feedback | Tools | EduDubai",
  description: "Post-webinar feedback form for The Hidden Operational Risks in CARF Reporting. Submit your feedback and receive your certificate of participation.",
}

export default function CARFFeedbackPage() {
  return <CARFWebinarFeedback />
}

import type { Metadata } from "next"
import { CARFDiagnostic } from "./CARFDiagnostic"

export const metadata: Metadata = {
  title: "CARF 2026 Compliance Diagnostic | Tools | EduDubai",
  description: "Free 5-minute CARF compliance diagnostic. Assess your institution's readiness across 6 risk zones and get instant personalised results.",
}

export default function CARFPage() {
  return <CARFDiagnostic />
}

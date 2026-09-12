import type { Metadata } from "next"

// The policies index is a client component, so its metadata lives here.
// Nested policy pages declare their own metadata and override this.
export const metadata: Metadata = {
  title: "Policies",
  description:
    "EduDubai's privacy policy, terms of service and refund policy for learners and corporate clients.",
  alternates: { canonical: "/policies" },
}

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

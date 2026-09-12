import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Corporate Training Programmes",
  description:
    "In-house AML, sanctions and financial crime training built around your institution's risk profile, delivered online or on site by practising specialists.",
  alternates: { canonical: "/corporate-training" },
}

export default function CorporateTrainingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

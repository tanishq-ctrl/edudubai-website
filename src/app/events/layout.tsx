import type { Metadata } from "next"

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Webinars & Events",
  description:
    "Upcoming EduDubai webinars, masterclasses and live compliance briefings for AML and financial crime professionals.",
  alternates: { canonical: "/events" },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import { Container } from "@/components/container"
import { ScholarshipForm } from "@/components/forms/scholarship-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Ramadan Global Scholarship 2026 | EduDubai",
    description: "Apply for the Edu-Dubai Ramadan Global Scholarship Program 2026. A fully funded opportunity for CAMS certification training.",
}

export default function ScholarshipPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-24">
                <Container>
                    <ScholarshipForm />
                </Container>
            </section>
        </main>
    )
}

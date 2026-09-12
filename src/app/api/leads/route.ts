import { NextResponse } from "next/server"
import { syncLeadToSystemeIO } from "@/lib/systeme-io"
import { verifyTurnstile } from "@/lib/turnstile"
import { recordLead, markLeadSynced } from "@/server/leads-repository"
import { enforceRateLimit } from "@/lib/rate-limit"

export async function POST(req: Request) {
    const limited = enforceRateLimit(req, "leads", { limit: 5, windowMs: 60_000 })
    if (limited) return limited

    try {
        const data = await req.json()
        const { email, name, company, phone, course, turnstileToken } = data

        if (!email || !name) {
            return NextResponse.json({ error: "Email and Name are required" }, { status: 400 })
        }

        if (!await verifyTurnstile(turnstileToken ?? "")) {
            return NextResponse.json({ error: "Security check failed. Please refresh and try again." }, { status: 400 })
        }

        // 0. Persist first: a CRM failure must never cost us the lead.
        const leadId = await recordLead({
            source: "GENERAL",
            name,
            email,
            phone,
            company,
            courseTitle: course || null,
        })

        // 1. Sync to Systeme.io CRM
        // We avoid tags (due to 10-tag plan limit) and use Custom Fields instead.
        await syncLeadToSystemeIO({
            email,
            firstName: name,
            company,
            phone,
            courseInterest: course || "General Inquiry",
        })
        await markLeadSynced(leadId)

        // 2. Here you could also send an email notification to yourself
        // await sendLeadNotificationEmail(data);

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Lead API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

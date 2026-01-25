import { NextResponse } from "next/server"
import { syncLeadToSystemeIO } from "@/lib/systeme-io"

export async function POST(req: Request) {
    try {
        const data = await req.json()
        const { email, name, company, phone, course } = data

        if (!email || !name) {
            return NextResponse.json({ error: "Email and Name are required" }, { status: 400 })
        }

        // 1. Sync to Systeme.io CRM
        // We avoid tags (due to 10-tag plan limit) and use Custom Fields instead.
        await syncLeadToSystemeIO({
            email,
            firstName: name,
            company,
            phone,
            courseInterest: course || "General Inquiry",
        })

        // 2. Here you could also send an email notification to yourself
        // await sendLeadNotificationEmail(data);

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Lead API Error:", error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

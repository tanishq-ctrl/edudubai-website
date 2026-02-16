import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendScholarshipNotification } from "@/lib/email"

// Use service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Syncs scholarship application to Systeme.io
 */
async function syncScholarshipToSystemeIO(data: {
    email: string;
    firstName: string;
    fullName: string;
    mobile: string;
    country: string;
    nationality: string;
    jobTitle: string;
    organization?: string;
    yearsExperience: string;
    previouslyAttempted: string;
    reasonForApplying: string;
    selfFunding: string;
}) {
    const apiKey = process.env.SYSTEME_IO_API_KEY;
    if (!apiKey) {
        console.warn("[Systeme.io] API Key not configured for scholarship.");
        return;
    }

    try {
        console.log(`[Systeme.io] Syncing scholarship application: ${data.email}`);

        // 1. Create or fetch contact
        const syncAttempt = async () => {
            const fields = [
                { slug: "first_name", value: data.firstName },
                { slug: "phone_number", value: data.mobile },
                { slug: "company_name", value: data.organization || "N/A" },
                { slug: "course_interest", value: "CAMS Ramadan Scholarship 2026" }
            ];

            return await fetch("https://api.systeme.io/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": apiKey,
                },
                body: JSON.stringify({ email: data.email, fields }),
            });
        };

        let contactResponse = await syncAttempt();
        let contactData;

        if (!contactResponse.ok) {
            const errText = await contactResponse.text();
            console.warn(`[Systeme.io] Initial sync failed: ${errText}`);

            // Fetch existing contact
            const emailParam = encodeURIComponent(data.email);
            const listResponse = await fetch(`https://api.systeme.io/api/contacts?email=${emailParam}`, {
                headers: { "X-API-Key": apiKey }
            });
            const listData = await listResponse.json();
            contactData = listData.items?.find((item: any) => item.email.toLowerCase() === data.email.toLowerCase());

            if (!contactData) {
                console.error("[Systeme.io] Could not create or find contact");
                return;
            }
        } else {
            contactData = await contactResponse.json();
        }

        // 2. Update contact with scholarship-specific data using PATCH
        if (contactData) {
            const updateFields = [
                { slug: "first_name", value: data.firstName },
                { slug: "phone_number", value: data.mobile },
                { slug: "company_name", value: data.organization || "N/A" },
                { slug: "course_interest", value: "CAMS Ramadan Scholarship 2026" }
            ];

            await fetch(`https://api.systeme.io/api/contacts/${contactData.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/merge-patch+json",
                    "X-API-Key": apiKey,
                },
                body: JSON.stringify({ fields: updateFields }),
            });
        }

        // 3. Apply "Scholarship_Applications" tag
        const tagsResponse = await fetch("https://api.systeme.io/api/tags", {
            headers: { "X-API-Key": apiKey }
        });
        const tagsData = await tagsResponse.json();
        const scholarshipTag = tagsData.items?.find((t: any) =>
            t.name.trim() === "Scholarship_Applications" ||
            t.name.toLowerCase().includes("scholarship")
        );

        if (scholarshipTag) {
            await fetch(`https://api.systeme.io/api/contacts/${contactData.id}/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": apiKey,
                },
                body: JSON.stringify({ tagId: scholarshipTag.id }),
            });
            console.log(`[Systeme.io] SUCCESS: Scholarship tag applied to ${data.email}`);
        } else {
            console.warn("[Systeme.io] Scholarship tag not found - please create 'Scholarship_Applications' tag");
        }

        return contactData;
    } catch (error) {
        console.error("[Systeme.io] Scholarship sync CRASHED:", error);
        throw error;
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json()

        const {
            fullName,
            email,
            mobile,
            country,
            nationality,
            jobTitle,
            organization,
            yearsExperience,
            previouslyAttempted,
            reasonForApplying,
            selfFunding,
            availabilityConfirm,
            accuracyConfirm,
            typedName,
            date
        } = data

        // Validation
        if (!fullName || !email || !mobile || !country || !nationality) {
            return NextResponse.json({ error: "Missing required basic information" }, { status: 400 })
        }

        if (!jobTitle || !yearsExperience || !previouslyAttempted) {
            return NextResponse.json({ error: "Missing required professional background" }, { status: 400 })
        }

        if (!reasonForApplying || reasonForApplying.length < 150 || reasonForApplying.length > 250) {
            return NextResponse.json({
                error: "Please provide a reason for applying between 150-250 words"
            }, { status: 400 })
        }

        if (!selfFunding) {
            return NextResponse.json({ error: "Please indicate your funding status" }, { status: 400 })
        }

        if (!availabilityConfirm || !accuracyConfirm) {
            return NextResponse.json({ error: "Please confirm both commitment declarations" }, { status: 400 })
        }

        if (!typedName || !date) {
            return NextResponse.json({ error: "Please provide your signature and date" }, { status: 400 })
        }

        // Extract first name from full name
        const firstName = fullName.split(' ')[0]

        // Create Supabase client with service role key
        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        })

        // 1. Save to Supabase Database
        try {
            const { data: application, error: dbError } = await supabase
                .from('scholarship_applications')
                .insert({
                    fullName,
                    email,
                    mobile,
                    country,
                    nationality,
                    jobTitle,
                    organization: organization || null,
                    yearsExperience,
                    previouslyAttempted,
                    reasonForApplying,
                    selfFunding,
                    availabilityConfirm,
                    accuracyConfirm,
                    typedName,
                    signatureDate: date,
                    status: 'PENDING',
                })
                .select()
                .single()

            if (dbError) {
                throw dbError
            }

            console.log(`[Database] Scholarship application saved with ID: ${application.id}`)
        } catch (dbError) {
            console.error("[Database] Failed to save scholarship application:", dbError)
            // We'll continue even if DB fails, so Systeme.io and email still work
        }

        // 2. Send Email Notification to Admin
        try {
            await sendScholarshipNotification({
                fullName,
                email,
                mobile,
                country,
                nationality,
                jobTitle,
                organization,
                yearsExperience,
                previouslyAttempted,
                reasonForApplying,
                selfFunding,
                typedName,
                signatureDate: date
            })
            console.log(`[Email] Scholarship notification sent for: ${email}`)
        } catch (emailError) {
            console.error("[Email] Failed to send scholarship notification:", emailError)
            // Continue even if email fails
        }

        // 3. Sync to Systeme.io
        try {
            await syncScholarshipToSystemeIO({
                email,
                firstName,
                fullName,
                mobile,
                country,
                nationality,
                jobTitle,
                organization,
                yearsExperience,
                previouslyAttempted,
                reasonForApplying,
                selfFunding
            })
        } catch (systemeError) {
            console.error("[Systeme.io] Failed to sync scholarship:", systemeError)
            // Continue even if Systeme.io fails
        }

        // Log the application for debugging
        console.log(`[Scholarship] New application from ${fullName} (${email})`)

        return NextResponse.json({
            success: true,
            message: "Application submitted successfully"
        })
    } catch (error) {
        console.error("Scholarship API Error:", error)
        return NextResponse.json({
            error: "Internal Server Error. Please try again."
        }, { status: 500 })
    }
}

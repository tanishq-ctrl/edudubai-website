/**
 * Utility to sync enrollment data with Systeme.io using the Public API
 * This will create/update a contact and apply a course-specific tag to trigger automations.
 */
export async function syncToSystemeIO(data: {
    email: string;
    firstName?: string;
    courseTitle: string;
    courseSlug: string;
}) {
    const apiKey = process.env.SYSTEME_IO_API_KEY;

    if (!apiKey) {
        console.warn("[Systeme.io] API Key not configured. Skipping sync.");
        return;
    }

    try {
        // 1. Create or Update Contact
        // Note: Systeme.io POST /contacts returns 400 if user exists
        const contactResponse = await fetch("https://api.systeme.io/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
            },
            body: JSON.stringify({
                email: data.email,
                fields: [
                    {
                        slug: "first_name",
                        value: data.firstName || "Learner"
                    }
                ]
            }),
        });

        let contactData;
        if (!contactResponse.ok) {
            const errText = await contactResponse.text();

            // If contact already exists, we might want to fetch it instead
            if (errText.includes("already used")) {
                console.log("[Systeme.io] Contact exists, fetching existing record...");
                const listResponse = await fetch(`https://api.systeme.io/api/contacts?email=${data.email}`, {
                    headers: { "X-API-Key": apiKey }
                });
                const listData = await listResponse.json();
                contactData = listData.items?.[0];
            } else {
                console.error("[Systeme.io] API Error Response:", errText);
                return { error: errText };
            }
        } else {
            contactData = await contactResponse.json();
        }

        if (!contactData) return { error: "Could not create or find contact" };

        const contactId = contactData.id;
        const tagName = `Course_${data.courseSlug.replace(/-/g, "_")}`;

        console.log(`[Systeme.io] Using Contact ID: ${contactId}, looking for Tag: "${tagName}"`);

        // 2. Find the Tag ID in Systeme.io
        let tagResult = { assigned: false, error: null as string | null };
        try {
            const tagsResponse = await fetch("https://api.systeme.io/api/tags", {
                headers: { "X-API-Key": apiKey }
            });
            const tagsData = await tagsResponse.json();

            if (!tagsData.items) {
                console.error("[Systeme.io] Tags response missing items:", tagsData);
                tagResult.error = "Tags response format unexpected";
            } else {
                const targetTag = tagsData.items.find((t: any) => {
                    const apiTagName = t.name.toLowerCase();
                    const expectedExact = tagName.toLowerCase();
                    const courseKeywords = data.courseTitle.toLowerCase().split(" ");

                    // 1. Check for exact match (Course_slug_name)
                    if (apiTagName === expectedExact) return true;

                    // 2. Check for exact name match (e.g. "CAMS")
                    if (apiTagName === data.courseTitle.toLowerCase()) return true;

                    // 3. Fuzzy search: Does the tag name contain a strong keyword from the course?
                    // This allows tags like just "CAMS" or "Sanctions Specialist" to work.
                    const keywordsToIgnore = ["certified", "specialist", "management", "of", "and", "the", "course"];
                    const uniqueKeywords = courseKeywords.filter(k => k.length > 3 && !keywordsToIgnore.includes(k));

                    return uniqueKeywords.some(k => apiTagName.includes(k));
                });

                if (targetTag) {
                    console.log(`[Systeme.io] Found Tag ID: ${targetTag.id}. Assigning...`);
                    // 3. Assign Tag to Contact
                    const assignResponse = await fetch(`https://api.systeme.io/api/contacts/${contactId}/tags`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-API-Key": apiKey,
                        },
                        body: JSON.stringify({
                            tagId: targetTag.id
                        }),
                    });

                    if (assignResponse.ok) {
                        console.log(`[Systeme.io] Success: Tag "${tagName}" assigned.`);
                        tagResult.assigned = true;
                    } else {
                        const assignErr = await assignResponse.text();
                        console.error("[Systeme.io] Tag assignment FAILED:", assignErr);
                        tagResult.error = assignErr;
                    }
                } else {
                    const availableTags = tagsData.items.map((t: any) => t.name).join(", ");
                    console.warn(`[Systeme.io] Tag "${tagName}" NOT FOUND. Available tags: [${availableTags}]`);
                    tagResult.error = `Tag "${tagName}" not found. Available: [${availableTags}]`;
                }
            }
        } catch (tagErr: any) {
            console.error("[Systeme.io] Tag assignment CRASHED:", tagErr);
            tagResult.error = tagErr.message;
        }

        return { ...contactData, tagSync: tagResult };
    } catch (error: any) {
        console.error("[Systeme.io] API Sync failed:", error);
        return { error: error.message };
    }
}

/**
 * Syncs a general lead (from questionnaire popup) to Systeme.io
 * Saves to custom fields and applies the 'LEADS' tag.
 */
export async function syncLeadToSystemeIO(data: {
    email: string;
    firstName: string;
    phone?: string;
    company?: string;
    courseInterest?: string;
}) {
    const apiKey = process.env.SYSTEME_IO_API_KEY;
    if (!apiKey) return;

    try {
        console.log(`[Systeme.io] Syncing lead: ${data.email}`);

        const syncAttempt = async (withCustomFields: boolean) => {
            const fields = [{ slug: "first_name", value: data.firstName }];

            if (withCustomFields) {
                if (data.phone) fields.push({ slug: "phone_number", value: data.phone });
                if (data.company) fields.push({ slug: "company_name", value: data.company });
                if (data.courseInterest) fields.push({ slug: "course_interest", value: data.courseInterest });
            }

            return await fetch("https://api.systeme.io/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": apiKey,
                },
                body: JSON.stringify({ email: data.email, fields }),
            });
        };

        // 1. First Attempt: Full Sync
        let contactResponse = await syncAttempt(true);

        // 2. Fallback: If 422 (Missing Field), try Minimal Sync
        if (contactResponse.status === 422) {
            console.warn("[Systeme.io] Custom fields missing in account. Retrying with Core Fields...");
            contactResponse = await syncAttempt(false);
        }

        let contactData;
        if (!contactResponse.ok) {
            const errText = await contactResponse.text();

            // If still failing or already exists, fetch the contact to get the ID for tagging
            const emailParam = encodeURIComponent(data.email);
            const listResponse = await fetch(`https://api.systeme.io/api/contacts?email=${emailParam}`, {
                headers: { "X-API-Key": apiKey }
            });
            const listData = await listResponse.json();
            contactData = listData.items?.find((item: any) => item.email.toLowerCase() === data.email.toLowerCase());

            console.log(`[Systeme.io] Contact lookup: ${contactData ? "FOUND" : "NOT FOUND"}`);
        } else {
            contactData = await contactResponse.json();
            console.log(`[Systeme.io] Contact Synced (ID: ${contactData.id})`);
        }

        if (!contactData) return;

        // 3. Find and Assign the "LEADS" Tag
        const tagsResponse = await fetch("https://api.systeme.io/api/tags", {
            headers: { "X-API-Key": apiKey }
        });
        const tagsData = await tagsResponse.json();
        const targetTagName = "LEADS";
        const leadsTag = tagsData.items?.find((t: any) =>
            t.name.toUpperCase().trim() === targetTagName
        );

        if (leadsTag) {
            const assignResponse = await fetch(`https://api.systeme.io/api/contacts/${contactData.id}/tags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Key": apiKey,
                },
                body: JSON.stringify({ tagId: leadsTag.id }),
            });

            if (assignResponse.ok || assignResponse.status === 400) {
                console.log(`[Systeme.io] SUCCESS: '${targetTagName}' tag applied.`);
            } else {
                console.error(`[Systeme.io] Tag assignment FAILED: ${await assignResponse.text()}`);
            }
        }
        return contactData;
    } catch (error) {
        console.error("[Systeme.io] Lead sync CRASHED:", error);
    }
}

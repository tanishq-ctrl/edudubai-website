export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    type: string;
    speaker: string;
    speakerRole: string;
    image: string;
    isLive: boolean;
    registrationUrl: string;
    startDateTime: string;
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
    const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    if (!calendarId || !apiKey) {
        console.error("Missing Google Calendar configuration");
        return [];
    }

    try {
        const now = new Date().toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&orderBy=startTime&singleEvents=true`;

        const response = await fetch(url, { next: { revalidate: 60 } }); // Sync every minute
        const data = await response.json();

        if (data.error) {
            console.error("Google Calendar API Error:", data.error.message);
            return [];
        }

        if (!data.items) {
            console.log("No upcoming events found on Google Calendar.");
            return [];
        }

        return data.items
            .filter((item: any) => {
                const desc = (item.description || "").toLowerCase();
                const title = (item.summary || "").toLowerCase();
                // ONLY show events that have a LinkedIn link or the #public tag
                return desc.includes("linkedin.com/events") || desc.includes("#public") || title.includes("#public");
            })
            .map((item: any) => {
                const description = item.description || "";

                // Better URL Extraction (prioritize LinkedIn)
                const urlMatch = description.match(/https?:\/\/(www\.)?linkedin\.com\/events\/[^\s<>"]+/i) ||
                    description.match(/https?:\/\/[^\s<>"]+/i);
                const registrationUrl = urlMatch ? urlMatch[0] : "https://www.linkedin.com/company/edudubai";

                // Improved Speaker Extraction
                const speakerMatch = description.match(/Speaker:\s*([^|\n<]+)(?:\|\s*([^|\n<]+))?/i);
                const speakerFromDesc = speakerMatch ? speakerMatch[1].trim() : "EduDubai Specialist";
                const roleFromDesc = speakerMatch && speakerMatch[2] ? speakerMatch[2].trim() : "Specialist Trainer";

                const start = new Date(item.start.dateTime || item.start.date);

                // Clean description of tags and speaker lines
                const cleanDesc = description
                    .replace(/<[^>]*>?/gm, '') // Remove HTML
                    .replace(/Speaker:[^\n]+/i, '') // Remove speaker line
                    .replace(/#\w+/g, '') // Remove hashtags
                    .trim();

                return {
                    id: item.id,
                    title: item.summary.replace("#public", "").trim(),
                    description: cleanDesc.substring(0, 160) + (cleanDesc.length > 160 ? "..." : ""),
                    date: start.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    time: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' }),
                    type: "Webinar",
                    speaker: speakerFromDesc,
                    speakerRole: roleFromDesc,
                    image: `https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?auto=format&fit=crop&q=80&w=800`,
                    isLive: false,
                    registrationUrl: registrationUrl,
                    startDateTime: item.start.dateTime || item.start.date
                };
            });
    } catch (error) {
        console.error("Error fetching Google Calendar events:", error);
        return [];
    }
}

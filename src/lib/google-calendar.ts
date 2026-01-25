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

        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        const data = await response.json();

        if (!data.items) return [];

        return data.items.map((item: any) => {
            // Parse description for potential metadata (LinkedIn URL, Speaker Name, etc.)
            const description = item.description || "";

            // Heuristic to find a URL in description
            const urlMatch = description.match(/https?:\/\/[^\s]+/);
            const registrationUrl = urlMatch ? urlMatch[0] : "https://www.linkedin.com/company/edudubai";

            // Try to extract speaker info from description if formatted as "Speaker: Name | Role"
            const speakerMatch = description.match(/Speaker:\s*([^|]+)(?:\|\s*(.+))?/i);
            const speakerFromDesc = speakerMatch ? speakerMatch[1].trim() : "EduDubai Specialist";
            const roleFromDesc = speakerMatch && speakerMatch[2] ? speakerMatch[2].trim() : "Specialist Trainer";

            const start = new Date(item.start.dateTime || item.start.date);

            return {
                id: item.id,
                title: item.summary,
                description: description.replace(/<[^>]*>?/gm, '').substring(0, 150) + "...", // Clean HTML and truncate
                date: start.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                time: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZoneName: 'short' }),
                type: "Webinar",
                speaker: speakerFromDesc,
                speakerRole: roleFromDesc,
                image: "https://images.unsplash.com/photo-1591115765373-520b7a2d7a59?auto=format&fit=crop&q=80&w=800", // Default image
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

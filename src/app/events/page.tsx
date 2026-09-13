"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { HeroShell } from "@/components/hero-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Clock, Users, ArrowRight, ExternalLink, Bell, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getUpcomingEvents, CalendarEvent } from "@/lib/google-calendar"
import { logger } from "@/lib/logger"

/*
   Height-aware measures for the blocks this page adds inside HeroShell. The
   hero contract is that everything fits between 620px and 1000px of viewport
   height at 1440px wide, so the countdown shrinks with the viewport rather
   than pushing the actions under the fold. A fixed padding or font size here
   puts that bug straight back.
*/
const COUNT_PAD = "clamp(0.55rem, 0.2rem + 1.1svh, 1rem)"
const COUNT_SIZE = "clamp(1.35rem, 0.9rem + 1.4svh, 1.85rem)"

export default function EventsPage() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [loading, setLoading] = useState(true)

    const hasCountdown =
        events.length > 0 &&
        (timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0)

    useEffect(() => {
        async function loadEvents() {
            try {
                const fetchedEvents = await getUpcomingEvents()
                setEvents(fetchedEvents)
            } catch (err) {
                logger.debug("Failed to load events:", err)
            } finally {
                setLoading(false)
            }
        }
        loadEvents()
    }, [])

    useEffect(() => {
        // Only count down to a real upcoming event. There used to be a hardcoded
        // fallback date; once it passed, the page rendered a dead 00 00 00 00.
        if (events.length === 0) return
        const nextEvent = new Date(events[0].startDateTime).getTime()

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = nextEvent - now

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                clearInterval(interval)
                return
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [events])

    return (
        <div className="min-h-screen bg-surface">
            {/*
               A flat ink field, not a gradient band with two radial blooms. The
               backdrop before that was a hardcoded images.unsplash.com URL,
               which was an external dependency on every page load.
            */}
            <HeroShell
                tone="ink"
                eyebrow="Masterclass series"
                title={
                    <>
                        The masterclass series <span className="text-crimson-ink">2026</span>
                    </>
                }
                lead="Free live sessions with practising compliance specialists on financial crime, regulatory change and supervisory expectations."
                actions={
                    <>
                        <Button variant="gold" size="lg" asChild>
                            <Link href={events.length > 0 ? events[0].registrationUrl : "#events-grid"}>
                                {events.length > 0 ? "Register for the next session" : "See the schedule"}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline-light"
                            size="lg"
                            onClick={() => document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" })}
                        >
                            <Bell className="h-4 w-4" />
                            Get session alerts
                        </Button>
                    </>
                }
            >
                {/*
                   The countdown only renders while there is something to count
                   down to. It used to fall back to a hardcoded date that has
                   since passed, so the page shipped a dead timer reading
                   00 00 00 00. Do not reintroduce a fallback date.
                */}
                {hasCountdown ? (
                    <dl className="flex flex-wrap gap-3">
                        {[
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Minutes", value: timeLeft.minutes },
                            { label: "Seconds", value: timeLeft.seconds },
                        ].map((unit) => (
                            <div
                                key={unit.label}
                                className="min-w-[5.5rem] rounded-sm border border-white/10 bg-ink-900 px-5 text-center"
                                style={{ paddingBlock: COUNT_PAD }}
                            >
                                <dd
                                    className="tabular font-display font-semibold text-content-on-dark"
                                    style={{ fontSize: COUNT_SIZE, lineHeight: 1.1 }}
                                >
                                    {unit.value.toString().padStart(2, "0")}
                                </dd>
                                <dt className="mt-1 text-2xs uppercase tracking-[0.18em] text-content-on-dark-muted">
                                    {unit.label}
                                </dt>
                            </div>
                        ))}
                    </dl>
                ) : null}
            </HeroShell>

            {/* Events Grid */}
            <section id="events-grid" className="py-section-sm">
                <Container>
                    <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="max-w-2xl space-y-4 text-left">
                            <h2 className="text-3xl tracking-tight sm:text-4xl">Upcoming sessions</h2>
                            <p className="text-[17px] leading-relaxed text-content-muted">Published from the EduDubai training calendar.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-24">
                            <Loader2 className="h-12 w-12 animate-spin text-crimson-ink" />
                            <p className="text-[17px] text-content-muted">Loading the schedule…</p>
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <Card
                                    key={event.id}
                                    className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface-raised shadow-sm transition-colors duration-slow ease-out-expo hover:border-crimson-600"
                                >
                                    <CardHeader className="relative h-56 p-0">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 22rem"
                                            className="object-cover"
                                        />
                                        {/*
                                           Amber is the signal colour and this is
                                           a genuine signal: the session is open
                                           to register for.
                                        */}
                                        <span className="absolute left-5 top-5 rounded-full bg-amber-500 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-ink-950">
                                            {event.type}
                                        </span>
                                    </CardHeader>

                                    <CardContent className="flex flex-col gap-5 p-7">
                                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-content-muted">
                                            <span className="inline-flex items-center gap-2">
                                                <Calendar aria-hidden="true" className="h-3.5 w-3.5 text-crimson-ink" />
                                                {event.date}
                                            </span>
                                            <span className="inline-flex items-center gap-2">
                                                <Clock aria-hidden="true" className="h-3.5 w-3.5 text-crimson-ink" />
                                                {event.time}
                                            </span>
                                        </div>

                                        <h3 className="line-clamp-3 text-xl leading-snug tracking-tight">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-4 border-t border-line pt-5">
                                            <span
                                                aria-hidden="true"
                                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-line bg-surface-sunken"
                                            >
                                                <Users className="h-5 w-5 text-content-subtle" />
                                            </span>
                                            <div className="min-w-0">
                                                <div className="text-[15px] font-semibold text-content-strong">{event.speaker}</div>
                                                <div className="text-[15px] text-content-muted">{event.speakerRole}</div>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="mt-auto p-7 pt-0">
                                        <Button variant="outline" className="w-full" asChild>
                                            <Link href={event.registrationUrl} target="_blank">
                                                Register for this session
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-sm border border-line bg-surface-sunken px-8 py-20 text-center">
                            <div className="mx-auto max-w-md space-y-4">
                                <Calendar aria-hidden="true" className="mx-auto h-12 w-12 text-content-subtle" />
                                <h3 className="text-2xl tracking-tight">No sessions scheduled yet</h3>
                                <p className="text-[17px] leading-relaxed text-content-muted">The next set of sessions is being scheduled. Subscribe below and we will send the dates as soon as they are published.</p>
                                <Button
                                    variant="gold"
                                    size="lg"
                                    className="mt-4"
                                    onClick={() => document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    Subscribe for dates
                                </Button>
                            </div>
                        </div>
                    )}
                </Container>
            </section>

            {/* Newsletter/Alerts Section */}
            <section id="newsletter-section" className="relative isolate overflow-hidden bg-ink-950 py-section-sm grain">
                <Container>
                    <div className="relative z-10 mx-auto max-w-3xl space-y-10 text-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl tracking-tight text-content-on-dark sm:text-4xl">
                                Session alerts
                            </h2>
                            <p className="mx-auto max-w-measure text-[17px] leading-relaxed text-content-on-dark-muted">
                                Receive the calendar invitation and background material the day before each session.
                            </p>
                        </div>

                        <div className="mx-auto flex max-w-lg flex-col gap-3 sm:flex-row">
                            <label htmlFor="alerts-email" className="sr-only">
                                Work email address
                            </label>
                            <input
                                id="alerts-email"
                                type="email"
                                placeholder="Your work email"
                                className="h-12 flex-1 rounded-sm border border-white/10 bg-ink-900 px-5 text-[17px] text-content-on-dark placeholder:text-content-on-dark-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                            />
                            <Button variant="gold" size="lg" className="whitespace-nowrap">
                                Notify me
                            </Button>
                        </div>

                        <p className="text-2xs font-semibold uppercase tracking-[0.22em] text-content-on-dark-muted">
                            For finance and compliance professionals. No spam.
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    )
}

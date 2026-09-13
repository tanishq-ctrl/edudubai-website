"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, ArrowRight, Video, ExternalLink, Bell, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getUpcomingEvents, CalendarEvent } from "@/lib/google-calendar"
import { logger } from "@/lib/logger"

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
               Midnight band rather than a remote photograph. The backdrop was a
               hardcoded images.unsplash.com URL, which is both an external
               dependency on every page load and a red-cast image on a navy and
               gold site.
            */}
            <section className="relative isolate overflow-hidden bg-gradient-to-b from-navy-900 to-ink-975 py-section-sm text-white grain">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -left-40 -top-48 h-[42rem] w-[42rem] bloom-gold" />
                    <div className="absolute -right-32 top-56 h-[46rem] w-[46rem] bloom-navy" />
                </div>

                <Container className="relative z-20">
                    <div className="max-w-measure-lg">
                        <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.25rem]">
                            The masterclass series{" "}
                            <span className="text-gold-400">2026</span>
                        </h1>
                        <p className="mt-6 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
                            Free live sessions with practising compliance specialists on financial
                            crime, regulatory change and supervisory expectations.
                        </p>

                        {/*
                           The countdown only renders while there is something to
                           count down to. It used to fall back to a hardcoded date
                           that has since passed, so the page shipped a dead timer
                           reading 00 00 00 00.
                        */}
                        {hasCountdown ? (
                            <dl className="mt-9 flex flex-wrap gap-3">
                                {[
                                    { label: "Days", value: timeLeft.days },
                                    { label: "Hours", value: timeLeft.hours },
                                    { label: "Minutes", value: timeLeft.minutes },
                                    { label: "Seconds", value: timeLeft.seconds },
                                ].map((unit) => (
                                    <div
                                        key={unit.label}
                                        className="panel-dark min-w-[5.5rem] rounded-lg px-5 py-4 text-center"
                                    >
                                        <dd className="tabular font-display text-3xl font-semibold text-white">
                                            {unit.value.toString().padStart(2, "0")}
                                        </dd>
                                        <dt className="mt-1 text-2xs uppercase tracking-[0.18em] text-white/60">
                                            {unit.label}
                                        </dt>
                                    </div>
                                ))}
                            </dl>
                        ) : null}

                        <div className="mt-9 flex flex-wrap gap-3">
                            <Button variant="gold" size="xl" asChild>
                                <Link href={events.length > 0 ? events[0].registrationUrl : "#events-grid"}>
                                    {events.length > 0 ? "Register for the next session" : "See the schedule"}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline-light"
                                size="xl"
                                onClick={() => document.getElementById("newsletter-section")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <Bell className="h-4 w-4" />
                                Get session alerts
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Events Grid */}
            <section id="events-grid" className="py-section-sm">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl space-y-4 text-left">
                            <h2 className="text-3xl tracking-tight sm:text-4xl">Upcoming sessions</h2>
                            <p className="text-[17px] leading-relaxed text-content-muted">Published from the EduDubai training calendar.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-24">
                            <Loader2 className="h-12 w-12 animate-spin text-gold-mark" />
                            <p className="text-[17px] text-content-muted">Loading the schedule…</p>
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <Card
                                    key={event.id}
                                    className="group h-full overflow-hidden rounded-lg border border-line bg-surface-raised shadow-sm transition-all duration-slow ease-out-expo hover:-translate-y-1.5 hover:border-gold-400/55 hover:shadow-lg"
                                >
                                    <CardHeader className="p-0 relative h-64">
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                                            <Badge className="bg-white/90 text-navy-700 border-0 font-semibold px-3 py-1 uppercase text-2xs tracking-wider rounded-lg shadow-sm">
                                                {event.type}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="flex items-center gap-4 text-content-muted text-xs font-medium">
                                            <div className="flex items-center gap-2 bg-surface-sunken px-3 py-1.5 rounded-lg border border-line">
                                                <Calendar className="h-3.5 w-3.5 text-gold-mark" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-2 bg-surface-sunken px-3 py-1.5 rounded-lg border border-line">
                                                <Clock className="h-3.5 w-3.5 text-gold-mark" />
                                                {event.time}
                                            </div>
                                        </div>

                                        <h3 className="text-xl leading-snug tracking-tight min-h-[3.5rem] group-hover:text-gold-ink transition-colors line-clamp-3">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-4 pt-4 border-t border-line">
                                            <div className="h-12 w-12 rounded-lg bg-navy-900/5 flex items-center justify-center overflow-hidden border border-navy-700/10">
                                                <Users className="h-6 w-6 text-navy-700/40" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-navy-700">{event.speaker}</div>
                                                <div className="text-2xs font-bold text-content-muted">{event.speakerRole}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-8 pt-0">
                                        <Button className="w-full h-14 bg-surface hover:bg-navy-900 hover:text-white text-navy-700 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-sm group-hover:shadow-md" asChild>
                                            <Link href={event.registrationUrl} target="_blank">
                                                Access Credentials <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-line bg-surface-sunken px-8 py-20 text-center">
                            <div className="max-w-md mx-auto space-y-4">
                                <Calendar className="h-16 w-16 text-neutral-border mx-auto" />
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
                <div className="absolute top-0 right-0 w-[600px] h-[600px] orb [--orb:rgb(var(--gold-400)/0.1)] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb [--orb:rgb(var(--navy-600)/0.2)] -ml-32 -mb-32" />

                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl tracking-tight text-white sm:text-4xl">
                                Session alerts
                            </h2>
                            <p className="mx-auto max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
                                Receive the calendar invitation and background material the day before each session.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter Professional Email..."
                                className="flex-1 h-16 px-8 bg-white/10 border border-white/10 rounded-lg text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-all"
                            />
                            <Button className="h-16 px-10 bg-gold-400 text-navy-700 hover:bg-gold-300 font-semibold text-lg rounded-lg whitespace-nowrap shadow-xl hover:shadow-brand-gold/20">
                                Sync Me
                            </Button>
                        </div>
                        <p className="text-2xs font-semibold uppercase tracking-[0.3em] text-white/30">
                            Strictly for Finance & Compliance Professionals • No Spam
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    )
}

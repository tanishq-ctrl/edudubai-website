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

export default function EventsPage() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [events, setEvents] = useState<CalendarEvent[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadEvents() {
            try {
                const fetchedEvents = await getUpcomingEvents()
                setEvents(fetchedEvents)
            } catch (err) {
                console.error("Failed to load events:", err)
            } finally {
                setLoading(false)
            }
        }
        loadEvents()
    }, [])

    useEffect(() => {
        // Use the first event as the target for the countdown
        const nextEvent = events.length > 0 ? new Date(events[0].startDateTime).getTime() : new Date("2026-02-15T10:00:00").getTime()

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
            {/* Hero Section with Countdown */}
            <section className="relative overflow-hidden bg-navy-900 py-24 lg:py-32">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800/95 to-transparent z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        fill
                        className="object-cover opacity-30"
                    />
                </div>

                <Container className="relative z-20 text-white">
                    <div className="max-w-3xl space-y-8">
                        <div>
                            <Badge className="mb-4 bg-gold-400 text-navy-700 hover:bg-gold-300 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
                                Global Signature Event
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-semibold tracking-tight leading-tight uppercase">
                                The Masterclass <br />
                                <span className="text-gold-ink">Series 2026</span>
                            </h1>
                            <p className="mt-6 text-xl text-white/70 max-w-xl font-medium leading-relaxed">
                                Join the world&apos;s leading compliance specialists for a series of exclusive, free webinars on financial crime, regulatory news, and tech innovation.
                            </p>
                        </div>

                        {/* Countdown Grid */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Mins", value: timeLeft.minutes },
                                { label: "Secs", value: timeLeft.seconds },
                            ].map((unit, i) => (
                                <div key={i} className="bg-white/15 border border-white/20 rounded-lg p-6 min-w-[100px] text-center transition-all hover:bg-white/20">
                                    <div className="text-4xl font-semibold text-gold-ink">{unit.value.toString().padStart(2, '0')}</div>
                                    <div className="text-2xs uppercase font-bold tracking-widest text-white/50">{unit.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button
                                size="lg"
                                className="h-16 px-10 bg-gold-400 text-navy-700 hover:bg-gold-300 font-semibold text-lg rounded-lg shadow-xl transition-all hover:scale-105 active:scale-95"
                                asChild
                            >
                                <Link href={events.length > 0 ? events[0].registrationUrl : "#events-grid"}>
                                    Join Next Masterclass <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => document.getElementById('newsletter-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="h-16 px-10 border-white/30 text-white hover:bg-white/10 font-semibold text-lg rounded-lg transition-all hover:border-white/60 active:scale-95"
                            >
                                Subscribe to Alerts <Bell className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* LinkedIn Live Sync Badge */}
            <div className="bg-navy-900/5 border-y border-line py-4">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0077b5] fill-current">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-navy-700">
                                <span className="text-gold-ink uppercase tracking-wider">Live Bridge Active</span> • Your specialist calendar is now synced with Google & LinkedIn.
                            </p>
                        </div>
                        <Button variant="link" className="text-navy-700 font-semibold text-xs uppercase tracking-widest p-0 h-auto underline decoration-2 underline-offset-4" asChild>
                            <Link href="https://linkedin.com/company/edudubai" target="_blank">Follow on LinkedIn</Link>
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Events Grid */}
            <section id="events-grid" className="py-24 lg:py-32">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl space-y-4 text-left">
                            <h2 className="text-4xl font-semibold text-navy-700 tracking-tight uppercase">Upcoming <span className="text-gold-ink">Engagements</span></h2>
                            <p className="text-content-muted font-medium italic">Automatically updated from your specialist calendar.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-gold-mark" />
                            <p className="text-navy-700 font-semibold uppercase tracking-widest text-sm">Syncing with Google Calendar...</p>
                        </div>
                    ) : events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map((event) => (
                                <Card key={event.id} className="group border-0 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_48px_80px_-24px_rgba(0,0,0,0.12)] border-b-4 border-b-transparent hover:border-b-brand-gold">
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
                                        <div className="flex items-center gap-4 text-content-muted text-xs font-bold uppercase tracking-widest">
                                            <div className="flex items-center gap-2 bg-surface-sunken px-3 py-1.5 rounded-lg border border-line">
                                                <Calendar className="h-3.5 w-3.5 text-gold-mark" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-2 bg-surface-sunken px-3 py-1.5 rounded-lg border border-line">
                                                <Clock className="h-3.5 w-3.5 text-gold-mark" />
                                                {event.time}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-semibold text-navy-700 leading-tight tracking-tight min-h-[3.5rem] group-hover:text-gold-ink transition-colors line-clamp-3 uppercase">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-4 pt-4 border-t border-line">
                                            <div className="h-12 w-12 rounded-lg bg-navy-900/5 flex items-center justify-center overflow-hidden border border-navy-700/10">
                                                <Users className="h-6 w-6 text-navy-700/40" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-semibold uppercase text-navy-700">{event.speaker}</div>
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
                        <div className="text-center py-32 bg-surface-sunken rounded-[3rem] border-2 border-dashed border-line">
                            <div className="max-w-md mx-auto space-y-4">
                                <Calendar className="h-16 w-16 text-neutral-border mx-auto" />
                                <h3 className="text-2xl font-semibold text-navy-700 uppercase tracking-tight">New Masterclasses Loading</h3>
                                <p className="text-content-muted font-medium">We are currently curating the next set of specialist webinars. Subscribe below to be the first to know.</p>
                                <Button className="bg-gold-400 text-navy-700 hover:bg-gold-300 font-semibold px-8 py-6 rounded-lg shadow-lg mt-4">
                                    Notify Available Slots
                                </Button>
                            </div>
                        </div>
                    )}
                </Container>
            </section>

            {/* Newsletter/Alerts Section */}
            <section id="newsletter-section" className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] orb [--orb:rgb(var(--gold-400)/0.1)] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] orb [--orb:rgb(var(--navy-600)/0.2)] -ml-32 -mb-32" />

                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-6xl font-semibold text-white tracking-tight leading-none uppercase">
                                Never Miss a <br />
                                <span className="text-gold-ink">Global Session</span>
                            </h2>
                            <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                Subscribe to our specialist alert system to receive calendar invites and background materials 24 hours before we go live.
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

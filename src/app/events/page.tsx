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
        <div className="min-h-screen bg-neutral-bg">
            {/* Hero Section with Countdown */}
            <section className="relative overflow-hidden bg-brand-navy py-24 lg:py-32">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-transparent z-10" />
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
                            <Badge className="mb-4 bg-brand-gold text-brand-navy hover:bg-brand-gold-light px-4 py-1 text-xs font-black uppercase tracking-widest">
                                Global Signature Event
                            </Badge>
                            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight uppercase">
                                The Masterclass <br />
                                <span className="text-brand-gold">Series 2026</span>
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
                                <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[100px] text-center transition-all hover:bg-white/20">
                                    <div className="text-4xl font-black text-brand-gold">{unit.value.toString().padStart(2, '0')}</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/50">{unit.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="h-16 px-10 bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-black text-lg rounded-2xl shadow-lg ring-offset-brand-navy focus:ring-brand-gold">
                                Join Next Masterclass <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-10 border-white/20 text-white hover:bg-white/10 font-black text-lg rounded-2xl transition-all">
                                Subscribe to Alerts <Bell className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            {/* LinkedIn Live Sync Badge */}
            <div className="bg-brand-navy/5 border-y border-neutral-border py-4">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0077b5] fill-current">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <p className="text-sm font-bold text-brand-navy">
                                <span className="text-brand-gold uppercase tracking-wider">Live Bridge Active</span> • Your specialist calendar is now synced with Google & LinkedIn.
                            </p>
                        </div>
                        <Button variant="link" className="text-brand-navy font-black text-xs uppercase tracking-widest p-0 h-auto underline decoration-2 underline-offset-4" asChild>
                            <Link href="https://linkedin.com/company/edudubai" target="_blank">Follow on LinkedIn</Link>
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Events Grid */}
            <section className="py-24 lg:py-32">
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div className="max-w-2xl space-y-4 text-left">
                            <h2 className="text-4xl font-black text-brand-navy tracking-tight uppercase">Upcoming <span className="text-brand-gold">Engagements</span></h2>
                            <p className="text-neutral-text-muted font-medium italic">Automatically updated from your specialist calendar.</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 space-y-4">
                            <Loader2 className="h-12 w-12 animate-spin text-brand-gold" />
                            <p className="text-brand-navy font-black uppercase tracking-widest text-sm">Syncing with Google Calendar...</p>
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
                                            <Badge className="bg-white/90 backdrop-blur-md text-brand-navy border-0 font-black px-3 py-1 uppercase text-[10px] tracking-wider rounded-lg shadow-sm">
                                                {event.type}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="flex items-center gap-4 text-neutral-text-muted text-xs font-bold uppercase tracking-widest">
                                            <div className="flex items-center gap-2 bg-neutral-bg-subtle px-3 py-1.5 rounded-lg border border-neutral-border/50">
                                                <Calendar className="h-3.5 w-3.5 text-brand-gold" />
                                                {event.date}
                                            </div>
                                            <div className="flex items-center gap-2 bg-neutral-bg-subtle px-3 py-1.5 rounded-lg border border-neutral-border/50">
                                                <Clock className="h-3.5 w-3.5 text-brand-gold" />
                                                {event.time}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-brand-navy leading-tight tracking-tight min-h-[3.5rem] group-hover:text-brand-gold transition-colors line-clamp-3 uppercase">
                                            {event.title}
                                        </h3>

                                        <div className="flex items-center gap-4 pt-4 border-t border-neutral-border/50">
                                            <div className="h-12 w-12 rounded-2xl bg-brand-navy/5 flex items-center justify-center overflow-hidden border border-brand-navy/10">
                                                <Users className="h-6 w-6 text-brand-navy/40" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-black uppercase text-brand-navy">{event.speaker}</div>
                                                <div className="text-[10px] font-bold text-neutral-text-muted">{event.speakerRole}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-8 pt-0">
                                        <Button className="w-full h-14 bg-neutral-bg hover:bg-brand-navy hover:text-white text-brand-navy font-black rounded-2xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm group-hover:shadow-md" asChild>
                                            <Link href={event.registrationUrl} target="_blank">
                                                Access Credentials <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-neutral-bg-subtle rounded-[3rem] border-2 border-dashed border-neutral-border">
                            <div className="max-w-md mx-auto space-y-4">
                                <Calendar className="h-16 w-16 text-neutral-border mx-auto" />
                                <h3 className="text-2xl font-black text-brand-navy uppercase tracking-tight">New Masterclasses Loading</h3>
                                <p className="text-neutral-text-muted font-medium">We are currently curating the next set of specialist webinars. Subscribe below to be the first to know.</p>
                                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-black px-8 py-6 rounded-2xl shadow-lg mt-4">
                                    Notify Available Slots
                                </Button>
                            </div>
                        </div>
                    )}
                </Container>
            </section>

            {/* Newsletter/Alerts Section */}
            <section className="py-24 lg:py-32 bg-brand-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                <Container>
                    <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-none uppercase">
                                Never Miss a <br />
                                <span className="text-brand-gold">Global Session</span>
                            </h2>
                            <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                Subscribe to our specialist alert system to receive calendar invites and background materials 24 hours before we go live.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter Professional Email..."
                                className="flex-1 h-16 px-8 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                            />
                            <Button className="h-16 px-10 bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-black text-lg rounded-2xl whitespace-nowrap shadow-xl hover:shadow-brand-gold/20">
                                Sync Me
                            </Button>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                            Strictly for Finance & Compliance Professionals • No Spam
                        </p>
                    </div>
                </Container>
            </section>
        </div>
    )
}

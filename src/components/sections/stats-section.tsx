"use client"

import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Sessions Delivered", value: 850, suffix: "+" },
  { label: "Learners Trained", value: 2500, suffix: "+" },
  { label: "Countries", value: 12, suffix: "+" },
  { label: "Certifications", value: 8, suffix: "+" },
]

export function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            stats.forEach((stat, index) => {
              const duration = 2000
              const steps = 60
              const increment = stat.value / steps
              const stepDuration = duration / steps

              let current = 0
              const timer = setInterval(() => {
                current += increment
                if (current >= stat.value) {
                  setCounts((prev) => {
                    const newCounts = [...prev]
                    newCounts[index] = stat.value
                    return newCounts
                  })
                  clearInterval(timer)
                } else {
                  setCounts((prev) => {
                    const newCounts = [...prev]
                    newCounts[index] = Math.floor(current)
                    return newCounts
                  })
                }
              }, stepDuration)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById("stats-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasAnimated])

  return (
    <section id="stats-section" className="py-10 md:py-12 bg-gradient-to-br from-neutral-bg-subtle via-slate-50 to-neutral-bg relative overflow-hidden">
      {/* Subtle brand-aligned gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/5 via-transparent to-brand-gold/5"></div>
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const colorGradients = [
              "from-brand-navy to-brand-navy-light",
              "from-brand-gold-dark to-brand-gold",
              "from-brand-navy-light to-brand-navy",
              "from-brand-gold to-brand-gold-light",
            ]
            const borderColors = [
              "hover:border-brand-navy/40",
              "hover:border-brand-gold/40",
              "hover:border-brand-navy/40",
              "hover:border-brand-gold/40",
            ]
            const shadowColors = [
              "hover:shadow-brand-navy/10",
              "hover:shadow-brand-gold/20",
              "hover:shadow-brand-navy/10",
              "hover:shadow-brand-gold/20",
            ]
            return (
              <Card key={stat.label} className={`border-2 border-neutral-border/50 ${borderColors[index]} transition-all duration-300 hover:shadow-2xl ${shadowColors[index]} bg-gradient-to-br from-white via-white/95 to-slate-50/80 backdrop-blur-sm hover:scale-105`}>
                <CardContent className="py-4 md:py-6 text-center">
                  <div className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-br ${colorGradients[index]} bg-clip-text text-transparent mb-2`}>
                    {counts[index].toLocaleString()}
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base text-neutral-text-muted font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}


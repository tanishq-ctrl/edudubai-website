"use client"

import { useEffect, useState } from "react"
import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Sessions Delivered", value: 5000, suffix: "+" },
  { label: "Learners Trained", value: 10000, suffix: "+" },
  { label: "Countries", value: 50, suffix: "+" },
  { label: "Certifications", value: 25, suffix: "+" },
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
    <section id="stats-section" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-blue-50/60 to-indigo-50/80 relative overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-indigo-100/20"></div>
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const colorGradients = [
              "from-indigo-600 to-purple-600",
              "from-blue-600 to-cyan-600",
              "from-emerald-600 to-teal-600",
              "from-amber-600 to-orange-600",
            ]
            const borderColors = [
              "hover:border-indigo-400",
              "hover:border-blue-400",
              "hover:border-emerald-400",
              "hover:border-amber-400",
            ]
            const shadowColors = [
              "hover:shadow-indigo-200/30",
              "hover:shadow-blue-200/30",
              "hover:shadow-emerald-200/30",
              "hover:shadow-amber-200/30",
            ]
            return (
              <Card key={stat.label} className={`border-2 border-neutral-border/50 ${borderColors[index]} transition-all duration-300 hover:shadow-2xl ${shadowColors[index]} bg-gradient-to-br from-white via-white/95 to-slate-50/80 backdrop-blur-sm hover:scale-105`}>
                <CardContent className="pt-6 text-center">
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


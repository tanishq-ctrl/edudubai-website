import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye } from "lucide-react"

export function AboutMissionVision() {
  return (
    <section className="mb-16 md:mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-neutral-border hover:border-brand-gold transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-gold/10 rounded-lg">
                <Target className="h-6 w-6 text-brand-gold" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-text leading-relaxed">
              To transform careers through premium professional education. We provide 
              cutting-edge courses, industry-recognized certifications, and corporate 
              training solutions that drive real-world impact and measurable results.
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-neutral-border hover:border-brand-gold transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-navy/10 rounded-lg">
                <Eye className="h-6 w-6 text-brand-navy" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-text leading-relaxed">
              To become the leading professional education platform in the Middle East, 
              recognized for excellence in compliance, risk management, and finance 
              training. We envision a future where every professional has access to 
              world-class education that accelerates their career.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


import Link from "next/link"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Building2, ArrowRight } from "lucide-react"

export function CorporateCTASection() {
  return (
    <section className="py-12 md:py-14 bg-gradient-to-r from-brand-navy to-brand-navy-dark text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-gold/20 p-4 rounded-full">
              <Building2 className="h-12 w-12 text-brand-gold" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Transform Your Organization with Corporate Training
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Customized training solutions designed to upskill your workforce,
            drive innovation, and achieve measurable business results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="xl"
              variant="gold"
              className="group"
            >
              <Link href="/corporate-training">
                Explore Corporate Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="/contact">Request a Proposal</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}


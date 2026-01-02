import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { WhatsAppButton } from "@/components/whatsapp-button"

export function HeroSection() {
  return (
    <section className="relative min-h-[700px] md:min-h-[800px] flex items-center bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy-dark text-white overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0ibTIwIDIwLTIwIDIwIDIwIDIwIDIwLTIweiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAzIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] bg-cover bg-center" />
        </div>
      </div>
      
      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Transform Your Career with
            <span className="block mt-2 text-brand-gold">Premium Professional Education</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Join thousands of professionals advancing their careers with world-class courses, 
            industry-recognized certifications, and expert-led training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy hover:from-brand-gold-light hover:to-brand-gold font-semibold px-10 py-7 text-lg shadow-2xl shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all hover:scale-105"
            >
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <WhatsAppButton
              source="hero"
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/50 text-white hover:bg-white/20 hover:border-white px-10 py-7 text-lg transition-all hover:scale-105"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}


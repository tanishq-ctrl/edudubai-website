import { Container } from "@/components/container"

interface PolicyHeroProps {
  title: string
  lastUpdated?: string
}

export function PolicyHero({ title, lastUpdated }: PolicyHeroProps) {
  return (
    <section className="bg-gradient-to-b from-neutral-bg to-white border-b border-neutral-border pt-32 pb-12 md:pt-36 md:pb-16">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-4">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-neutral-text-muted">{lastUpdated}</p>
          )}
        </div>
      </Container>
    </section>
  )
}


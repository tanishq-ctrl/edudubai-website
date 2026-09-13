import { Container } from "@/components/container"
import { Reveal } from "@/components/motion"

/**
 * The standard head for a secondary page.
 *
 * `PageHeroImage` centres copy over a full-bleed photograph. That is the
 * template every page used to share, and the reason the site read as one
 * repeated layout -- the /about rebuild moved away from it first. The
 * photographs it carried were also doing no work: an empty boardroom on the
 * newsroom, a smiling headset operator on contact.
 *
 * This is the same Midnight band the rest of the site now opens on, without a
 * photograph to fight the copy for contrast. Pages that genuinely have a
 * picture worth showing still compose their own hero.
 */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-navy-900 to-ink-975 py-section-sm text-white grain">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-48 h-[42rem] w-[42rem] bloom-gold" />
        <div className="absolute -right-32 top-56 h-[46rem] w-[46rem] bloom-navy" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-measure-lg">
          <Reveal variant="up">
            <h1 className="text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl">
              {title}
            </h1>
          </Reveal>

          {description ? (
            <Reveal variant="up" delay={80}>
              <p className="mt-6 max-w-measure text-lg leading-relaxed text-content-on-dark-muted">
                {description}
              </p>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal variant="fade" delay={150}>
              {children}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

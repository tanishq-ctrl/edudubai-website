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
 * This is the same flat ink band the rest of the site now opens on, without a
 * photograph to fight the copy for contrast. Pages that genuinely have a
 * picture worth showing still compose their own hero, over HeroShell.
 *
 * The band is a FLAT field with a crimson rule under it. It used to be a navy
 * gradient carrying two radial "bloom" glows; that combination -- light with
 * no source over a colour with no edge -- was the strongest generated-looking
 * thing on the site. Do not put either back.
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
    <section className="relative isolate overflow-hidden bg-ink-950 py-section-sm text-content-on-dark grain">
      <Container className="relative z-10">
        <div className="max-w-measure">
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

      {/* The band ends on a rule, not a fade. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-crimson-600" />
    </section>
  )
}

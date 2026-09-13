import Image from "next/image"

import { Section } from "@/components/section"
import { Reveal, Stagger } from "@/components/motion"

/**
 * Credentials strip.
 *
 * The seals in `public/images/badges` were sitting unused while the page made
 * its accreditation claim in prose only. They are gold on transparent, so they
 * need a light disc to sit on and a dark band behind that. The disc keeps its
 * round shape: a seal is one of the few places a circle carries meaning.
 *
 * This is a credential moment, which is the only role gold holds in the
 * palette. The drop shadow the discs used to carry has gone; a flat disc on a
 * flat dark field needs no lift.
 */
const seals = [
  { code: "CAMS", src: "/images/badges/cams-seal.png", alt: "CAMS exam preparation seal" },
  { code: "CGSS", src: "/images/badges/cgss-seal.png", alt: "CGSS exam preparation seal" },
  { code: "TBML", src: "/images/badges/tbml-seal.png", alt: "TBML exam preparation seal" },
]

export function AboutCredentials() {
  return (
    <Section tone="ink" size="sm">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
        <Reveal variant="up">
          <div className="max-w-measure-sm">
            <h2 className="text-3xl tracking-tight text-content-on-dark">Recognised credentials</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-content-on-dark-muted">
              Programmes map to ACAMS, GCI and partner-body certifications, the credentials
              regulators already recognise.
            </p>
          </div>
        </Reveal>

        <Stagger className="flex flex-wrap items-center gap-6" step={90} variant="scale">
          {seals.map((seal) => (
            <div
              key={seal.code}
              className="relative h-[8.5rem] w-[8.5rem] rounded-full bg-surface-raised p-3.5"
            >
              <Image
                src={seal.src}
                alt={seal.alt}
                fill
                sizes="136px"
                className="object-contain p-3.5"
              />
            </div>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}

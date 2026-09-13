import { Award, BookOpen, Building2, Users } from "lucide-react"

import { Section, SectionHeading } from "@/components/section"
import { Counter, Stagger } from "@/components/motion"

const credibilityBlocks = [
  {
    icon: Users,
    value: 2500,
    suffix: "+",
    label: "Certified specialists",
    description: "Professionals trained and certified through our programmes.",
  },
  {
    icon: Award,
    value: 8,
    suffix: "+",
    label: "Elite certifications",
    description: "Industry-recognised credentials issued by ACAMS, GCI and partner bodies.",
  },
  {
    icon: Building2,
    value: 850,
    suffix: "+",
    label: "Professional sessions",
    description: "Sessions delivered across international financial markets.",
  },
  {
    icon: BookOpen,
    value: 12,
    suffix: "+",
    label: "Global jurisdictions",
    description: "Professionals served across international regulatory jurisdictions.",
  },
]

export function AboutCredibility() {
  return (
    <Section tone="ink" size="md" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-0 h-[26rem] w-[26rem] orb [--orb:rgb(var(--navy-700)/0.25)]" />
        <div className="absolute -left-24 bottom-0 h-80 w-80 orb [--orb:rgb(var(--gold-400)/0.08)]" />
      </div>

      <SectionHeading
        onDark
        eyebrow="Track record"
        title="Institutional track record"
        lead="Eight years of delivery to regulated institutions across twelve jurisdictions."
      />

      <Stagger className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" step={110}>
        {credibilityBlocks.map((block) => {
          const Icon = block.icon
          return (
            <div key={block.label} className="group flex min-w-0 flex-col">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-gold-300 transition-transform duration-slow ease-out-expo group-hover:-translate-y-1"
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="mt-6 font-display text-3xl leading-none text-white sm:text-4xl">
                <Counter value={block.value} suffix={block.suffix} />
              </span>
              <span className="mt-3 text-sm font-semibold text-white/90">{block.label}</span>
              <span className="mt-1.5 text-sm leading-relaxed text-white/50">
                {block.description}
              </span>
            </div>
          )
        })}
      </Stagger>
    </Section>
  )
}

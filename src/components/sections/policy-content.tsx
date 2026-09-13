import { Section } from "@/components/section"
import { Reveal } from "@/components/motion"

interface PolicySection {
  title: string
  content: string[]
}

interface PolicyContentProps {
  sections: PolicySection[]
}

/**
 * Long-form policy body.
 *
 * Rendered as a single readable column with numbered headings rather than a
 * stack of cards -- policy text is read sequentially, and card chrome between
 * every clause fights that.
 */
export function PolicyContent({ sections }: PolicyContentProps) {
  return (
    <Section tone="paper" size="md">
      <div className="mx-auto max-w-3xl">
        {sections.map((section, index) => (
          <Reveal
            key={section.title}
            variant="up"
            delay={Math.min(index * 60, 240)}
            as="section"
            className="border-b border-line py-10 first:pt-0 last:border-0 last:pb-0"
          >
            <h2 className="flex items-baseline gap-4 text-xl ">
              <span
                aria-hidden="true"
                className="shrink-0 font-sans text-2xs font-semibold tabular tracking-widest text-gold-ink"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </h2>

            <div className="mt-5 flex flex-col gap-4 pl-0 sm:pl-10">
              {section.content.map((paragraph, pIndex) => (
                <p
                  key={pIndex}
                  className="leading-relaxed text-content-muted [&_a]:text-navy-700 [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-content-strong"
                  // Policy copy ships with inline markup (links, emphasis) and
                  // is authored in-repo, not user-supplied.
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

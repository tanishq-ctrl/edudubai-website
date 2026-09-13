import { Clock, Mail, MessageCircle, Phone } from "lucide-react"

import { WhatsAppButton } from "@/components/whatsapp-button"
import { Reveal } from "@/components/motion"

const phones = [
  { region: "India", display: "+91 96656 42862", href: "tel:+919665642862" },
  { region: "MENA", display: "+971 50 3130 946", href: "tel:+971503130946" },
]

const responseTimes = [
  { channel: "Email", time: "Within 24 hours" },
  { channel: "WhatsApp", time: "Same business day" },
  { channel: "Phone", time: "During office hours" },
]

export function ContactInfo() {
  return (
    <div className="flex flex-col gap-5">
      <Reveal variant="up">
        <div className="rounded-sm border border-line bg-surface-raised p-7 shadow-sm">
          <h2 className="text-xl tracking-tight">Contact details</h2>

          <ul className="mt-7 flex flex-col gap-7">
            <li className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-600"
              >
                <Mail className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-content-strong">Email</p>
                <a
                  href="mailto:training@edudubai.org"
                  className="mt-1 block break-all text-[15px] text-content-muted transition-colors hover:text-crimson-600"
                >
                  training@edudubai.org
                </a>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-600"
              >
                <Phone className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-content-strong">Phone</p>
                <ul className="mt-2 flex flex-col gap-2">
                  {phones.map((p) => (
                    <li key={p.region}>
                      <a
                        href={p.href}
                        className="flex items-center gap-2.5 text-sm text-content-muted transition-colors hover:text-crimson-600"
                      >
                        <span className="rounded border border-line px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-content-subtle">
                          {p.region}
                        </span>
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-50 text-crimson-600"
              >
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-content-strong">Office hours</p>
                <p className="mt-1 text-sm leading-relaxed text-content-muted">
                  Monday to Friday
                  <br />
                  9:00 am to 6:00 pm GST
                  <br />
                  <span className="text-content-subtle">Saturday &amp; Sunday closed</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </Reveal>

      <Reveal variant="up" delay={110}>
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-ink-950 p-7 text-content-on-dark grain">
          <h2 className="text-xl tracking-tight text-content-on-dark">Speak to an advisor now</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-content-on-dark-muted">
            Speak with an advisor directly for immediate assistance with programme selection.
          </p>
          <WhatsAppButton source="contact_page" variant="outline-light" className="mt-6 w-full">
            Message an advisor
          </WhatsAppButton>
        </div>
      </Reveal>

      <Reveal variant="up" delay={200}>
        <div className="rounded-sm border border-line bg-surface-raised p-7 shadow-sm">
          <h2 className="text-xl tracking-tight">Response times</h2>
          <dl className="mt-6 flex flex-col gap-3.5">
            {responseTimes.map((item) => (
              <div
                key={item.channel}
                className="flex items-center justify-between gap-4 border-b border-line pb-3.5 last:border-0 last:pb-0"
              >
                <dt className="flex items-center gap-2 text-sm text-content-muted">
                  <MessageCircle aria-hidden="true" className="h-3.5 w-3.5 text-crimson-ink" />
                  {item.channel}
                </dt>
                <dd className="text-sm font-medium text-content-strong">{item.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </div>
  )
}

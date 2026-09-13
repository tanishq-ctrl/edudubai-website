import { MapPin, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { DeliveryMode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DeliveryFormatBadgeProps {
  format: DeliveryMode
  className?: string
}

/**
 * Delivery format chip.
 *
 * "Live virtual" is a live/open signal, so it is the one place in this
 * component that earns amber. Amber is a signal colour only: it must never be
 * used decoratively, and in-person carries no signal, so it stays neutral.
 * The chip is rendered on the dark course hero, hence the dark-ground steps.
 */
const config: Record<
  DeliveryMode,
  { label: string; icon: typeof MapPin; variant: "secondary" | "outline"; tone: string }
> = {
  IN_PERSON: {
    label: "In-person",
    icon: MapPin,
    variant: "outline",
    tone: "border-white/20 bg-white/[0.06] text-content-on-dark",
  },
  LIVE_VIRTUAL: {
    label: "Live virtual",
    icon: Video,
    variant: "outline",
    tone: "border-amber-400/40 bg-amber-400/12 text-amber-300",
  },
}

export function DeliveryFormatBadge({ format, className }: DeliveryFormatBadgeProps) {
  const entry = config[format]
  if (!entry) return null

  const { label, icon: Icon, variant, tone } = entry

  return (
    <Badge
      variant={variant}
      className={cn("whitespace-nowrap uppercase tracking-wider", tone, className)}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      {label}
      {format === "LIVE_VIRTUAL" ? (
        // Live indicator. A flat dot, not a pulsing ring: the label already
        // says "Live virtual", so the animation carried no information.
        <span aria-hidden="true" className="ml-0.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
      ) : null}
    </Badge>
  )
}

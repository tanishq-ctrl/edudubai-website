import { MapPin, Video } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { DeliveryMode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DeliveryFormatBadgeProps {
  format: DeliveryMode
  className?: string
}

const config: Record<
  DeliveryMode,
  { label: string; icon: typeof MapPin; variant: "secondary" | "success" }
> = {
  IN_PERSON: { label: "In-person", icon: MapPin, variant: "secondary" },
  LIVE_VIRTUAL: { label: "Live virtual", icon: Video, variant: "success" },
}

export function DeliveryFormatBadge({ format, className }: DeliveryFormatBadgeProps) {
  const entry = config[format]
  if (!entry) return null

  const { label, icon: Icon, variant } = entry

  return (
    <Badge
      variant={variant}
      className={cn("whitespace-nowrap uppercase tracking-wider", className)}
    >
      <Icon aria-hidden="true" className="h-3 w-3" />
      {label}
      {format === "LIVE_VIRTUAL" ? (
        // Live indicator: the ping ring is decorative, the label already says
        // "Live virtual", so it carries no information of its own.
        <span aria-hidden="true" className="relative ml-0.5 flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-success" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
        </span>
      ) : null}
    </Badge>
  )
}

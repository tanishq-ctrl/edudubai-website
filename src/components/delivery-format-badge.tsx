import { Badge } from "@/components/ui/badge"
import { MapPin, Video, BookOpen } from "lucide-react"
import { DeliveryMode } from "@/lib/types"

// Legacy compatibility
type DeliveryFormat = DeliveryMode

interface DeliveryFormatBadgeProps {
  format: DeliveryFormat | DeliveryMode
  className?: string
}

export function DeliveryFormatBadge({ format, className }: DeliveryFormatBadgeProps) {
  const config = {
    IN_PERSON: {
      label: "In-Person",
      icon: MapPin,
      className: "bg-brand-navy text-white",
    },
    LIVE_VIRTUAL: {
      label: "Live Virtual",
      icon: Video,
      className: "bg-blue-600 text-white",
    },
  }

  const { label, icon: Icon, className: badgeClassName } = config[format as DeliveryMode]

  return (
    <Badge className={`${badgeClassName} ${className} text-xs font-semibold border-0`}>
      <Icon className="h-3 w-3 mr-1 flex-shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
    </Badge>
  )
}

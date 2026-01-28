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
    <Badge className={`${badgeClassName} ${className} text-xs font-semibold border-0 items-center`}>
      <Icon className="h-3 w-3 mr-1 flex-shrink-0" />
      <span className="whitespace-nowrap">{label}</span>
      {format === 'LIVE_VIRTUAL' && (
        <div className="ml-2 relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
      )}
    </Badge>
  )
}

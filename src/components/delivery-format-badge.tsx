import { Badge } from "@/components/ui/badge"
import { MapPin, Video, BookOpen } from "lucide-react"
import { DeliveryMode } from "@/lib/types"
import { cn } from "@/lib/utils"

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
      className: "bg-slate-100 text-slate-700",
    },
    LIVE_VIRTUAL: {
      label: "Live Virtual",
      icon: Video,
      className: "bg-brand-navy/5 text-brand-navy",
    },
  }

  const { label, icon: Icon, className: badgeClassName } = config[format as DeliveryMode]

  return (
    <Badge className={cn(
      badgeClassName,
      "text-[10px] font-bold uppercase tracking-tight border-0 px-2 py-0.5 flex items-center gap-1.5 whitespace-nowrap",
      className
    )}>
      <Icon className="h-3 w-3 stroke-[2.5px]" />
      {label}
      {format === 'LIVE_VIRTUAL' && (
        <span className="relative flex h-1.5 w-1.5 ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
        </span>
      )}
    </Badge>
  )
}

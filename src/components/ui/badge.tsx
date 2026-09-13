import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-2xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-navy-700 text-white",
        secondary: "border-transparent bg-navy-50 text-navy-700",
        gold: "border-gold-400/35 bg-gold-400/12 text-gold-700",
        success: "border-transparent bg-success/12 text-success",
        warning: "border-transparent bg-warning/12 text-warning",
        destructive: "border-transparent bg-danger/12 text-danger",
        outline: "border-line-strong text-content",
        ink: "border-white/15 bg-white/8 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Surface card.
 *
 * `interactive` adds the lift/border treatment used by every clickable card
 * (course, news, trainer). Keeping it here stops each grid inventing its own
 * hover shadow, which is how the old build ended up with five different ones.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean; tone?: "raised" | "sunken" | "ink" | "outline" }
>(({ className, interactive = false, tone = "raised", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-lg border transition-all duration-slow ease-out-expo",
      tone === "raised" && "border-line bg-surface-raised text-content shadow-sm",
      tone === "sunken" && "border-line bg-surface-sunken text-content",
      tone === "ink" && "border-white/10 bg-white/[0.07] text-content-on-dark",
      tone === "outline" && "border-line-strong bg-transparent text-content",
      interactive && "hover:-translate-y-1.5 hover:border-gold-400/60 hover:shadow-lg",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-2 p-6 sm:p-7", className)} {...props} />
  ),
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-xl leading-tight", className)} {...props} />
  ),
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm leading-relaxed text-content-muted", className)} {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 sm:p-7 sm:pt-0", className)} {...props} />
  ),
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 p-6 pt-0 sm:p-7 sm:pt-0", className)}
      {...props}
    />
  ),
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * `gold` is the single primary CTA style for the whole site. Anything else on
 * a page competing with it should be `outline`, `ghost` or `link` -- two gold
 * buttons in one viewport means neither one is the call to action.
 *
 * The `group` class is on the base so variants can animate an inner icon via
 * `group-hover:`.
 */
const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-medium tracking-tight",
    "rounded-full",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-fast ease-out-expo",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50",
    // Keeps a tap from firing twice / selecting text on iOS.
    "touch-manipulation select-none",
    "active:scale-[0.985]",
  ].join(" "),
  {
    variants: {
      variant: {
        gold: [
          "bg-gold-400 text-navy-900 font-semibold",
          "shadow-[0_10px_30px_-10px_rgb(var(--gold-400)/0.65)]",
          "hover:bg-gold-300 hover:shadow-gold hover:-translate-y-0.5",
        ].join(" "),
        default: [
          "bg-navy-700 text-white",
          "shadow-sm hover:bg-navy-600 hover:shadow-lg hover:-translate-y-0.5",
        ].join(" "),
        ink: [
          "bg-ink-900 text-content-on-dark",
          "hover:bg-ink-800 hover:-translate-y-0.5 hover:shadow-lg",
        ].join(" "),
        outline: [
          "border border-line-strong bg-transparent text-content-strong",
          "hover:border-navy-700 hover:bg-navy-50 hover:text-navy-700",
        ].join(" "),
        "outline-light": [
          "border border-white/35 bg-white/10 text-white",
          "hover:border-white/70 hover:bg-white/12",
        ].join(" "),
        secondary: "bg-surface-sunken text-content-strong hover:bg-navy-100",
        ghost: "text-content-strong hover:bg-surface-sunken",
        "ghost-light": "text-white/85 hover:bg-white/10 hover:text-white",
        destructive: "bg-danger text-white shadow-sm hover:brightness-110",
        link: "h-auto rounded-none p-0 text-navy-700 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-15 px-10 text-base sm:text-lg",
        icon: "h-11 w-11 p-0",
        "icon-sm": "h-9 w-9 p-0",
      },
      /** Full width on phones, auto from `sm` up -- the common CTA pattern. */
      block: {
        true: "w-full sm:w-auto",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      block: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, block, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

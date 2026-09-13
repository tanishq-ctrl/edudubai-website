import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Text input.
 *
 * Height is 44px (`h-11`), not 40px: below ~44px a field is an awkward tap
 * target on a phone, and iOS Safari zooms the viewport on focus for any input
 * whose font-size computes under 16px — `text-base` on small screens prevents
 * that jump.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-sm border border-line-strong bg-surface-raised px-3.5 py-2",
          "text-base text-content-strong sm:text-sm",
          "placeholder:text-content-subtle",
          "transition-[border-color,box-shadow] duration-fast ease-out-expo",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-content",
          "hover:border-navy-300",
          "focus-visible:border-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600/25 focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-60",
          "aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/20",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }

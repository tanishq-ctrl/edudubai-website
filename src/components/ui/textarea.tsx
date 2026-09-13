import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[7.5rem] w-full rounded-sm border border-line-strong bg-surface-raised px-3.5 py-3",
          // 16px on small screens stops iOS Safari zooming the page on focus.
          "text-base text-content-strong sm:text-sm",
          "placeholder:text-content-subtle",
          "transition-[border-color,box-shadow] duration-fast ease-out-expo",
          "hover:border-navy-300",
          "focus-visible:border-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600/25",
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
Textarea.displayName = "Textarea"

export { Textarea }

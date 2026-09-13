"use client"

import * as React from "react"
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile"

import { cn } from "@/lib/utils"

type TurnstileWidgetProps = {
  /** Called with a fresh token. Pass "" to clear on error/expiry. */
  onToken: (token: string) => void
  className?: string
  /** Use on dark surfaces; defaults to the light form treatment. */
  theme?: "light" | "dark"
}

/**
 * The one place Turnstile is configured.
 *
 * Previously seven separate call sites each rendered <Turnstile> with
 * different (mostly absent) options, so the widget appeared as a stray
 * fixed-width box that ignored the form's rhythm and, on one form, defaulted
 * to a different theme than the surface it sat on.
 *
 * `size: "flexible"` makes the widget span its container instead of sitting at
 * a fixed ~300px, which is what made it read as a foreign element dropped into
 * the layout.
 *
 * It also clears the token on error and expiry. Without that, a widget that
 * expired while the user was still typing left a stale token in state and the
 * submit button enabled, so the request failed verification server-side with
 * no explanation.
 */
export function TurnstileWidget({ onToken, className, theme = "light" }: TurnstileWidgetProps) {
  const ref = React.useRef<TurnstileInstance>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  // Without a key the widget can never issue a token, which would leave the
  // form permanently unsubmittable. Fail loudly in dev, quietly in prod.
  if (!siteKey) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <p className="rounded-sm border border-danger/30 bg-danger/8 p-3 text-xs text-danger">
          NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set — bot protection is disabled.
        </p>
      )
    }
    return null
  }

  return (
    <div className={cn("w-full", className)}>
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onToken}
        onError={() => onToken("")}
        onExpire={() => {
          onToken("")
          ref.current?.reset()
        }}
        options={{ theme, size: "flexible" }}
        className="w-full"
      />
    </div>
  )
}

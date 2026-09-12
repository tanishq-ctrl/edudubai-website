/**
 * Minimal leveled logger.
 *
 * `debug` is suppressed in production. Diagnostic chatter — auth flow traces,
 * CRM sync steps, cookie inventories — must go through `debug` so it never
 * reaches production logs, where it costs money and leaks user identifiers
 * into log exports.
 *
 * `info`, `warn` and `error` always emit: use them for things an operator
 * genuinely needs to see in production.
 */

const isProduction = process.env.NODE_ENV === "production"

type LogArgs = unknown[]

export const logger = {
  /** Development-only diagnostics. Silent in production. */
  debug(...args: LogArgs): void {
    if (!isProduction) {
      console.log(...args)
    }
  },

  /** Noteworthy events worth keeping in production logs. */
  info(...args: LogArgs): void {
    console.info(...args)
  },

  warn(...args: LogArgs): void {
    console.warn(...args)
  },

  error(...args: LogArgs): void {
    console.error(...args)
  },
}

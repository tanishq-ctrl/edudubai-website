/**
 * Utility functions for authentication flow
 * Helps ensure cookies are properly handled between client and server
 */

/**
 * Clear all Supabase auth cookies from the browser
 * Useful when cookies become invalid or corrupted
 */
export function clearAuthCookies() {
  if (typeof document === 'undefined') return
  
  // Get all cookies
  const cookies = document.cookie.split(';')
  
  // Clear all Supabase-related cookies
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim()
    if (cookieName.includes('sb-') || cookieName.includes('auth')) {
      // Clear cookie by setting it to expire in the past
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`
    }
  })
}

/**
 * Check if a Supabase error indicates invalid cookies
 */
export function isInvalidCookieError(error: any): boolean {
  if (!error) return false
  const message = error.message || error.toString()
  return (
    message.includes('Auth session missing') ||
    message.includes('Invalid token') ||
    message.includes('JWT') ||
    message.includes('expired')
  )
}


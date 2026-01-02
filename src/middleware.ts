import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Only proceed if Supabase is configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // If Supabase is not configured, allow access but skip auth checks
    // This allows the app to work without auth in development
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            // Ensure cookies are set with proper options for cross-domain compatibility
            response.cookies.set(name, value, {
              ...options,
              // Ensure sameSite is set for cross-origin requests
              sameSite: options?.sameSite || 'lax',
              // Ensure path is set
              path: options?.path || '/',
            })
          })
        },
      },
    }
  )

  // IMPORTANT: Use getUser() which is more reliable
  // It will automatically refresh expired tokens and handle cookie parsing
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  // Also get session for logging purposes
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  // If we have an invalid cookie error, clear it to prevent infinite loops
  // Only clear on auth pages to avoid clearing valid cookies elsewhere
  if ((authError?.message?.includes('Auth session missing') || 
       authError?.message?.includes('Invalid token')) &&
      (pathname.startsWith('/auth/') || pathname.startsWith('/dashboard'))) {
    // Clear potentially invalid auth cookies
    const invalidAuthCookies = request.cookies.getAll().filter(c => 
      c.name.includes('sb-') || c.name.includes('auth')
    )
    
    if (invalidAuthCookies.length > 0) {
      invalidAuthCookies.forEach(cookie => {
        response.cookies.delete(cookie.name)
      })
      
      console.log('[Middleware] Cleared invalid auth cookies:', invalidAuthCookies.map(c => c.name))
    }
  }

  // Debug logging - check cookies too
  const allCookies = request.cookies.getAll()
  const authCookies = allCookies.filter(c => 
    c.name.includes('supabase') || 
    c.name.includes('auth') || 
    c.name.includes('sb-') ||
    c.name.startsWith('sb_')
  )
  
  // Log cookie value length (not the actual value for security)
  const authCookieInfo = authCookies.map(c => ({
    name: c.name,
    valueLength: c.value?.length || 0,
    hasValue: !!c.value,
  }))
  
  console.log('[Middleware]', {
    path: pathname,
    hasSession: !!session,
    hasUser: !!user,
    userId: user?.id || null,
    sessionError: sessionError?.message || null,
    authError: authError?.message || null,
    totalCookieCount: allCookies.length,
    authCookieCount: authCookies.length,
    authCookieInfo,
  })

  // If user is NOT authenticated AND trying to access /dashboard
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      console.log('[Middleware] Redirecting unauthenticated user from /dashboard to /auth/login')
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
    // User is authenticated, allow access to dashboard
    console.log('[Middleware] Allowing authenticated user to access dashboard')
    return response
  }

  // Allow OAuth callback route to proceed without auth checks
  if (pathname.startsWith('/auth/callback')) {
    return response
  }

  // If user IS authenticated AND trying to access auth pages
  if (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')) {
    if (user) {
      console.log('[Middleware] Redirecting authenticated user away from auth page to /dashboard')
      const next = request.nextUrl.searchParams.get('next') || '/dashboard'
      const redirectUrl = new URL(next, request.url)
      return NextResponse.redirect(redirectUrl)
    }
    // User is not authenticated, allow access to auth pages
    return response
  }

  // For all other routes, allow access
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

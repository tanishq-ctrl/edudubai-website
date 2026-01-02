import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = await createClient()
    
    if (!supabase) {
      return NextResponse.redirect(new URL('/auth/login?error=Configuration error', request.url))
    }

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('[OAuth Callback] Error exchanging code:', error)
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, request.url)
      )
    }

    // Get the user to check if profile exists
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Check if profile exists, create if not
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!profile) {
        // Create profile for OAuth user
        const fullName = user.user_metadata?.full_name || 
                        user.user_metadata?.name || 
                        user.email?.split('@')[0] || 
                        'User'

        await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: fullName,
          })
          .catch((err) => {
            // Profile might be created by trigger, ignore error
            console.log('Profile creation skipped (might exist):', err)
          })
      }
    }

    // Redirect to the next URL or dashboard
    return NextResponse.redirect(new URL(next, request.url))
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/auth/login', request.url))
}


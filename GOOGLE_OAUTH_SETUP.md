# Google OAuth Setup Guide

## Overview
Google authentication is handled entirely through Supabase. You **do NOT** need to configure anything on Vercel for Google OAuth.

## Prerequisites
1. ✅ Google OAuth provider enabled in Supabase Dashboard
2. ✅ Google OAuth credentials (Client ID & Secret) added to Supabase
3. ✅ `NEXT_PUBLIC_SITE_URL` environment variable set in Vercel

## Step-by-Step Setup

### 1. Supabase Configuration

1. Go to your Supabase Dashboard → Authentication → Providers
2. Enable **Google** provider
3. Add your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
4. **IMPORTANT**: Add your redirect URLs to the **Redirect URLs** section:
   ```
   https://your-domain.vercel.app/auth/callback
   http://localhost:3000/auth/callback (for local development)
   ```
   
   **Where to find this in Supabase:**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Look for "Redirect URLs" section
   - Add your Vercel production URL: `https://your-domain.vercel.app/auth/callback`
   - Add localhost for development: `http://localhost:3000/auth/callback`
   
   **Where to find your Vercel URL:**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Use your production domain (e.g., `https://edudubai.vercel.app` or your custom domain)
   - Add `/auth/callback` to the end

### 2. Vercel Environment Variables

Make sure you have these environment variables set in Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Critical**: `NEXT_PUBLIC_SITE_URL` must match your actual Vercel domain (without trailing slash).

### 3. Google Cloud Console Setup

If you haven't created Google OAuth credentials yet:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API** (or **Google Identity Services API**)
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. **Authorized redirect URIs**: Add:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
   ⚠️ **IMPORTANT**: This is Supabase's callback URL, NOT your Vercel URL!
   
   **Where to find your Supabase project URL:**
   - Go to Supabase Dashboard → Settings → API
   - Look for "Project URL" (e.g., `https://abcdefghijklmnop.supabase.co`)
   - Use that URL + `/auth/v1/callback`
   
   **Example:**
   - If your Supabase Project URL is: `https://xyzabc123.supabase.co`
   - Then add: `https://xyzabc123.supabase.co/auth/v1/callback`
   
7. Copy the **Client ID** and **Client Secret**
8. Add them to Supabase Dashboard → Authentication → Providers → Google

### 4. Testing

1. **Local Development**:
   - Make sure `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`
   - Add `http://localhost:3000/auth/callback` to Supabase redirect URLs
   - Test Google sign-in/up

2. **Production (Vercel)**:
   - Ensure `NEXT_PUBLIC_SITE_URL` is set to your Vercel domain
   - Add your production callback URL to Supabase redirect URLs
   - Test Google sign-in/up

## Troubleshooting

### Issue: "Redirect URI mismatch"
**Solution**: 
- Check that the redirect URL in Supabase matches exactly: `https://your-domain.vercel.app/auth/callback`
- Make sure `NEXT_PUBLIC_SITE_URL` in Vercel matches your domain
- Verify the URL in Supabase Dashboard → Authentication → URL Configuration

### Issue: "OAuth callback error"
**Solution**:
- Check browser console for specific error messages
- Verify the callback route exists: `/auth/callback`
- Check Supabase logs in Dashboard → Logs → Auth

### Issue: "Configuration error"
**Solution**:
- Verify all Supabase environment variables are set in Vercel
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Ensure Google provider is enabled in Supabase

### Issue: User created but can't log in
**Solution**:
- Check if profile is created (should be automatic via trigger)
- Verify RLS policies allow user to read their own profile
- Check Supabase logs for any errors during profile creation

## Important Notes

- ✅ **No Vercel configuration needed** - Google OAuth is handled by Supabase
- ✅ **Redirect URLs** must be added in Supabase, not Vercel
- ✅ **NEXT_PUBLIC_SITE_URL** must be set correctly in Vercel
- ✅ The callback URL format is: `{NEXT_PUBLIC_SITE_URL}/auth/callback`
- ✅ For local dev, use: `http://localhost:3000/auth/callback`

## Quick Checklist

- [ ] Google provider enabled in Supabase
- [ ] Google OAuth credentials added to Supabase
- [ ] Redirect URLs added in Supabase (both localhost and production)
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel environment variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel
- [ ] Tested Google sign-in on localhost
- [ ] Tested Google sign-in on production


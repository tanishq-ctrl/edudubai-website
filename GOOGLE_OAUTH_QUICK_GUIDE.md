# Google OAuth Quick Setup Guide

## TL;DR - Where to Add What URL

### ✅ In Google Cloud Console:
**Add Supabase's callback URL:**
```
https://your-project-id.supabase.co/auth/v1/callback
```

### ✅ In Supabase Dashboard:
**Add your Vercel URL:**
```
https://your-domain.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

---

## Step-by-Step Instructions

### Step 1: Find Your Supabase Project URL

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Find **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
5. Copy this URL - you'll need it for Google Cloud Console

### Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. **Authorized redirect URIs** → Click **Add URI**
7. Add: `https://YOUR-SUPABASE-PROJECT-ID.supabase.co/auth/v1/callback`
   - Replace `YOUR-SUPABASE-PROJECT-ID` with your actual Supabase project ID
   - Example: `https://xyzabc123.supabase.co/auth/v1/callback`
8. Click **Create**
9. Copy the **Client ID** and **Client Secret**

### Step 3: Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and click to enable
5. Paste your **Client ID** and **Client Secret** from Google Cloud Console
6. Click **Save**

### Step 4: Add Redirect URLs in Supabase

1. Still in Supabase Dashboard
2. Go to **Authentication** → **URL Configuration**
3. Find **Redirect URLs** section
4. Add these URLs (one per line):
   ```
   https://your-domain.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```
   - Replace `your-domain.vercel.app` with your actual Vercel domain
   - To find your Vercel domain: Vercel Dashboard → Project → Settings → Domains

### Step 5: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add or update:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://your-domain.vercel.app` (no trailing slash)
5. Make sure it's set for **Production**, **Preview**, and **Development**
6. **Redeploy** your project after adding/updating

---

## Summary: Two Different URLs in Two Places

| Where | What URL to Add | Example |
|-------|----------------|---------|
| **Google Cloud Console** | Supabase callback URL | `https://xyzabc123.supabase.co/auth/v1/callback` |
| **Supabase Dashboard** | Your Vercel URL | `https://edudubai.vercel.app/auth/callback` |

---

## How to Find Your URLs

### Find Supabase Project URL:
- Supabase Dashboard → Settings → API → **Project URL**

### Find Vercel Domain:
- Vercel Dashboard → Your Project → Settings → Domains
- Or check your deployment URL: `https://your-project.vercel.app`

---

## Common Mistakes

❌ **Wrong**: Adding Vercel URL in Google Cloud Console  
✅ **Correct**: Add Supabase URL in Google Cloud Console

❌ **Wrong**: Adding Supabase URL in Supabase Redirect URLs  
✅ **Correct**: Add Vercel URL in Supabase Redirect URLs

❌ **Wrong**: Using `http://` for production  
✅ **Correct**: Use `https://` for production

❌ **Wrong**: Adding trailing slash  
✅ **Correct**: No trailing slash (e.g., `https://domain.com/auth/callback` not `https://domain.com/auth/callback/`)

---

## Testing

1. **Local Development**:
   - Make sure `NEXT_PUBLIC_SITE_URL=http://localhost:3000` in `.env.local`
   - Test Google sign-in on `http://localhost:3000/auth/login`

2. **Production**:
   - Verify `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel
   - Test Google sign-in on your production domain

---

## Still Not Working?

Check these:
1. ✅ Google OAuth credentials are correct in Supabase
2. ✅ Redirect URL in Google Cloud Console matches Supabase project URL exactly
3. ✅ Redirect URLs in Supabase include your Vercel domain
4. ✅ `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel
5. ✅ You've redeployed after changing environment variables
6. ✅ Check browser console for specific error messages


# Supabase URL Configuration - What to Add

## Where to Find It

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Find the **Redirect URLs** section

## What URLs to Add

Add these URLs (one per line) in the **Redirect URLs** field:

```
https://your-domain.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### For Production:
```
https://your-domain.vercel.app/auth/callback
```
- Replace `your-domain.vercel.app` with your actual Vercel domain
- Examples:
  - `https://edudubai.vercel.app/auth/callback`
  - `https://www.edudubai.org/auth/callback` (if you have a custom domain)
  - `https://edudubai-website.vercel.app/auth/callback` (your Vercel project URL)

### For Local Development:
```
http://localhost:3000/auth/callback
```
- This is for testing on your local machine
- Keep the `http://` (not `https://`) for localhost

## How to Find Your Vercel Domain

### Option 1: Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project
3. Go to **Settings** → **Domains**
4. You'll see your domains listed
5. Use the production domain (usually ends with `.vercel.app` or your custom domain)

### Option 2: Check Your Deployment
1. Go to Vercel Dashboard → Your Project
2. Look at the latest deployment
3. The URL shown is your domain
4. Add `/auth/callback` to it

## Complete Example

If your Vercel domain is `edudubai-website.vercel.app`, add:

```
https://edudubai-website.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

## Important Notes

✅ **Do include** `/auth/callback` at the end  
✅ **Do use** `https://` for production (not `http://`)  
✅ **Do use** `http://` for localhost  
✅ **Do NOT** add trailing slash (no `/` at the end)  
✅ **Do add** both production and localhost URLs  

❌ **Don't add** Supabase URLs here  
❌ **Don't add** Google Cloud Console URLs here  
❌ **Don't add** trailing slashes  

## Step-by-Step

1. Open Supabase Dashboard
2. Go to **Authentication** → **URL Configuration**
3. Scroll to **Redirect URLs** section
4. Click in the text field
5. Paste or type:
   ```
   https://your-actual-vercel-domain.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```
6. Click **Save** (or the save button)

## Multiple Domains?

If you have multiple domains (e.g., custom domain + Vercel domain), add all of them:

```
https://edudubai.org/auth/callback
https://www.edudubai.org/auth/callback
https://edudubai.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

## Verification

After adding, you should see:
- ✅ URLs listed in the Redirect URLs section
- ✅ No error messages
- ✅ Save button confirms changes

## Testing

After adding URLs:
1. Test Google sign-in on localhost: `http://localhost:3000/auth/login`
2. Test Google sign-in on production: `https://your-domain.vercel.app/auth/login`
3. Both should redirect correctly after Google authentication


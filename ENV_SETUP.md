# Environment Variables Setup Guide

This guide will help you set up all required environment variables for EduDubai.

## Quick Start

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Open `.env.local` and fill in your actual values** (see details below)

3. **Restart your development server** after making changes

## Required Environment Variables

### 1. Application Settings

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
- **Local Development**: `http://localhost:3000`
- **Production**: Your production domain (e.g., `https://edudubai.com`)

---

### 2. Razorpay Payment Gateway

Get your credentials from: https://dashboard.razorpay.com/app/keys

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

**Note:** Payments are processed in USD. No currency conversion needed.

**Setup Steps:**
1. Sign up/Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test API Keys (for development)
4. Copy the Key ID → `NEXT_PUBLIC_RAZORPAY_KEY_ID`
5. Copy the Key Secret → `RAZORPAY_KEY_SECRET`
6. For webhooks (optional): Settings → Webhooks → Copy secret → `RAZORPAY_WEBHOOK_SECRET`

**Note:** 
- Use Test keys for development
- Switch to Live keys for production
- Payments are processed in USD (no conversion needed)

---

### 3. Resend Email Service

Get your API key from: https://resend.com/api-keys

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_NOTIFY_EMAIL=training@edudubai.org
```

**Setup Steps:**
1. Sign up/Login to Resend
2. Go to API Keys section
3. Create a new API key
4. Copy the key → `RESEND_API_KEY`
5. Set your admin email → `ADMIN_NOTIFY_EMAIL`

**Note:** 
- Resend has a free tier (100 emails/day)
- The admin email receives all lead notifications

---

### 4. WhatsApp Integration (Optional)

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=+971501234567
```

**Format:** Include country code (e.g., +971 for UAE, +1 for US)

**Note:** This is optional. If not set, defaults to a placeholder number.

---

### 5. Supabase (Phase 2 - Optional)

These are only needed when implementing database features:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Note:** Leave these commented out for Phase 1 (in-memory data).

---

## Complete .env.local Template

Create a file named `.env.local` in the root directory with this content:

```env
# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_NOTIFY_EMAIL=training@edudubai.org

# WhatsApp Integration (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER=+971501234567
```

---

## Security Best Practices

1. **Never commit `.env.local` to Git** (already in `.gitignore`)
2. **Use different keys for development and production**
3. **Keep `RAZORPAY_KEY_SECRET` secure** - never expose to client
4. **Rotate API keys periodically**
5. **Use environment-specific files:**
   - `.env.local` - Local development
   - `.env.production` - Production (on Vercel/server)

---

## Verifying Your Setup

After setting up your `.env.local` file:

1. **Restart your dev server:**
   ```bash
   npm run dev
   ```

2. **Check for errors** in the terminal - missing env vars will show errors

3. **Test key features:**
   - Payment flow (Razorpay)
   - Email sending (Resend)
   - WhatsApp links (if configured)

---

## Troubleshooting

### "Razorpay credentials not configured"
- Check that `NEXT_PUBLIC_RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are set
- Restart your dev server after adding env vars

### "Resend API key not found"
- Verify `RESEND_API_KEY` is set correctly
- Check for typos or extra spaces

### "Environment variable not found"
- Make sure the variable name matches exactly (case-sensitive)
- Restart the dev server after changes
- Check that you're using `.env.local` (not `.env`)

---

## Production Deployment (Vercel)

When deploying to Vercel:

1. Go to your project settings → Environment Variables
2. Add all the variables from `.env.local`
3. Set different values for:
   - **Development** (preview deployments)
   - **Production** (main domain)

**Important:** Use production API keys for production environment!

---

## Need Help?

- Razorpay Docs: https://razorpay.com/docs/
- Resend Docs: https://resend.com/docs
- Next.js Env Vars: https://nextjs.org/docs/basic-features/environment-variables


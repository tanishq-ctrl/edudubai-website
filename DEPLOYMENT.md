# Deployment Guide - EduDubai

This guide covers deploying the EduDubai Next.js application to Vercel.

## Prerequisites

- GitHub repository with the code
- Vercel account (free tier works)
- All service accounts configured (Supabase, Razorpay, Resend)

## Step 1: Prepare Repository

1. Ensure all code is committed and pushed to GitHub
2. Verify `package-lock.json` exists (or `yarn.lock` if using Yarn)
3. Test local build: `npm run build`

## Step 2: Deploy to Vercel

### 2.1 Import Project

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js framework

### 2.2 Configure Project Settings

- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## Step 3: Environment Variables

Add the following environment variables in Vercel Dashboard → Project Settings → Environment Variables:

### Required Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay Configuration
NEXT_PUBLIC_RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
RAZORPAY_WEBHOOK_SECRET=your-razorpay-webhook-secret

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-api-key
ADMIN_NOTIFY_EMAIL=training@edudubai.org

# Trainer Application Configuration
TRAINER_UPLOAD_BUCKET=trainer-uploads

# WhatsApp (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER=+919665642862
```

**Important Notes:**
- Set variables for **Production**, **Preview**, and **Development** environments
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Server-only variables (without `NEXT_PUBLIC_`) are never exposed to client
- Never commit actual secrets to the repository

## Step 4: Domain Configuration

### 4.1 Add Domain in Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `edudubai.org`)
3. Vercel will show DNS configuration instructions

### 4.2 Configure DNS (Squarespace or your DNS provider)

#### For Root Domain (edudubai.org):
- **Type**: A Record
- **Name**: @ (or leave blank)
- **Value**: Vercel IP address (shown in Vercel dashboard, typically `76.76.21.21`)

#### For WWW Subdomain (www.edudubai.org):
- **Type**: CNAME Record
- **Name**: www
- **Value**: `cname.vercel-dns.com`

**Note**: DNS changes can take 24-48 hours to propagate. Vercel will show when the domain is verified.

## Step 5: Razorpay Webhook Configuration

### 5.1 Get Webhook URL

After deployment, your webhook URL will be:
```
https://your-domain.com/api/webhooks/razorpay
```

### 5.2 Configure in Razorpay Dashboard

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Go to **Settings** → **Webhooks**
3. Click **Add New Webhook**
4. Enter webhook URL: `https://your-domain.com/api/webhooks/razorpay`
5. Select events: **payment.captured**
6. Copy the **Webhook Secret**
7. Add the secret to Vercel environment variables as `RAZORPAY_WEBHOOK_SECRET`

### 5.3 Test Webhook

1. Make a test payment in Razorpay test mode
2. Check Vercel function logs: Project → Deployments → Functions → `api/webhooks/razorpay`
3. Verify webhook receives and processes events correctly

## Step 6: Post-Deployment Checks

### 6.1 Basic Functionality

- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Course pages load
- [ ] Images display properly

### 6.2 Authentication

- [ ] User registration works
- [ ] User login works
- [ ] Dashboard is accessible after login
- [ ] Logout works

### 6.3 Payments

- [ ] Course enrollment button works
- [ ] Razorpay checkout opens
- [ ] Test payment completes (use Razorpay test cards)
- [ ] Payment verification works
- [ ] Enrollment is created in database
- [ ] Confirmation email is sent

### 6.4 Webhooks

- [ ] Webhook endpoint is accessible
- [ ] Webhook receives events from Razorpay
- [ ] Signature verification works
- [ ] Payment records are created/updated

### 6.5 Forms

- [ ] Contact form submits successfully
- [ ] Lead capture forms work
- [ ] Corporate training form works
- [ ] Trainer application form works
- [ ] Email notifications are sent

### 6.6 Performance

- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] No console errors in browser
- [ ] Mobile responsiveness works

## Step 7: Monitoring & Maintenance

### 7.1 Vercel Analytics

- Enable Vercel Analytics in Project Settings
- Monitor deployment success rates
- Check function execution times

### 7.2 Error Monitoring

- Set up error tracking (e.g., Sentry, Vercel Logs)
- Monitor webhook failures
- Check payment processing errors

### 7.3 Database

- Monitor Supabase usage
- Check for connection issues
- Review payment/enrollment records

## Troubleshooting

### Build Fails

1. Check Vercel build logs
2. Verify all environment variables are set
3. Ensure Node.js version is compatible (18+)
4. Check for TypeScript errors: `npm run build` locally

### Webhook Not Working

1. Verify webhook URL is correct in Razorpay dashboard
2. Check `RAZORPAY_WEBHOOK_SECRET` matches Razorpay dashboard
3. Review Vercel function logs for errors
4. Test webhook signature verification locally

### Images Not Loading

1. Verify Supabase storage bucket is public (for public images)
2. Check `next.config.js` has correct image domains
3. Ensure image paths are correct

### Environment Variables Not Working

1. Verify variables are set for correct environment (Production/Preview/Development)
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Razorpay Webhooks](https://razorpay.com/docs/webhooks/)
- [Supabase Documentation](https://supabase.com/docs)

## Support

For deployment issues, check:
1. Vercel deployment logs
2. Function logs in Vercel dashboard
3. Browser console for client-side errors
4. Supabase logs for database issues


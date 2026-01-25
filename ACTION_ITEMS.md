# Action Items & Recommendations

**Date:** January 24, 2026  
**Priority Levels:** 🔴 High | 🟡 Medium | 🟢 Low

---

## 🔴 High Priority (Do Before Production)

### 1. Environment Variables Setup
**Status:** ⚠️ Required  
**Effort:** 30 minutes

**Action:**
- [ ] Create `.env.local` file from `.env.example`
- [ ] Add Supabase credentials
- [ ] Add Razorpay API keys
- [ ] Add Resend API key
- [ ] Add WhatsApp number (optional)
- [ ] Test all integrations

**Files to modify:**
- Create: `.env.local`

**Documentation:** See `ENV_SETUP.md`

---

### 2. Database Setup
**Status:** ⚠️ Required  
**Effort:** 15 minutes

**Action:**
- [ ] Run SQL scripts in Supabase dashboard
- [ ] Create `profiles` table
- [ ] Create `enrollments` table
- [ ] Create `payments` table
- [ ] Create `support_requests` table
- [ ] Create `trainer_applications` table
- [ ] Create storage bucket `trainer-uploads`
- [ ] Verify RLS policies are enabled

**Documentation:** See `README.md` lines 192-373

---

### 3. Production Environment Variables
**Status:** ⚠️ Required for deployment  
**Effort:** 15 minutes

**Action:**
- [ ] Add all env vars to Vercel dashboard
- [ ] Use production API keys (not test keys)
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Configure Razorpay webhook URL
- [ ] Verify Supabase redirect URLs

**Documentation:** See `DEPLOYMENT.md`

---

## 🟡 Medium Priority (Recommended)

### 4. Fix Image Optimization Warnings
**Status:** ⚪ Optional but recommended  
**Effort:** 10 minutes  
**Impact:** Minor performance improvement

**Action:**
Replace `<img>` tags with Next.js `<Image>` component:

**Files to modify:**
- `src/components/site-footer.tsx` (line 129)
- `src/components/site-header.tsx` (line 101)

**Example fix:**
```tsx
// Before
<img src="/logo.png" alt="Logo" className="h-8" />

// After
import Image from 'next/image'
<Image src="/logo.png" alt="Logo" width={120} height={32} />
```

---

### 5. Add Error Monitoring
**Status:** ⚪ Recommended  
**Effort:** 30 minutes  
**Impact:** Better production debugging

**Action:**
- [ ] Sign up for Sentry (free tier)
- [ ] Install `@sentry/nextjs`
- [ ] Add Sentry DSN to env vars
- [ ] Configure error boundaries
- [ ] Test error reporting

**Commands:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

### 6. Add Analytics
**Status:** ⚪ Recommended  
**Effort:** 20 minutes  
**Impact:** Track user behavior

**Action:**
- [ ] Choose analytics provider (Google Analytics, Mixpanel, etc.)
- [ ] Install analytics SDK
- [ ] Update `src/lib/analytics.ts`
- [ ] Add tracking to key events
- [ ] Test analytics in production

**Note:** Placeholder hooks already exist in `src/lib/analytics.ts`

---

### 7. Consolidate Payment Routes
**Status:** ⚪ Optional cleanup  
**Effort:** 15 minutes  
**Impact:** Code clarity

**Action:**
Review and potentially consolidate:
- `/api/payments/verify`
- `/api/razorpay/verify`

These may serve the same purpose. If so, keep one and remove the other.

---

## 🟢 Low Priority (Future Improvements)

### 8. Add Automated Tests
**Status:** ⚪ Nice to have  
**Effort:** 4-8 hours  
**Impact:** Better code confidence

**Action:**
- [ ] Install Jest + React Testing Library
- [ ] Add unit tests for utilities
- [ ] Add component tests
- [ ] Install Playwright for E2E tests
- [ ] Add critical user journey tests

**Commands:**
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
```

---

### 9. Optimize Webpack Cache
**Status:** ⚪ Optional  
**Effort:** 30 minutes  
**Impact:** Faster builds

**Action:**
- [ ] Configure webpack cache settings in `next.config.js`
- [ ] Use Buffer instead of strings for large data
- [ ] Test build performance

**Note:** Current warnings are informational only.

---

### 10. Add Course Progress Tracking
**Status:** ⚪ Feature enhancement  
**Effort:** 2-4 hours  
**Impact:** Better user experience

**Action:**
- [ ] Add progress field to enrollments (already exists in Prisma)
- [ ] Create lesson completion tracking
- [ ] Add progress bars to dashboard
- [ ] Update enrollment status on completion

---

### 11. Add Video Player Integration
**Status:** ⚪ Feature enhancement  
**Effort:** 4-6 hours  
**Impact:** Enable video courses

**Action:**
- [ ] Choose video hosting (Vimeo, YouTube, Mux)
- [ ] Add video player component
- [ ] Integrate with lesson content
- [ ] Add playback tracking

---

### 12. Generate Course Certificates
**Status:** ⚪ Feature enhancement  
**Effort:** 3-5 hours  
**Impact:** Better course completion experience

**Action:**
- [ ] Design certificate template
- [ ] Add PDF generation library
- [ ] Create certificate generation endpoint
- [ ] Add download button to dashboard
- [ ] Email certificate on course completion

---

## 📋 Pre-Launch Checklist

### Before Going Live:
- [ ] ✅ Production build passes
- [ ] ⚠️ Environment variables configured
- [ ] ⚠️ Database tables created
- [ ] ⚠️ Supabase RLS policies enabled
- [ ] ⚠️ Razorpay production keys added
- [ ] ⚠️ Razorpay webhook configured
- [ ] ⚠️ Resend domain verified
- [ ] ⚠️ Google OAuth configured
- [ ] ⚪ Custom domain configured
- [ ] ⚪ SSL certificate verified (Vercel auto)
- [ ] ⚪ Error monitoring setup
- [ ] ⚪ Analytics configured
- [ ] ⚪ Test all critical flows
- [ ] ⚪ Load testing (optional)

---

## 🎯 Quick Wins (Can Do Now)

### 1. Fix Image Warnings (10 min)
```bash
# Open files and replace <img> with <Image>
code src/components/site-footer.tsx
code src/components/site-header.tsx
```

### 2. Add .env.local (5 min)
```bash
cp .env.example .env.local
# Then fill in your credentials
```

### 3. Test Build (2 min)
```bash
npm run build
```

---

## 📊 Estimated Timeline

| Phase | Tasks | Time | Priority |
|-------|-------|------|----------|
| **Pre-Production** | Env vars + Database | 1 hour | 🔴 High |
| **Launch** | Deploy to Vercel | 30 min | 🔴 High |
| **Post-Launch** | Monitoring + Analytics | 1 hour | 🟡 Medium |
| **Optimization** | Image fixes + Tests | 2-4 hours | 🟢 Low |
| **Features** | Progress tracking, etc. | 8-16 hours | 🟢 Low |

---

## 🚀 Recommended Workflow

### Week 1: Launch
1. Set up environment variables
2. Create database tables
3. Test all features in staging
4. Deploy to production
5. Monitor for issues

### Week 2: Optimize
1. Add error monitoring
2. Add analytics
3. Fix image optimization warnings
4. Test performance

### Week 3+: Enhance
1. Add automated tests
2. Implement new features
3. Gather user feedback
4. Iterate based on data

---

## 📞 Need Help?

**Documentation:**
- `README.md` - Full setup guide
- `CODEBASE_REVIEW.md` - Detailed code analysis
- `QUICK_CHECKLIST.md` - Health status
- `ENV_SETUP.md` - Environment variables
- `DEPLOYMENT.md` - Deployment guide

**Common Issues:**
- Build fails → Check environment variables
- Auth not working → Verify Supabase setup
- Payments failing → Check Razorpay keys
- Emails not sending → Verify Resend API key

---

**Last Updated:** January 24, 2026  
**Status:** Ready for production with minor setup required

# 🚀 Local Testing Guide - EduDubai

**Last Updated:** January 24, 2026

This guide will help you run and test the EduDubai website locally on your machine.

---

## ✅ Prerequisites Check

You already have:
- ✅ Node.js v22.13.1 (Required: v18+)
- ✅ npm v10.9.2
- ✅ Dependencies installed (`node_modules`)
- ✅ Environment file (`.env.local`)

---

## 🎯 Quick Start (5 Minutes)

### Option 1: Run with Current Configuration

If your `.env.local` is already configured with valid credentials:

```bash
# Start the development server
npm run dev
```

Then open: **http://localhost:3000**

### Option 2: Run with Minimal Setup

If you don't have all services configured yet, you can still test the UI:

```bash
# Start the development server
npm run dev
```

The app will run but some features (auth, payments, email) won't work without proper credentials.

---

## 📋 Step-by-Step Setup

### Step 1: Verify Environment Variables

Check your `.env.local` file has the required variables:

```bash
# View your current .env.local (without showing secrets)
cat .env.local | grep -E "^[A-Z]" | cut -d'=' -f1
```

**Required variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `RESEND_API_KEY`

**Optional variables:**
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `ADMIN_NOTIFY_EMAIL`
- `NEXT_PUBLIC_APP_URL`

If any are missing, see `ENV_SETUP.md` for setup instructions.

---

### Step 2: Generate Prisma Client

```bash
npm run db:generate
```

This generates the Prisma client needed for the app.

---

### Step 3: Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2.5s
```

---

### Step 4: Open in Browser

Open your browser and navigate to:
**http://localhost:3000**

---

## 🧪 Testing Features

### 1. **Homepage & Navigation**
- ✅ Visit http://localhost:3000
- ✅ Click through navigation menu
- ✅ Test responsive design (resize browser)

### 2. **Course Catalog**
- ✅ Go to http://localhost:3000/courses
- ✅ Browse courses
- ✅ Click on a course to view details
- ✅ Test filters (if implemented)

### 3. **Authentication** (Requires Supabase)
- ✅ Click "Sign In" or "Register"
- ✅ Test email/password registration
- ✅ Test email/password login
- ✅ Test Google OAuth (if configured)
- ✅ Test logout

**Test Credentials:** Create a test account or use your own email.

### 4. **Dashboard** (Requires Authentication)
- ✅ Login first
- ✅ Visit http://localhost:3000/dashboard
- ✅ Check "My Courses" tab
- ✅ Check "Payments" tab
- ✅ Check "Profile" tab
- ✅ Check "Support" tab

### 5. **Payment Flow** (Requires Razorpay)
- ✅ Login to your account
- ✅ Go to a course page
- ✅ Click "Enroll Now"
- ✅ Complete payment with test card

**Razorpay Test Cards:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

See `RAZORPAY_TEST_CARDS.md` for more test cards.

### 6. **Lead Capture Forms**
- ✅ Test contact form at http://localhost:3000/contact
- ✅ Test corporate training form at http://localhost:3000/corporate
- ✅ Test brochure download on course pages
- ✅ Check if emails are sent (requires Resend)

### 7. **Trainer Application**
- ✅ Visit http://localhost:3000/become-a-trainer
- ✅ Fill out the form
- ✅ Upload CV and sample deck
- ✅ Submit application

### 8. **WhatsApp Integration**
- ✅ Click "Talk to Advisor" buttons
- ✅ Verify WhatsApp link opens correctly

---

## 🔍 Testing Checklist

### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] Course catalog displays
- [ ] Course detail pages load
- [ ] Forms validate input
- [ ] Responsive design works (mobile, tablet, desktop)
- [ ] Images load correctly
- [ ] Links work properly

### Authentication Testing
- [ ] Registration works
- [ ] Login works
- [ ] Logout works
- [ ] Password reset works
- [ ] Google OAuth works (if configured)
- [ ] Protected routes redirect to login
- [ ] Authenticated users can access dashboard

### Payment Testing
- [ ] Razorpay modal opens
- [ ] Test payment succeeds
- [ ] Enrollment is created
- [ ] Payment is recorded
- [ ] Confirmation email sent
- [ ] User redirected to success page

### Email Testing
- [ ] Welcome email sent on registration
- [ ] Enrollment confirmation sent
- [ ] Lead notifications sent to admin
- [ ] Brochure emails sent

### Database Testing
- [ ] User profiles created
- [ ] Enrollments saved
- [ ] Payments recorded
- [ ] Support requests saved
- [ ] Trainer applications saved

---

## 🐛 Common Issues & Solutions

### Issue 1: Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Issue 2: Environment Variables Not Loading
```bash
# Restart the dev server
# Press Ctrl+C to stop
npm run dev
```

### Issue 3: Prisma Client Not Generated
```bash
npm run db:generate
```

### Issue 4: Module Not Found Errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue 5: Supabase Connection Error
- Check `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
- Verify Supabase project is active

### Issue 6: Razorpay Not Working
- Check `NEXT_PUBLIC_RAZORPAY_KEY_ID` is correct
- Check `RAZORPAY_KEY_SECRET` is correct
- Use test mode keys for development

### Issue 7: Emails Not Sending
- Check `RESEND_API_KEY` is correct
- Verify Resend account is active
- Check spam folder for emails

---

## 🔧 Useful Commands

### Development
```bash
# Start dev server
npm run dev

# Start on different port
npm run dev -- -p 3001

# Clear Next.js cache and restart
rm -rf .next && npm run dev
```

### Database
```bash
# Generate Prisma client
npm run db:generate

# Open Prisma Studio (database GUI)
npm run db:studio

# Push schema changes to database
npm run db:push

# Create migration
npm run db:migrate
```

### Build & Production
```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Debugging
```bash
# Check environment variables (without values)
cat .env.local | grep -E "^[A-Z]" | cut -d'=' -f1

# Check Node.js version
node --version

# Check npm version
npm --version

# List all npm scripts
npm run
```

---

## 📊 Testing Different Scenarios

### Scenario 1: Guest User (Not Logged In)
1. Browse courses
2. View course details
3. Click "Enroll Now" → Should redirect to login
4. Download brochure → Should capture lead
5. Submit contact form
6. Submit corporate inquiry

### Scenario 2: Authenticated User (Logged In)
1. Login to account
2. Browse courses
3. Enroll in a course (with payment)
4. View dashboard
5. Check enrollment status
6. View payment history
7. Update profile
8. Submit support request

### Scenario 3: Trainer Applicant
1. Visit "Become a Trainer" page
2. Fill out application form
3. Upload CV and sample deck
4. Submit application
5. Verify email notification sent

### Scenario 4: Corporate Client
1. Visit corporate training page
2. Fill out inquiry form
3. Submit inquiry
4. Verify email notification sent

---

## 🎨 Testing Responsive Design

### Desktop (1920x1080)
```bash
# Open in browser at full screen
open http://localhost:3000
```

### Tablet (768x1024)
- Open browser DevTools (F12)
- Toggle device toolbar
- Select iPad or similar

### Mobile (375x667)
- Open browser DevTools (F12)
- Toggle device toolbar
- Select iPhone or similar

---

## 📱 Testing on Real Devices

### Get Your Local IP
```bash
# macOS/Linux
ipconfig getifaddr en0

# Or
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Access from Mobile Device
1. Get your local IP (e.g., 192.168.1.100)
2. On your phone, connect to same WiFi
3. Open browser and go to: `http://192.168.1.100:3000`

**Note:** Update `NEXT_PUBLIC_APP_URL` in `.env.local` if needed:
```env
NEXT_PUBLIC_APP_URL=http://192.168.1.100:3000
```

---

## 🔐 Testing Authentication Flows

### Email/Password Registration
1. Go to http://localhost:3000/auth/register
2. Fill in: Full Name, Email, Password
3. Click "Create Account"
4. Verify redirect to dashboard
5. Check if profile created in Supabase

### Email/Password Login
1. Go to http://localhost:3000/auth/login
2. Enter email and password
3. Click "Sign In"
4. Verify redirect to dashboard

### Google OAuth
1. Go to http://localhost:3000/auth/login
2. Click "Continue with Google"
3. Select Google account
4. Verify redirect to dashboard

### Password Reset
1. Go to http://localhost:3000/auth/forgot-password
2. Enter email
3. Click "Send Reset Link"
4. Check email for reset link
5. Click link and set new password

---

## 💳 Testing Payments

### Test Payment Success
1. Login to your account
2. Go to a course page
3. Click "Enroll Now"
4. Razorpay modal should open
5. Use test card: `4111 1111 1111 1111`
6. Enter any CVV and future expiry
7. Click "Pay"
8. Verify redirect to success page
9. Check dashboard for enrollment
10. Check email for confirmation

### Test Payment Failure
1. Follow steps 1-4 above
2. Use failing test card: `4000 0000 0000 0002`
3. Payment should fail
4. Verify error message shown
5. User should stay on course page

---

## 📧 Testing Email Notifications

### Welcome Email (Registration)
- Register a new account
- Check inbox for welcome email

### Enrollment Confirmation
- Complete a course enrollment
- Check inbox for confirmation

### Lead Notifications (Admin)
- Download a course brochure
- Check admin email (`ADMIN_NOTIFY_EMAIL`)

### Corporate Inquiry
- Submit corporate training form
- Check admin email for notification

---

## 🎯 Performance Testing

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Review scores for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### Load Time Testing
```bash
# Use curl to measure response time
curl -o /dev/null -s -w 'Total: %{time_total}s\n' http://localhost:3000
```

---

## 📝 Testing Checklist Summary

### Before Each Test Session
- [ ] `.env.local` configured
- [ ] Dependencies installed
- [ ] Prisma client generated
- [ ] Dev server running
- [ ] Browser open to localhost:3000

### After Each Test Session
- [ ] Document any bugs found
- [ ] Note any performance issues
- [ ] Check browser console for errors
- [ ] Review network tab for failed requests

---

## 🆘 Getting Help

**Documentation:**
- `README.md` - Full setup guide
- `ENV_SETUP.md` - Environment variables
- `DASHBOARD_TESTING_GUIDE.md` - Dashboard testing
- `RAZORPAY_TEST_CARDS.md` - Payment testing

**Check Logs:**
```bash
# Terminal logs (where you ran npm run dev)
# Browser console (F12 → Console tab)
# Network tab (F12 → Network tab)
```

**Common Log Locations:**
- Server errors: Terminal where `npm run dev` is running
- Client errors: Browser DevTools Console
- Network errors: Browser DevTools Network tab

---

## ✅ Ready to Test!

**Quick Start Command:**
```bash
npm run dev
```

Then open: **http://localhost:3000**

Happy testing! 🎉

---

**Last Updated:** January 24, 2026  
**Your Setup:** ✅ Ready (Node.js v22.13.1, npm v10.9.2, dependencies installed)

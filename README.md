# EduDubai - Premium Professional Education Platform

A production-ready MVP educational platform built with Next.js, TypeScript, Tailwind CSS, and modern web technologies. Similar to PwC Academy, EduDubai provides a comprehensive learning management system with course enrollment, payment processing, and lead capture.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Payments**: Razorpay
- **Email**: Resend
- **Authentication**: Supabase Auth
- **Database**: Supabase Postgres
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (for authentication and database)
- Razorpay account
- Resend account

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required environment variables:

- **Supabase**: Get your Project URL and Anon Key from Supabase dashboard
  - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
- **Razorpay**: Get your Key ID and Key Secret from Razorpay dashboard
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay Key ID (public, safe for client)
  - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (server-only, never expose to client)
  - `RAZORPAY_WEBHOOK_SECRET`: Webhook secret for signature verification
- **Resend**: Get your API key from Resend dashboard
  - `RESEND_API_KEY`: Your Resend API key
  - `ADMIN_NOTIFY_EMAIL`: Email address to receive lead notifications (default: training@edudubai.org)
- **Supabase Service Role** (for trainer applications):
  - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-only, never expose to client)
  - `TRAINER_UPLOAD_BUCKET`: Storage bucket name for trainer file uploads (default: trainer-uploads)
- **WhatsApp**: Your WhatsApp business number (optional)
  - `NEXT_PUBLIC_WHATSAPP_NUMBER`: Format: +919665642862 (with country code)
- **App URL**: Your application URL
  - `NEXT_PUBLIC_APP_URL`: Use `http://localhost:3000` for local development

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
edudubai_Website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (Razorpay webhook, etc.)
│   │   ├── courses/       # Course pages
│   │   ├── certifications/ # Certifications page
│   │   ├── corporate-training/ # Corporate training page
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── policies/      # Policies page
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...            # Feature components
│   ├── lib/              # Utility libraries
│   │   ├── data/         # In-memory seed data
│   │   ├── razorpay.ts   # Razorpay client
│   │   ├── resend.ts     # Resend client
│   │   ├── analytics.ts  # Analytics hooks
│   │   └── whatsapp.ts   # WhatsApp integration
│   └── server/           # Server actions
│       └── actions/      # Server-side functions
└── public/               # Static assets
```

## 🎨 Design System

The platform uses a clean corporate design with:
- **Primary Color**: Navy (#1e3a5f)
- **Accent Color**: Gold (#d4af37)
- **Background**: White/Neutral
- **Typography**: Inter (Google Fonts)
- **Mobile-first**: Responsive design for all screen sizes
- **Accessible**: WCAG compliant components

## 🔑 Key Features

### Course Delivery Formats
- **In-Person**: Traditional classroom training
- **Live Virtual**: Real-time online sessions
- **Self-Paced eLearning**: Learn at your own pace

### For Students
- Browse courses with delivery format badges
- Course enrollment with Razorpay payments
- Download course brochures (lead capture)
- Talk to Advisor via WhatsApp
- Personal dashboard with progress tracking

### For Organizations
- Corporate training solutions
- Customized program design
- Flexible delivery options
- Measurable ROI tracking

### Conversion Features
- Strong CTAs throughout the site
- WhatsApp integration for instant communication
- Lead capture forms (brochure downloads)
- Analytics event tracking (placeholder)

## 🔐 Authentication

EduDubai uses Supabase Auth for user authentication with email/password.

### Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in
   - Click "New Project"
   - Fill in project details (name, database password, region)
   - Wait for project to be created

2. **Get Your API Keys**:
   - Go to Project Settings → API
   - Copy your Project URL to `NEXT_PUBLIC_SUPABASE_URL`
   - Copy your `anon` `public` key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Enable Authentication Providers**:
   - Go to Authentication → Providers
   - **Enable "Email" provider** (for email/password authentication)
   - **Enable "Google" provider** (for Google OAuth):
     - Click on "Google" provider
     - Toggle it to "Enabled"
     - You'll need to add Google OAuth credentials:
       - **First, get your Supabase callback URL:**
         1. Go to your Supabase Dashboard
         2. Click on **Project Settings** (gear icon in sidebar)
         3. Go to **API** section
         4. Find your **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
         5. Your callback URL will be: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`
            - Replace `abcdefghijklmnop` with your actual project reference ID
            - The format is: `{YOUR_PROJECT_URL}/auth/v1/callback`
       - **Set up Google OAuth:**
         1. Go to [Google Cloud Console](https://console.cloud.google.com/)
         2. Create a new project or select existing one
         3. Enable **Google+ API** (or **Google Identity Services API**)
         4. Go to **APIs & Services** → **Credentials**
         5. Click **Create Credentials** → **OAuth 2.0 Client ID**
         6. Set Application type to **"Web application"**
         7. Add **Authorized redirect URIs**:
            - Paste your Supabase callback URL: `https://your-project-id.supabase.co/auth/v1/callback`
            - Example: `https://abcdefghijklmnop.supabase.co/auth/v1/callback`
         8. Click **Create**
         9. Copy the **Client ID** and **Client Secret**
       - **Add credentials to Supabase:**
         1. Go back to Supabase → Authentication → Providers → Google
         2. Paste the **Client ID** and **Client Secret** from Google Cloud Console
         3. Click **Save**
     - Configure email templates if needed

4. **Set Up Redirect URLs**:
   - Go to Authentication → URL Configuration
   - Add to "Redirect URLs":
     - `http://localhost:3000/**` (for local development)
     - `http://localhost:3000/auth/callback` (for OAuth callback)
     - `https://your-domain.com/**` (for production)
     - `https://your-domain.com/auth/callback` (for OAuth callback in production)
   - Add to "Site URL": `http://localhost:3000` (or your production URL)

5. **Create Profiles Table**:
   - Go to SQL Editor in Supabase Dashboard
   - Run the following SQL to create the profiles table:
   ```sql
   -- Create profiles table
   CREATE TABLE IF NOT EXISTS profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     full_name TEXT NOT NULL,
     phone TEXT,
     country TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Enable Row Level Security
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow users to read their own profile
   CREATE POLICY "Users can view own profile"
     ON profiles FOR SELECT
     USING (auth.uid() = id);

   -- Create policy to allow users to update their own profile
   CREATE POLICY "Users can update own profile"
     ON profiles FOR UPDATE
     USING (auth.uid() = id);

   -- Create policy to allow users to insert their own profile
   CREATE POLICY "Users can insert own profile"
     ON profiles FOR INSERT
     WITH CHECK (auth.uid() = id);

   -- Create function to automatically create profile on user signup
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.profiles (id, full_name)
     VALUES (
       NEW.id,
       COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   -- Create trigger to call function on user creation
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

   -- Create enrollments table
   CREATE TABLE IF NOT EXISTS enrollments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
     course_slug TEXT NOT NULL,
     course_title TEXT NOT NULL,
     delivery_mode TEXT NOT NULL,
     status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
     start_date DATE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Enable Row Level Security for enrollments
   ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow users to view their own enrollments
   CREATE POLICY "Users can view own enrollments"
     ON enrollments FOR SELECT
     USING (auth.uid() = user_id);

   -- Create policy to allow users to insert their own enrollments
   CREATE POLICY "Users can insert own enrollments"
     ON enrollments FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   -- Create payments table
   CREATE TABLE IF NOT EXISTS payments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
     provider TEXT NOT NULL DEFAULT 'RAZORPAY',
     order_id TEXT NOT NULL,
     payment_id TEXT NOT NULL,
     course_slug TEXT NOT NULL,
     amount_usd NUMERIC(10, 2) NOT NULL,
     currency TEXT NOT NULL DEFAULT 'USD',
     status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('SUCCESS', 'FAILED', 'PENDING')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Enable Row Level Security for payments
   ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow users to view their own payments
   CREATE POLICY "Users can view own payments"
     ON payments FOR SELECT
     USING (auth.uid() = user_id);

   -- Create policy to allow users to insert their own payments
   CREATE POLICY "Users can insert own payments"
     ON payments FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   -- Create support_requests table
   CREATE TABLE IF NOT EXISTS support_requests (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
     subject TEXT NOT NULL,
     message TEXT NOT NULL,
     status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Enable Row Level Security for support_requests
   ALTER TABLE support_requests ENABLE ROW LEVEL SECURITY;

   -- Create policy to allow users to view their own support requests
   CREATE POLICY "Users can view own support requests"
     ON support_requests FOR SELECT
     USING (auth.uid() = user_id);

   -- Create policy to allow users to insert their own support requests
   CREATE POLICY "Users can insert own support requests"
     ON support_requests FOR INSERT
     WITH CHECK (auth.uid() = user_id);

   -- Create indexes for better query performance
   CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON enrollments(user_id);
   CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
   CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
   CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
   CREATE INDEX IF NOT EXISTS idx_support_requests_user_id ON support_requests(user_id);
   CREATE INDEX IF NOT EXISTS idx_support_requests_status ON support_requests(status);
   ```

7. **Create Trainer Applications Table**:
   Run this SQL in your Supabase SQL Editor to create the `trainer_applications` table:

   ```sql
   -- Create trainer_applications table
   CREATE TABLE IF NOT EXISTS trainer_applications (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'REVIEWED', 'APPROVED', 'REJECTED')),
     full_name TEXT NOT NULL,
     email TEXT NOT NULL,
     phone TEXT NOT NULL,
     country TEXT NOT NULL,
     linkedin_url TEXT NOT NULL,
     portfolio_url TEXT,
     "current_role" TEXT NOT NULL,
     experience_years INTEGER NOT NULL,
     training_years INTEGER NOT NULL,
     specializations TEXT[] NOT NULL,
     delivery_modes TEXT[] NOT NULL,
     regions TEXT[] NOT NULL,
     certifications TEXT NOT NULL,
     summary TEXT NOT NULL,
     languages TEXT[] NOT NULL,
     regulated_entities BOOLEAN NOT NULL,
     creates_assessments BOOLEAN NOT NULL,
     availability TEXT NOT NULL,
     fee_model TEXT NOT NULL,
     rate_currency TEXT NOT NULL,
     rate_min INTEGER NOT NULL,
     rate_max INTEGER,
     start_date DATE,
     notes TEXT,
     cv_file_url TEXT NOT NULL,
     sample_deck_url TEXT,
     consent BOOLEAN NOT NULL
   );

   -- Create index for status queries
   CREATE INDEX IF NOT EXISTS idx_trainer_applications_status ON trainer_applications(status);
   CREATE INDEX IF NOT EXISTS idx_trainer_applications_created_at ON trainer_applications(created_at);
   ```

8. **Create Supabase Storage Bucket**:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `trainer-uploads`
   - Set it to **Private** (not public) - this is important for security
   - The bucket will be accessed via signed URLs generated by the API route `/api/trainer/files/[filename]`
   - No RLS policies are needed since we're using the service role key for server-side operations

6. **Environment Variables**:
   - Add to your `.env.local`:
     ```bash
     NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
     ```

### Authentication Features

- **Register**: Users can create accounts with email, password, and full name
- **Login**: Email/password authentication
- **Logout**: Secure session termination
- **Forgot Password**: Password reset via email
- **Protected Routes**: `/dashboard` requires authentication
- **Session Management**: Automatic session refresh via middleware
- **User Profile**: Automatically created on registration

### Auth Flow

1. **Registration**:
   - User fills out registration form
   - Account is created in Supabase Auth
   - Profile is automatically created in `profiles` table
   - User is redirected to dashboard or `next` parameter

2. **Login**:
   - User enters email and password
   - Session is created and stored in cookies
   - User is redirected to dashboard or `next` parameter

3. **Protected Routes**:
   - Middleware checks authentication status
   - Unauthenticated users are redirected to `/auth/login?next=/dashboard`
   - Authenticated users can access protected routes

4. **Enrollment**:
   - "Enroll Now" button checks authentication
   - Unauthenticated users are redirected to `/auth/register?next=/courses/[slug]`
   - Authenticated users proceed to payment flow

## 📊 Dashboard

The dashboard provides a comprehensive portal for logged-in users to manage their learning journey.

### Dashboard Features

- **Overview** (`/dashboard`):
  - Welcome card with user name
  - Quick stats: Active courses, Completed courses, Payment count
  - "Continue Learning" card showing the most recent active enrollment

- **My Courses** (`/dashboard/courses`):
  - Table/card view of all enrollments
  - Status badges (Active, Completed, Cancelled)
  - Delivery mode badges
  - Links to course detail pages

- **Payments** (`/dashboard/payments`):
  - Payment history with order IDs and payment IDs
  - Status badges (Success, Failed, Pending)
  - Amount and currency display
  - Download invoice button (placeholder for future implementation)

- **Profile** (`/dashboard/profile`):
  - Editable profile information
  - Update full name, phone, and country
  - Email is read-only (managed by Supabase Auth)

- **Support** (`/dashboard/support`):
  - Submit support requests with subject and message
  - View support request history
  - Status tracking (Open, In Progress, Resolved, Closed)

### Dashboard Layout

- **Desktop**: Fixed left sidebar with navigation
- **Mobile**: Collapsible sidebar using Sheet component
- **Top Bar**: User menu with avatar dropdown
- **Protected Routes**: All dashboard routes require authentication

### Database Tables

The dashboard uses three main tables (created via SQL in Supabase):

1. **enrollments**: Tracks user course enrollments
2. **payments**: Stores payment records from Razorpay
3. **support_requests**: Manages user support tickets

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## 💳 Payments

Razorpay integration handles:
- One-time course payments
- Secure checkout with server-side order creation
- Payment signature verification on server
- Payment webhook processing
- Automatic enrollment upon successful payment

### Razorpay Setup

1. **Get API Keys**:
   - Log in to your Razorpay Dashboard
   - Go to Settings → API Keys
   - Generate test keys (or live keys for production)
   - Copy Key ID and Key Secret

2. **Environment Variables**:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay Key ID (public, safe for client)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (server-only, never expose to client)
   - `RAZORPAY_WEBHOOK_SECRET`: Webhook secret for signature verification

3. **Webhook Configuration**:
   - In Razorpay Dashboard, go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
   - Select events: `payment.captured`
   - Copy the webhook secret to your environment variables

### Payment Flow

1. User clicks "Enroll Now" on a course
2. Server creates a Razorpay order (server-side)
3. Client opens Razorpay checkout modal
4. User completes payment
5. Payment response is sent to `/api/payments/verify`
6. Server verifies payment signature
7. Enrollment is created and email is sent

## 📧 Email Notifications

Resend is used for:
- Welcome emails
- Enrollment confirmations
- Lead capture notifications (brochure requests, contact forms, corporate training inquiries)
- Course completion certificates (future)

### Resend Setup

1. **Create a Resend Account**:
   - Sign up at [resend.com](https://resend.com)
   - Verify your domain (or use the default `onboarding@resend.dev` for testing)

2. **Get Your API Key**:
   - Go to API Keys in your Resend dashboard
   - Create a new API key
   - Copy it to `RESEND_API_KEY` in your `.env.local`

3. **Configure Admin Email**:
   - Set `ADMIN_NOTIFY_EMAIL` to the email address where you want to receive lead notifications
   - Default: `training@edudubai.org`

### Lead Capture Forms

The platform includes three types of lead capture forms:

1. **Contact Form** (`/contact`):
   - Sends notification to admin email
   - Includes name, email, phone, company, and message

2. **Corporate Training Form** (`/corporate`):
   - Sends notification to admin email
   - Sends confirmation email to the lead
   - Includes company details, training needs, and preferred delivery format

3. **Brochure Download** (Course detail pages):
   - Sends notification to admin email
   - Sends brochure email to the lead with course information
   - Includes course-specific details and links

All forms use Zod validation and return user-friendly error messages.

## 📊 Analytics

Analytics hooks are implemented as placeholders. To integrate with your analytics provider:

1. Update `src/lib/analytics.ts`
2. Add your analytics SDK (Google Analytics, Mixpanel, etc.)
3. Uncomment the relevant tracking code

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `ADMIN_NOTIFY_EMAIL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_APP_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (for trainer application file uploads)
- `TRAINER_UPLOAD_BUCKET` (optional, defaults to trainer-uploads)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Razorpay Setup
1. Create a Razorpay account
2. Get your Key ID and Key Secret from the dashboard
3. Set up webhook endpoint
4. Use test mode for development (test keys start with `rzp_test_`)

### Resend Setup
1. Create a Resend account at [resend.com](https://resend.com)
2. Verify your domain (or use default `onboarding@resend.dev` for testing)
3. Get your API key from the dashboard
4. Set `RESEND_API_KEY` and `ADMIN_NOTIFY_EMAIL` in your `.env.local`
5. Email templates are in `src/lib/email.ts` - customize as needed

### WhatsApp Setup
1. Get your WhatsApp Business number
2. Add to `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variable
3. Format: `+971501234567` (with country code)

## 📄 Pages

- **Home** (`/`) - Hero section, features, featured courses
- **Courses** (`/courses`) - Course catalog with filters
- **Course Detail** (`/courses/[slug]`) - Individual course page
- **Certifications** (`/certifications`) - Professional certifications
- **Corporate Training** (`/corporate-training`) - Enterprise solutions
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and information
- **Policies** (`/policies`) - Privacy, Terms, Refund policies
- **Auth Pages**:
  - `/auth/login` - User login
  - `/auth/register` - User registration
  - `/auth/forgot-password` - Password reset request
  - `/auth/reset-password` - Password reset confirmation
- **Dashboard** (`/dashboard`) - User dashboard (protected, requires login)
- **Become a Trainer** (`/become-a-trainer`) - Trainer application form

## 🆘 Support

For issues or questions, please contact the development team.

---

Built with ❤️ for premium professional education

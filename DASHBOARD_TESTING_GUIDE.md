# Dashboard Testing Guide

Follow these steps to verify all dashboard pages are working correctly.

## Prerequisites
- ✅ You're logged in to the application
- ✅ Database tables are created (`enrollments`, `payments`, `support_requests`, `profiles`)
- ✅ RLS policies are set up

---

## Test 1: Overview Page (`/dashboard`)

### Steps:
1. **Navigate to Dashboard**
   - Log in to your account
   - Click "Dashboard" in the user menu or navigate to `/dashboard`
   - ✅ Should see: Welcome message with your name
   - ✅ Should see: Stats cards showing:
     - Active Courses count
     - Completed Courses count
     - Payments count

2. **Check "Continue Learning" Card**
   - If you have an ACTIVE enrollment:
     - ✅ Should see: Course title, delivery mode, status badge
     - ✅ Should see: "Continue Learning" button
   - If you have NO active enrollments:
     - ✅ Should see: "No active courses" message

### Expected Results:
- ✅ Page loads without errors
- ✅ Your name appears in welcome message
- ✅ Stats show correct numbers (may be 0 if no data)
- ✅ No console errors

---

## Test 2: My Courses Page (`/dashboard/courses`)

### Steps:
1. **View Enrollments**
   - Click "My Courses" in sidebar
   - Navigate to `/dashboard/courses`
   - ✅ Should see: Table with columns:
     - Course Title
     - Delivery Mode
     - Status
     - Start Date
     - Actions

2. **Check Empty State**
   - If you have NO enrollments:
     - ✅ Should see: "No enrollments found" message
     - ✅ Should see: "Browse Courses" button

3. **Check with Data** (if you have enrollments)
   - ✅ Status badges show correctly:
     - ACTIVE = Green badge
     - COMPLETED = Gold badge
     - CANCELLED = Red badge
   - ✅ Delivery mode badges show correctly
   - ✅ "View Course Details" button links to `/courses/[slug]`

### Expected Results:
- ✅ Page loads without errors
- ✅ Table displays correctly (even if empty)
- ✅ Badges render with correct colors
- ✅ No console errors

---

## Test 3: Payments Page (`/dashboard/payments`)

### Steps:
1. **View Payments**
   - Click "Payments" in sidebar
   - Navigate to `/dashboard/payments`
   - ✅ Should see: Table with columns:
     - Order ID
     - Payment ID
     - Course
     - Amount
     - Status
     - Date
     - Actions

2. **Check Empty State**
   - If you have NO payments:
     - ✅ Should see: "No payments found" message

3. **Check with Data** (if you have payments)
   - ✅ Status badges show correctly:
     - SUCCESS = Green badge
     - FAILED = Red badge
     - PENDING = Yellow badge
   - ✅ Amount is formatted correctly (e.g., "$100.00 USD")
   - ✅ Dates are formatted correctly
   - ✅ "Download Invoice" button is visible (placeholder)

### Expected Results:
- ✅ Page loads without errors
- ✅ Table displays correctly (even if empty)
- ✅ Amount formatting works
- ✅ No console errors

---

## Test 4: Profile Page (`/dashboard/profile`)

### Steps:
1. **View Profile**
   - Click "Profile" in sidebar
   - Navigate to `/dashboard/profile`
   - ✅ Should see: Form with fields:
     - Full Name (pre-filled)
     - Email (read-only, from auth)
     - Phone (editable)
     - Country (editable)

2. **Edit Profile**
   - Change "Phone" field (e.g., "+971501234567")
   - Change "Country" field (e.g., "MENA")
   - Click "Save Changes" button
   - ✅ Should see: Loading spinner
   - ✅ Should see: Success message "Profile updated successfully"
   - ✅ Should see: Form fields update with new values

3. **Verify Data Persists**
   - Refresh the page
   - ✅ Should see: Your saved phone and country values

### Expected Results:
- ✅ Page loads with your profile data
- ✅ Form fields are editable
- ✅ Save button works
- ✅ Success message appears
- ✅ Data persists after refresh
- ✅ No console errors

---

## Test 5: Support Page (`/dashboard/support`)

### Steps:
1. **View Support Requests**
   - Click "Support" in sidebar
   - Navigate to `/dashboard/support`
   - ✅ Should see: Form to create new request
   - ✅ Should see: List of previous requests (if any)

2. **Create Support Request**
   - Fill in "Subject" field (e.g., "Course Access Issue")
   - Fill in "Message" field (e.g., "I cannot access my course materials")
   - Click "Submit Request" button
   - ✅ Should see: Loading spinner
   - ✅ Should see: Success message "Support request submitted successfully"
   - ✅ Should see: New request appears in the list above
   - ✅ Should see: Status badge shows "OPEN"

3. **View Request List**
   - ✅ Should see: Previous requests with:
     - Subject
     - Status badge (OPEN, CLOSED, IN_PROGRESS)
     - Date created
   - ✅ Requests are sorted by date (newest first)

### Expected Results:
- ✅ Page loads without errors
- ✅ Form submission works
- ✅ New requests appear in list
- ✅ Status badges display correctly
- ✅ No console errors

---

## Test 6: Navigation & Layout

### Steps:
1. **Sidebar Navigation**
   - ✅ All 5 menu items are visible:
     - Overview
     - My Courses
     - Payments
     - Profile
     - Support
   - ✅ Active page is highlighted (blue background, white text)
   - ✅ Clicking each item navigates correctly

2. **Mobile View** (if testing on mobile/resize browser)
   - ✅ Sidebar collapses into hamburger menu
   - ✅ Sheet menu opens when clicked
   - ✅ All navigation items work in mobile menu

3. **Topbar**
   - ✅ User menu is visible
   - ✅ "Dashboard" link works
   - ✅ "Logout" button works

### Expected Results:
- ✅ Navigation works smoothly
- ✅ Active state highlights correctly
- ✅ Mobile menu functions properly
- ✅ No navigation errors

---

## Test 7: Data Integration Test

### Steps:
1. **Create Test Data** (via Supabase Dashboard or API)
   - Create an enrollment:
     ```sql
     INSERT INTO enrollments (user_id, course_slug, course_title, delivery_mode, status)
     VALUES ('your-user-id', 'test-course', 'Test Course', 'Online', 'ACTIVE');
     ```
   - Create a payment:
     ```sql
     INSERT INTO payments (user_id, provider, order_id, payment_id, course_slug, amount_usd, currency, status)
     VALUES ('your-user-id', 'RAZORPAY', 'order_123', 'pay_123', 'test-course', 100.00, 'USD', 'SUCCESS');
     ```

2. **Verify Data Appears**
   - Go to Overview: ✅ Stats update
   - Go to My Courses: ✅ Enrollment appears
   - Go to Payments: ✅ Payment appears

### Expected Results:
- ✅ Data from database displays correctly
- ✅ All pages show updated information
- ✅ No data fetching errors

---

## Troubleshooting

### If pages show errors:

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for red error messages
   - Check Network tab for failed requests

2. **Check Server Logs**
   - Look at terminal where `npm run dev` is running
   - Check for Supabase errors
   - Check for database query errors

3. **Common Issues:**
   - **"Table doesn't exist"**: Run SQL migrations from README
   - **"RLS policy violation"**: Check RLS policies allow user to read their own data
   - **"No data showing"**: Verify data exists in Supabase tables
   - **"Authentication error"**: Check if you're logged in

4. **Verify Database Setup:**
   ```sql
   -- Check if tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('enrollments', 'payments', 'support_requests', 'profiles');
   
   -- Check if you have data
   SELECT COUNT(*) FROM enrollments WHERE user_id = 'your-user-id';
   SELECT COUNT(*) FROM payments WHERE user_id = 'your-user-id';
   SELECT COUNT(*) FROM support_requests WHERE user_id = 'your-user-id';
   ```

---

## Quick Test Checklist

- [ ] Overview page loads and shows stats
- [ ] My Courses page shows enrollments (or empty state)
- [ ] Payments page shows payments (or empty state)
- [ ] Profile page loads and can be edited
- [ ] Support page can create new requests
- [ ] Navigation between pages works
- [ ] Active page is highlighted in sidebar
- [ ] No console errors
- [ ] Data persists after refresh
- [ ] Mobile menu works (if applicable)

---

## Success Criteria

✅ All pages load without errors
✅ All forms submit successfully
✅ Data displays correctly from database
✅ Navigation works smoothly
✅ Empty states show when no data
✅ Success messages appear after actions
✅ No console or server errors

If all tests pass, your dashboard is working perfectly! 🎉


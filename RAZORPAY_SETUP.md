# Razorpay Payment Integration Guide

## Overview

EduDubai uses Razorpay for payment processing with a secure server-side implementation that never exposes the key secret to the client.

## Architecture

### Security Principles
- ✅ **Key Secret**: Only used on server, never exposed to client
- ✅ **Key ID**: Public key, safe to use on client (`NEXT_PUBLIC_RAZORPAY_KEY_ID`)
- ✅ **Order Creation**: Server-side only
- ✅ **Signature Verification**: Server-side only

### Payment Flow

1. **User clicks "Enroll Now"**
   - Client component: `src/components/enroll-button.tsx`

2. **Server creates Razorpay order**
   - Server action: `createRazorpayOrder()` in `src/server/actions/payments.ts`
   - Creates order using Razorpay SDK (server-side)
   - Stores metadata in memory (courseId, userId)

3. **Client opens Razorpay checkout**
   - Loads Razorpay checkout script
   - Opens modal with order details
   - User completes payment

4. **Payment verification**
   - Client sends payment response to `/api/payments/verify`
   - Server verifies signature using `verifyPaymentSignature()`
   - Creates enrollment and sends email

5. **Webhook (optional backup)**
   - Razorpay sends webhook to `/api/webhooks/razorpay`
   - Server verifies webhook signature
   - Processes payment if not already processed

## File Structure

```
src/
├── lib/
│   └── razorpay.ts              # Razorpay client & signature verification
├── server/
│   └── actions/
│       └── payments.ts          # Server actions (order creation, verification)
├── components/
│   └── enroll-button.tsx        # Client component with Razorpay checkout
└── app/
    └── api/
        ├── payments/
        │   └── verify/
        │       └── route.ts     # Payment verification endpoint
        └── webhooks/
            └── razorpay/
                └── route.ts     # Webhook handler
```

## Environment Variables

```env
# Public (safe for client)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx

# Private (server-only, never expose)
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx
```

## Testing

### Test Mode
- Use test keys (start with `rzp_test_`)
- Test cards: https://razorpay.com/docs/payments/test-cards/

### Test Flow
1. Start dev server: `npm run dev`
2. Navigate to a course page
3. Click "Enroll Now"
4. Use test card: `4111 1111 1111 1111`
5. Any future expiry date
6. Any CVV

## Production Checklist

- [ ] Replace test keys with live keys
- [ ] Update `NEXT_PUBLIC_RAZORPAY_KEY_ID` with live key
- [ ] Update `RAZORPAY_KEY_SECRET` with live secret
- [ ] Set up webhook in Razorpay dashboard
- [ ] Update `RAZORPAY_WEBHOOK_SECRET`
- [ ] Test payment flow end-to-end
- [ ] Verify webhook is receiving events

## Important Notes

1. **Never expose `RAZORPAY_KEY_SECRET`** to the client
2. **Always verify signatures** on the server
3. **Store payment metadata** securely (currently in memory, should move to DB)
4. **Handle payment failures** gracefully
5. **Webhook is backup** - primary verification happens in payment handler

## Troubleshooting

### Payment not processing
- Check Razorpay dashboard for order status
- Verify environment variables are set correctly
- Check server logs for errors
- Ensure webhook secret matches Razorpay dashboard

### Signature verification fails
- Verify `RAZORPAY_KEY_SECRET` is correct
- Check order ID and payment ID match
- Ensure signature is not modified before verification

### Webhook not receiving events
- Verify webhook URL is accessible
- Check webhook secret matches
- Ensure webhook is enabled in Razorpay dashboard


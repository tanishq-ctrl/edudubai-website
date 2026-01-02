# Razorpay Test Cards

Use these test card numbers when testing payments in Razorpay test mode.

## ✅ Successful Payment Cards

### Visa
- **Card Number:** `4111 1111 1111 1111`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **Name:** Any name

### Mastercard
- **Card Number:** `5555 5555 5555 4444`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **Name:** Any name

### RuPay
- **Card Number:** `6074 8200 0000 0009`
- **CVV:** Any 3 digits (e.g., `123`)
- **Expiry:** Any future date (e.g., `12/25`)
- **Name:** Any name

## ❌ Failed Payment Cards

### Card Declined
- **Card Number:** `4000 0000 0000 0002`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Payment will be declined

### Insufficient Funds
- **Card Number:** `4000 0000 0000 9995`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Insufficient funds error

### Authentication Required (3D Secure)
- **Card Number:** `4000 0025 0000 3155`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **Result:** Will trigger 3D Secure authentication
- **OTP:** Use `123456` for authentication

## 🔐 3D Secure Test Cards

### Visa 3D Secure
- **Card Number:** `4000 0025 0000 3155`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **OTP:** `123456`

### Mastercard 3D Secure
- **Card Number:** `5555 5555 5555 4444`
- **CVV:** Any 3 digits
- **Expiry:** Any future date
- **OTP:** `123456`

## 📱 UPI Test Details

### UPI ID
- **UPI ID:** `success@razorpay`
- **Result:** Payment will succeed

### UPI ID (Failure)
- **UPI ID:** `failure@razorpay`
- **Result:** Payment will fail

## 🌐 Netbanking Test

- Select any bank from the list
- Use any credentials
- Payment will be successful in test mode

## 💳 Wallet Test

- Select any wallet (Paytm, Freecharge, etc.)
- Use any credentials
- Payment will be successful in test mode

## ⚠️ Important Notes

1. **Test Mode Only:** These cards only work in Razorpay test mode
2. **No Real Charges:** No actual money will be deducted
3. **CVV:** Use any 3 digits (e.g., `123`, `456`)
4. **Expiry:** Use any future date (e.g., `12/25`, `01/26`)
5. **Name:** Use any name (e.g., `Test User`)
6. **OTP:** For 3D Secure, always use `123456`

## 🚀 Quick Test

**Easiest test card:**
- **Card:** `4111 1111 1111 1111`
- **CVV:** `123`
- **Expiry:** `12/25`
- **Name:** `Test User`

This will process successfully without 3D Secure.

## 🔍 Troubleshooting

### "Invalid card number" error
- Make sure you're using Razorpay **test mode** keys
- Check that you're using one of the test card numbers above
- Ensure no spaces or dashes in card number (Razorpay handles this automatically)

### "Card declined" error
- You might have used a failure test card (like `4000 0000 0000 0002`)
- Switch to a success card like `4111 1111 1111 1111`

### Payment not processing
- Check your Razorpay test keys are correct
- Verify you're using test mode (not live mode)
- Check browser console for errors


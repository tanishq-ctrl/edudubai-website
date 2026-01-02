#!/bin/bash

# EduDubai Environment Setup Script
# This script helps you set up your .env.local file

echo "🚀 EduDubai Environment Setup"
echo "=============================="
echo ""

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists!"
    read -p "Do you want to overwrite it? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "❌ Setup cancelled."
        exit 0
    fi
fi

# Copy .env.example to .env.local
if [ -f ".env.example" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
else
    echo "❌ .env.example not found. Creating from template..."
    cat > .env.local << 'EOF'
# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
USD_TO_INR_RATE=83.33

# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_NOTIFY_EMAIL=training@edudubai.org

# WhatsApp Integration (Optional)
NEXT_PUBLIC_WHATSAPP_NUMBER=+971501234567
EOF
    echo "✅ Created .env.local from template"
fi

echo ""
echo "📝 Next Steps:"
echo "1. Open .env.local in your editor"
echo "2. Fill in your actual API keys and credentials"
echo "3. See ENV_SETUP.md for detailed instructions"
echo ""
echo "🔐 Important: Never commit .env.local to Git!"
echo ""
echo "✨ Setup complete! Edit .env.local with your credentials."


import type { Metadata } from "next"
import { SignInForm } from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
}

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Sign In</h1>
        <p className="text-gray-600">Welcome back to EduDubai</p>
      </div>
      <SignInForm />
    </div>
  )
}


import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Create Account</h1>
        <p className="text-gray-600">Start your learning journey today</p>
      </div>
      <SignUpForm />
    </div>
  )
}


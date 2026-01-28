import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-brand-gold" />
              <span className="text-xl font-bold">EduDubai</span>
            </Link>
            <p className="text-white/80 text-sm">
              Premium professional education for career advancement
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/courses" className="hover:text-brand-gold transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses?level=beginner" className="hover:text-brand-gold transition-colors">
                  Beginner
                </Link>
              </li>
              <li>
                <Link href="/courses?level=intermediate" className="hover:text-brand-gold transition-colors">
                  Intermediate
                </Link>
              </li>
              <li>
                <Link href="/courses?level=advanced" className="hover:text-brand-gold transition-colors">
                  Advanced
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-brand-gold transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/corporate-training" className="hover:text-brand-gold transition-colors">
                  Corporate Training
                </Link>
              </li>

            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-brand-gold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/policies/privacy" className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-brand-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-brand-gold transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} EduDubai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


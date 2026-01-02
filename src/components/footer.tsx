import Link from "next/link"
import { BookOpen } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-gold" />
              <span className="text-xl font-bold">EduDubai</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Premium professional education for career advancement
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/courses" className="hover:text-gold transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses?level=beginner" className="hover:text-gold transition-colors">
                  Beginner
                </Link>
              </li>
              <li>
                <Link href="/courses?level=intermediate" className="hover:text-gold transition-colors">
                  Intermediate
                </Link>
              </li>
              <li>
                <Link href="/courses?level=advanced" className="hover:text-gold transition-colors">
                  Advanced
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-gold transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/corporate-training" className="hover:text-gold transition-colors">
                  Corporate Training
                </Link>
              </li>
              <li>
                <Link href="/policies" className="hover:text-gold transition-colors">
                  Policies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/help" className="hover:text-gold transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} EduDubai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


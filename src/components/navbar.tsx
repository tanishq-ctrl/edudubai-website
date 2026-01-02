"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { BookOpen } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-navy" />
            <span className="text-xl font-bold text-navy">EduDubai</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-navy">
              Courses
            </Link>
            <Link href="/certifications" className="text-sm font-medium text-gray-700 hover:text-navy">
              Certifications
            </Link>
            <Link href="/corporate-training" className="text-sm font-medium text-gray-700 hover:text-navy">
              Corporate Training
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-navy">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-navy">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <WhatsAppButton source="navbar" variant="outline" size="sm" />
            <Button asChild variant="gold">
              <Link href="/courses">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}


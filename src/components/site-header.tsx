"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X, BookOpen } from "lucide-react"
import { Container } from "@/components/container"
import { openWhatsApp } from "@/lib/whatsapp"
import { trackWhatsAppClick } from "@/lib/analytics"
import { UserMenu } from "@/components/user-menu"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Certifications", href: "/certifications" },
  { name: "Corporate", href: "/corporate-training" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  // Pages that should have transparent navbar when not scrolled
  const transparentNavPages = [
    "/",
    "/courses",
    "/certifications",
    "/corporate-training",
    "/about",
    "/contact",
  ]
  const shouldHaveTransparentNav = transparentNavPages.includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setAuthLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleWhatsAppClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    trackWhatsAppClick("header")
    openWhatsApp("I&apos;m interested in learning more about EduDubai courses.")
  }

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${shouldHaveTransparentNav && !isScrolled
      ? "bg-transparent backdrop-blur-sm"
      : "bg-neutral-bg border-b border-neutral-border shadow-sm"
    }
  `

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {!logoError ? (
              <div className="relative h-12 w-auto">
                <img
                  src="/edudubai-logo.png"
                  alt="EduDubai - Global Education and Training Specialist"
                  className={`h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-90 ${
                    // White logo on dark background (transparent nav pages not scrolled)
                    shouldHaveTransparentNav && !isScrolled
                      ? "brightness-0 invert"
                      : // Dark logo on light background (scrolled or other pages)
                        "brightness-0"
                  }`}
                  style={{ 
                    backgroundColor: 'transparent',
                    display: 'block',
                  }}
                  onError={() => setLogoError(true)}
                />
              </div>
            ) : (
              <>
                <BookOpen className={`h-7 w-7 transition-colors ${
                  shouldHaveTransparentNav && !isScrolled
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                    : "text-brand-gold group-hover:text-brand-gold-light"
                }`} />
                <span className={`text-2xl font-bold transition-colors ${
                  shouldHaveTransparentNav && !isScrolled 
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    : "text-brand-navy"
                }`}>
                  EduDubai
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    text-sm font-medium transition-colors relative
                    ${shouldHaveTransparentNav && !isScrolled
                      ? "text-white/90 hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      : "text-neutral-text hover:text-brand-navy"
                    }
                    ${isActive && (shouldHaveTransparentNav && !isScrolled) ? "text-white" : isActive ? "text-brand-navy" : ""}
                  `}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      shouldHaveTransparentNav && !isScrolled
                        ? "bg-white"
                        : "bg-brand-gold"
                    }`} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              asChild
              variant="ghost"
              className={`
                text-sm font-medium
                ${shouldHaveTransparentNav && !isScrolled
                  ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  : "text-neutral-text hover:text-brand-navy"
                }
              `}
            >
              <Link href="/become-a-trainer">Become a Trainer</Link>
            </Button>
            {!authLoading && (
              user ? (
                <UserMenu />
              ) : (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className={`
                      text-sm font-medium
                      ${shouldHaveTransparentNav && !isScrolled
                        ? "text-white/90 hover:text-white hover:bg-white/10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                        : "text-neutral-text hover:text-brand-navy"
                      }
                    `}
                  >
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
                  >
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={`
                  ${shouldHaveTransparentNav && !isScrolled 
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" 
                    : "text-neutral-text"}
                `}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        text-base font-medium transition-colors
                        ${isActive ? "text-brand-navy" : "text-neutral-text"}
                        hover:text-brand-navy
                      `}
                    >
                      {item.name}
                    </Link>
                  )
                })}
                <div className="pt-6 border-t border-neutral-border space-y-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/become-a-trainer">Become a Trainer</Link>
                  </Button>
                  {!authLoading && (
                    user ? (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link href="/dashboard">Dashboard</Link>
                        </Button>
                        <UserMenu />
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link href="/auth/login">Login</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold-light font-semibold"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link href="/auth/register">Register</Link>
                        </Button>
                      </>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  )
}


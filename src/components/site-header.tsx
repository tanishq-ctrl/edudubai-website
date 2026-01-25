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
import { Menu, BookOpen } from "lucide-react"
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
  { name: "Events", href: "/events" },
  { name: "Corporate", href: "/corporate-training" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

import { HeaderLogo } from "@/components/layout/header-logo"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const transparentNavPages = [
    "/",
    "/courses",
    "/certifications",
    "/corporate-training",
    "/events",
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
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setAuthLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${shouldHaveTransparentNav && !isScrolled
      ? "bg-black/10 backdrop-blur-md"
      : "bg-neutral-bg border-b border-neutral-border shadow-sm"
    }
  `

  return (
    <header className={headerClasses}>
      <Container>
        <div className="flex h-20 items-center justify-between">
          <HeaderLogo
            isTransparent={shouldHaveTransparentNav}
            isScrolled={isScrolled}
            logoError={logoError}
            setLogoError={setLogoError}
          />


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
                    text-sm font-semibold transition-colors relative
                    ${shouldHaveTransparentNav && !isScrolled
                      ? "text-white hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                      : "text-neutral-text hover:text-brand-navy"
                    }
                    ${isActive && (shouldHaveTransparentNav && !isScrolled) ? "text-white font-bold" : isActive ? "text-brand-navy" : ""}
                  `}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${shouldHaveTransparentNav && !isScrolled
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
                text-sm font-semibold
                ${shouldHaveTransparentNav && !isScrolled
                  ? "text-white hover:text-white hover:bg-white/10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
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
                      text-sm font-semibold
                      ${shouldHaveTransparentNav && !isScrolled
                        ? "text-white hover:text-white hover:bg-white/10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
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
                    ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                    : "text-neutral-text"}
                `}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-neutral-bg">
              <div className="flex flex-col space-y-6 mt-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        text-base font-medium transition-colors
                        ${isActive ? "text-brand-navy font-semibold" : "text-neutral-text"}
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
                    className="w-full border-neutral-border text-neutral-text hover:text-brand-navy hover:bg-neutral-bg-subtle"
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
                          className="w-full border-neutral-border text-neutral-text hover:text-brand-navy hover:bg-neutral-bg-subtle"
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
                          className="w-full border-neutral-border text-neutral-text hover:text-brand-navy hover:bg-neutral-bg-subtle"
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


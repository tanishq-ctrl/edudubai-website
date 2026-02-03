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
import { ChevronDown } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Global Certifications",
    href: "/courses",
    subItems: [
      { name: "ACAMS", href: "/courses?body=ACAMS" },
      { name: "GCI", href: "/courses?body=GCI" },
      { name: "Hock International", href: "/courses?body=HOCK_INTERNATIONAL" },
    ]
  },
  { name: "Corporate Training", href: "/corporate-training" },
  { name: "About Us", href: "/about" },
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
    "/become-a-trainer",
  ]
  const isCoursePage = pathname.startsWith("/courses/")
  const shouldHaveTransparentNav = transparentNavPages.includes(pathname) || isCoursePage

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

              if (item.subItems) {
                return (
                  <div key={item.name} className="relative group py-2">
                    <button
                      className={`
                        text-sm font-semibold transition-colors relative flex items-center gap-1
                        ${shouldHaveTransparentNav && !isScrolled
                          ? "text-white hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                          : "text-neutral-text hover:text-brand-navy"
                        }
                        ${isActive && (shouldHaveTransparentNav && !isScrolled) ? "text-white font-bold" : isActive ? "text-brand-navy" : ""}
                      `}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                      {isActive && (
                        <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${shouldHaveTransparentNav && !isScrolled
                          ? "bg-white"
                          : "bg-brand-gold"
                          }`} />
                      )}
                    </button>

                    {/* Hover Dropdown */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                      <div className="w-64 bg-white border border-neutral-border p-2 shadow-2xl rounded-xl">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="w-full px-4 py-3 text-sm font-medium text-neutral-text hover:bg-neutral-bg-subtle hover:text-brand-navy rounded-lg transition-all flex items-center justify-between group/item"
                          >
                            {sub.name}
                            <BookOpen className="h-4 w-4 opacity-0 group-hover/item:opacity-40 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

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

                  if (item.subItems) {
                    return (
                      <div key={item.name} className="flex flex-col space-y-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-text-muted px-1">
                          {item.name}
                        </span>
                        <div className="flex flex-col space-y-3 pl-4 border-l border-neutral-border">
                          {item.subItems.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-base font-medium text-neutral-text hover:text-brand-navy"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  }

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


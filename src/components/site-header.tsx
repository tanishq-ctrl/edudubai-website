"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import type { User } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Container } from "@/components/container"
import { UserMenu } from "@/components/user-menu"
import { HeaderLogo } from "@/components/layout/header-logo"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type NavItem = {
  name: string
  href: string
  subItems?: { name: string; href: string; blurb?: string }[]
}

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  // No dropdown: its three entries were "all courses" plus two issuing-body
  // filters, which is the catalogue's own job. The body filter now lives in the
  // panel on /courses, where it composes with category, level and format
  // instead of replacing whatever the visitor had already chosen.
  { name: "Certifications", href: "/courses" },
  { name: "Corporate", href: "/corporate-training" },
  {
    name: "Company",
    href: "/about",
    subItems: [
      { name: "About Us", href: "/about", blurb: "Who we are" },
      { name: "News", href: "/news", blurb: "Regulatory updates" },
      { name: "Events", href: "/events", blurb: "Live sessions & webinars" },
      { name: "Contact", href: "/contact", blurb: "Talk to an advisor" },
      { name: "Become a Trainer", href: "/become-a-trainer", blurb: "Join the faculty" },
    ],
  },
  {
    name: "Tools",
    href: "/tools",
    subItems: [
      { name: "CARF Diagnostic", href: "/tools/carf", blurb: "Score your readiness" },
      { name: "Webinar Feedback", href: "/tools/carf-feedback", blurb: "CARF session survey" },
    ],
  },
]

/**
 * Routes that open with a full-bleed DARK hero, where the header floats over
 * the artwork until the user scrolls.
 *
 * Everything else gets the solid bar immediately: the floating header draws its
 * nav in white, so listing a page whose hero is light renders the navigation
 * white-on-white. Any page converted away from a dark hero must be removed
 * from this list at the same time -- /corporate-training is exactly that case.
 */
const OVERLAY_ROUTES = new Set([
  "/",
  // NOT "/courses": the catalogue opens on its title on a light ground now, so
  // the floating header would draw white nav on white. Course DETAIL pages keep
  // their dark hero and are still covered by the startsWith check below.
  "/corporate-training",
  "/events",
  "/about",
  "/contact",
  "/news",
  "/become-a-trainer",
])

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [logoError, setLogoError] = React.useState(false)
  const [user, setUser] = React.useState<User | null>(null)
  const [authLoading, setAuthLoading] = React.useState(true)

  const pathname = usePathname()

  /*
     The dashboard is an application shell with its own topbar, sidebar and
     account menu. Rendering the marketing header over it stacked two navs and
     buried the dashboard's own topbar, which is `sticky top-0 z-40` under this
     one's `fixed top-0 z-50`. The shell owns its chrome; this stands down.
  */
  const inAppShell = pathname.startsWith("/dashboard")
  const overlay = OVERLAY_ROUTES.has(pathname) || pathname.startsWith("/courses/")
  /** True only while floating over the hero artwork. */
  const onDark = overlay && !scrolled

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close any open dropdown when the route changes.
  React.useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  React.useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setAuthLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Escape closes the desktop dropdown, matching the Sheet's own behaviour.
  React.useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [openMenu])

  const isActive = (item: NavItem) =>
    pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

  if (inAppShell) return null

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,box-shadow,border-color,height] duration-slow ease-out-expo",
        onDark
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-line glass shadow-sm",
      )}
    >
      {/*
        Scrim behind the transparent header.

        While floating over a hero the nav relied entirely on that hero's own
        gradient being dark at the top. That happens to be true of the current
        photography, but a single light image would have made the navigation
        unreadable. This guarantees a dark backing regardless of the artwork.
      */}
      {onDark ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[140%] bg-gradient-to-b from-ink-950/85 via-ink-950/45 to-transparent"
        />
      ) : null}
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-slow ease-out-expo",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <HeaderLogo
            isTransparent={overlay}
            isScrolled={scrolled}
            logoError={logoError}
            setLogoError={setLogoError}
          />

          {/* ---------------- Desktop nav ---------------- */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item)

              if (!item.subItems) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-fast",
                      onDark
                        ? "text-white/85 hover:text-white"
                        : "text-content hover:text-navy-700",
                    )}
                  >
                    {item.name}
                    <NavUnderline active={active} onDark={onDark} />
                  </Link>
                )
              }

              const open = openMenu === item.name

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(item.name)}
                  onMouseLeave={() => setOpenMenu(null)}
                  // Focus moving anywhere outside the group closes the panel,
                  // so keyboard users get the same behaviour as pointer users.
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.name)}
                    onFocus={() => setOpenMenu(item.name)}
                    className={cn(
                      "group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-fast",
                      onDark ? "text-white/85 hover:text-white" : "text-content hover:text-navy-700",
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "h-3.5 w-3.5 opacity-60 transition-transform duration-slow ease-out-expo",
                        open && "rotate-180",
                      )}
                    />
                    <NavUnderline active={active} onDark={onDark} />
                  </button>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[19rem] -translate-x-1/2 pt-3",
                      "transition-all duration-slow ease-out-expo",
                      open
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0",
                    )}
                  >
                    <div className="overflow-hidden rounded-sm border border-line bg-surface-raised p-2 shadow-sm">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="group/item flex flex-col gap-0.5 rounded-sm px-4 py-3 transition-colors duration-fast hover:bg-navy-50"
                        >
                          <span className="flex items-center justify-between text-sm font-medium text-content-strong">
                            {sub.name}
                            <span
                              aria-hidden="true"
                              className="translate-x-[-6px] text-gold-ink opacity-0 transition-all duration-fast group-hover/item:translate-x-0 group-hover/item:opacity-100"
                            >
                              &rarr;
                            </span>
                          </span>
                          {sub.blurb ? (
                            <span className="text-2xs text-content-muted">{sub.blurb}</span>
                          ) : null}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </nav>

          {/* ---------------- Desktop actions ---------------- */}
          <div className="hidden items-center gap-2 lg:flex">
            {authLoading ? (
              <div className="h-10 w-32 animate-pulse rounded-full bg-current opacity-10" />
            ) : user ? (
              <UserMenu />
            ) : (
              <>
                <Button asChild variant={onDark ? "ghost-light" : "ghost"} size="sm">
                  <Link href="/auth/login">Log in</Link>
                </Button>
                <Button asChild variant="gold" size="sm">
                  <Link href="/auth/register">Get started</Link>
                </Button>
              </>
            )}
          </div>

          {/* ---------------- Mobile ---------------- */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant={onDark ? "ghost-light" : "ghost"}
                size="icon"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-l border-white/10 bg-ink-950 p-0 text-content-on-dark sm:max-w-sm"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <span className="text-2xs font-semibold uppercase tracking-[0.22em] text-gold-300">
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav
                  aria-label="Mobile"
                  className="flex-1 overflow-y-auto overscroll-contain px-6 py-6"
                >
                  <ul className="flex flex-col gap-1">
                    {navigation.map((item, i) => (
                      <li
                        key={item.name}
                        data-reveal="up"
                        data-shown={mobileOpen ? "true" : "false"}
                        style={
                          { "--reveal-delay": `${i * 45}ms`, "--reveal-distance": "14px" } as React.CSSProperties
                        }
                      >
                        {item.subItems ? (
                          <details className="group/d border-b border-white/5 py-1">
                            <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-lg font-display text-white marker:hidden">
                              {item.name}
                              <ChevronDown
                                aria-hidden="true"
                                className="h-4 w-4 text-gold-300 transition-transform duration-slow ease-out-expo group-open/d:rotate-180"
                              />
                            </summary>
                            <ul className="ml-1 flex flex-col gap-1 border-l border-white/10 pb-3 pl-4">
                              {item.subItems.map((sub) => (
                                <li key={sub.name}>
                                  <Link
                                    href={sub.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-2 text-sm text-white/70 transition-colors hover:text-gold-300"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block border-b border-white/5 py-4 font-display text-lg transition-colors",
                              isActive(item) ? "text-gold-300" : "text-white hover:text-gold-300",
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="border-t border-white/10 px-6 py-6">
                  {authLoading ? null : user ? (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline-light" block size="lg" className="w-full">
                        <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                      <UserMenu />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="gold" size="lg" className="w-full">
                        <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                          Get started
                        </Link>
                      </Button>
                      <Button asChild variant="outline-light" size="lg" className="w-full">
                        <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                          Log in
                        </Link>
                      </Button>
                    </div>
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

/** Gold rule that grows from the centre on hover, pinned open when active. */
function NavUnderline({ active, onDark }: { active: boolean; onDark: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center transition-transform duration-slow ease-out-expo",
        onDark ? "bg-white" : "bg-gold-400",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
      )}
    />
  )
}

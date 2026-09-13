"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  User,
  HelpCircle,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
  },
]

export function MobileSidebar() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-neutral-border px-6">
            <h2 className="text-2xs font-semibold uppercase tracking-[0.22em] text-content-subtle">Dashboard</h2>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  /* Matches the desktop sidebar: a crimson rule on a sunken
                     ground, not a filled block. */
                  className={cn(
                    "relative flex items-center gap-3 rounded-sm py-2.5 pl-5 pr-3 text-sm transition-colors",
                    "before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full",
                    isActive
                      ? "bg-surface-sunken font-semibold text-content-strong before:bg-crimson-600"
                      : "font-medium text-content before:bg-transparent hover:bg-surface-sunken hover:text-content-strong"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px]",
                      isActive ? "text-crimson-600" : "text-content-subtle"
                    )}
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}


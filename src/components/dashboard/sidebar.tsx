"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  User,
  HelpCircle,
  LogOut,
  Settings,
} from "lucide-react"

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Your learning summary"
  },
  {
    name: "My Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
    description: "Manage your enrollments"
  },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
    description: "Invoices and history"
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Personalize your account"
  },
  {
    name: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
    description: "Get help from experts"
  },
]

import { LogoutButton } from "@/components/auth/logout-button"

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-72 flex-col border-r border-line bg-surface-raised">
      <div className="flex h-18 items-center border-b border-line px-7">
        <h2 className="text-2xs font-semibold uppercase tracking-[0.22em] text-content-subtle">
          Dashboard
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div>
          <p className="mb-3 px-4 text-2xs font-semibold uppercase tracking-[0.18em] text-content-subtle">
            Main Menu
          </p>
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  /*
                     The active item is marked by a crimson rule and a sunken
                     ground, not a filled black block: the block read as a
                     button in a column of links, and it was the only pure-black
                     surface in the shell.
                  */
                  className={cn(
                    "group relative flex items-center gap-3 rounded-sm py-2.5 pl-5 pr-4 text-sm transition-colors duration-fast ease-out-expo",
                    "before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full before:transition-colors",
                    isActive
                      ? "bg-surface-sunken font-semibold text-content-strong before:bg-crimson-600"
                      : "font-medium text-content before:bg-transparent hover:bg-surface-sunken hover:text-content-strong"
                  )}
                >
                  <Icon className={cn(
                    "h-[18px] w-[18px] transition-colors",
                    isActive ? "text-crimson-600" : "text-content-subtle group-hover:text-content"
                  )} />
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line p-4">
        <Link
          href="/dashboard/profile"
          className="group flex items-center gap-3 rounded-sm p-3 transition-colors hover:bg-surface-sunken"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-sunken">
            <User className="h-4 w-4 text-content-muted" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-content-strong">My Account</p>
            <p className="text-2xs text-content-muted">Manage Settings</p>
          </div>
          <Settings className="h-4 w-4 text-content-subtle transition-transform duration-slow ease-out-expo group-hover:rotate-45" />
        </Link>

        <LogoutButton className="w-full justify-start rounded-sm px-4 text-danger hover:bg-danger/8 hover:text-danger" />
      </div>
    </div>
  )
}

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
    <div className="flex h-full w-72 flex-col border-r border-neutral-border/50 bg-white/80 backdrop-blur-md">
      <div className="flex h-20 items-center border-b border-neutral-border/30 px-8">
        <h2 className="text-lg font-bold text-brand-navy uppercase tracking-widest text-[10px]">
          User Dashboard
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        <div>
          <p className="px-4 text-[10px] font-black uppercase tracking-widest text-neutral-text-muted mb-4">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 group",
                    isActive
                      ? "bg-brand-navy text-white shadow-lg shadow-brand-navy/10 translate-x-1"
                      : "text-neutral-text hover:bg-neutral-bg-subtle hover:text-brand-navy"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5 transition-colors",
                    isActive ? "text-brand-gold" : "text-neutral-text-muted group-hover:text-brand-navy"
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

      <div className="p-4 border-t border-neutral-border/30 space-y-2">
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-bg-subtle transition-colors group"
        >
          <div className="h-10 w-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
            <User className="h-5 w-5 text-brand-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-brand-navy truncate">My Account</p>
            <p className="text-[10px] text-neutral-text-muted font-medium">Manage Settings</p>
          </div>
          <Settings className="h-4 w-4 text-neutral-text-muted group-hover:rotate-45 transition-transform" />
        </Link>

        <LogoutButton className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 px-4 py-2.5 font-bold rounded-xl" />
      </div>
    </div>
  )
}

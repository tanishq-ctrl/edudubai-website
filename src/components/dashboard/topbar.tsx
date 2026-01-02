"use client"

import { UserMenu } from "@/components/user-menu"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"

export function DashboardTopbar() {
  return (
    <div className="flex h-16 items-center justify-between border-b border-neutral-border bg-white px-4 lg:px-6">
      <MobileSidebar />
      <div className="flex items-center gap-4">
        <UserMenu />
      </div>
    </div>
  )
}


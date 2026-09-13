"use client"

import Image from "next/image"
import Link from "next/link"

import { UserMenu } from "@/components/user-menu"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line bg-surface-raised/95 px-gutter">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Link href="/" aria-label="EduDubai home" className="hidden sm:block">
          <div className="relative h-8 w-28">
            <Image
              src="/edudubai-logo.png"
              alt="EduDubai"
              fill
              sizes="112px"
              className="object-contain object-left"
              style={{ filter: "brightness(0)" }}
            />
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/courses"
          className="hidden rounded-full px-4 py-2 text-sm font-medium text-content-muted transition-colors hover:bg-surface-sunken hover:text-navy-700 sm:block"
        >
          Browse courses
        </Link>
        <UserMenu />
      </div>
    </header>
  )
}

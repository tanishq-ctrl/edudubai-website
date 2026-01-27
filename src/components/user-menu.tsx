"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/auth/logout-button"
import { createClient } from "@/lib/supabase/client"
import { User, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export function UserMenu() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [router])

  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <User className="h-5 w-5" />
      </Button>
    )
  }

  if (!user) {
    return null
  }

  const userInitials = user.email
    ?.charAt(0)
    .toUpperCase() || "U"

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-brand-gold text-brand-navy font-semibold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border border-neutral-border shadow-2xl rounded-xl p-2 animate-in fade-in-80 zoom-in-95 data-[side=top]:slide-in-from-bottom-2">
        <DropdownMenuLabel className="px-3 py-3 rounded-lg bg-neutral-bg-subtle/50 mb-1">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-bold text-brand-navy leading-none">{userName}</p>
            <p className="text-[10px] font-medium leading-none text-neutral-text-muted truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-border/50 my-1" />
        <DropdownMenuItem asChild className="focus:bg-neutral-bg-subtle focus:text-brand-navy cursor-pointer rounded-lg my-0.5">
          <Link href="/dashboard" className="flex items-center py-2.5 px-3">
            <LayoutDashboard className="mr-2 h-4 w-4 text-brand-gold" />
            <span className="font-semibold text-sm">Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-neutral-border/50 my-1" />
        <DropdownMenuItem asChild className="p-0 focus:bg-red-50 focus:text-red-700 cursor-pointer rounded-lg my-0.5">
          <div className="w-full">
            <LogoutButton
              variant="ghost"
              size="sm"
              className="w-full justify-start py-2.5 px-3 h-auto font-semibold hover:bg-transparent hover:text-inherit"
            />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


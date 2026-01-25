"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function AuthHandler() {
    const router = useRouter()

    useEffect(() => {
        const supabase = createClient()

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                router.push("/auth/reset-password")
            }
        })

        // Also check the URL fragment immediately (sometimes needed if event fires before listener)
        const handleHash = () => {
            const hash = window.location.hash
            if (hash && (hash.includes("type=recovery") || hash.includes("error_code=otp_expired"))) {
                router.push("/auth/reset-password")
            }
        }

        handleHash()

        return () => {
            subscription.unsubscribe()
        }
    }, [router])

    return null
}

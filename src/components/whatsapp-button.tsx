"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { openWhatsApp } from "@/lib/whatsapp"
import { trackWhatsAppClick } from "@/lib/analytics"

interface WhatsAppButtonProps {
  message?: string
  source?: string
  variant?: "default" | "outline" | "gold" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WhatsAppButton({
  message,
  source = "general",
  variant = "default",
  size = "default",
  className
}: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      trackWhatsAppClick(source)
      openWhatsApp(message)
    } catch (error) {
      console.error("Error in WhatsApp button click:", error)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
      type="button"
    >
      <MessageCircle className="h-4 w-4 mr-2" />
      Enrollment Inquiry
    </Button>
  )
}


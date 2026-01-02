// WhatsApp integration for "Talk to Advisor"

export function openWhatsApp(message?: string) {
  // Get phone number from environment variable (client-side accessible)
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919665642862"
  const defaultMessage = "Hello! I'm interested in learning more about EduDubai courses."
  const text = encodeURIComponent(message || defaultMessage)
  
  // Remove all non-numeric characters (keep only digits)
  // WhatsApp API requires country code + number without + or spaces
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, "")
  
  if (!cleanNumber || cleanNumber.length < 10) {
    console.error("Invalid WhatsApp number:", phoneNumber)
    alert("WhatsApp number is not configured. Please contact support.")
    return
  }
  
  const url = `https://wa.me/${cleanNumber}?text=${text}`
  
  console.log("Opening WhatsApp:", url)
  
  // Use window.location.href for more reliable opening
  // This works better than window.open which can be blocked
  window.location.href = url
}

export function getWhatsAppLink(message?: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+919665642862"
  const defaultMessage = "Hello! I'm interested in learning more about EduDubai courses."
  const text = encodeURIComponent(message || defaultMessage)
  // Remove all non-numeric characters except + at the start
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "").replace(/^\+/, "")
  return `https://wa.me/${cleanNumber}?text=${text}`
}


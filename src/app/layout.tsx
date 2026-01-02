import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSiteUrl } from "@/lib/env"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: "EduDubai - Premium Professional Education",
  description: "Transform your career with premium professional courses",
  icons: {
    icon: "/edudubai-logo.png",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "EduDubai - Premium Professional Education",
    description: "Transform your career with premium professional courses",
    url: siteUrl,
    siteName: "EduDubai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduDubai - Premium Professional Education",
    description: "Transform your career with premium professional courses",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
        <Toaster />
      </body>
    </html>
  )
}

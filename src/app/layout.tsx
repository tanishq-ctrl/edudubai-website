import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
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
        {/* Tawk.to Chat Widget */}
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69593156a537b6197bd03b72/1je26her0';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}

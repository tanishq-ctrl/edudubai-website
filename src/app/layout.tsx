import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSiteUrl } from "@/lib/env"
import { AuthHandler } from "@/components/auth/auth-handler"
import { ScrollProgress } from "@/components/motion"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  title: {
    default: "EduDubai - Global Online Professional Education & Compliance",
    template: "%s | EduDubai"
  },
  description: "EduDubai is a premier global online provider of CAMS Certification, AML Training, and GCI Compliance courses. Industry-leading professional education managed out of India for worldwide specialists.",
  keywords: [
    "Global CAMS Certification Online",
    "International AML Training",
    "Certified Compliance Manager Course",
    "GCI Certification Worldwide",
    "Professional Online Compliance Training",
    "Sanctions Compliance specialist training",
    "Anti-Money Laundering Certification India",
    "Financial Crime Training Global",
    "Regulatory Compliance Worldwide",
    "Corporate Governance Training"
  ],
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EduDubai - Global Online Professional Compliance Certification",
    description: "Advance your global career with industry-leading compliance tracks. Authorized GCI training and ACAMS preparation available worldwide.",
    url: siteUrl,
    siteName: "EduDubai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduDubai - Global Compliance & AML Training",
    description: "Leading worldwide online professional education provider for AML, CAMS, and Financial Crime certifications.",
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} no-js`} suppressHydrationWarning>
      <head>
        {/*
          Drops the `no-js` class as early as possible. Everything with
          `[data-reveal]` is forced visible while `no-js` is present, so if
          scripting is disabled or the bundle fails the page still reads --
          it simply arrives without the entrance animations.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: [
              "var d=document.documentElement;",
              "d.classList.remove('no-js');",
              // Hard ceiling: content is never hidden for longer than this,
              // whatever happens to hydration or the observers.
              "setTimeout(function(){d.classList.add('reveal-all')},2200);",
              // Observers do not fire in a background tab, so a page opened in
              // one would otherwise render blank when the user switches to it.
              "document.addEventListener('visibilitychange',function(){",
              "if(document.visibilityState==='visible')",
              "setTimeout(function(){d.classList.add('reveal-all')},600);",
              "});",
              "if(document.visibilityState!=='visible')d.classList.add('reveal-all');",
            ].join(''),
          }}
        />
      </head>
      <body className="font-sans">
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <GoogleAnalytics gaId="G-GKHHHPDR1V" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'GT-WRGG3DMG');
            gtag('config', 'AW-17858231822');
          `}
        </Script>
        <SiteHeader />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
        <Toaster />
        <AuthHandler />
        {/* Tawk.to Chat Widget */}
        {/* Tawk.to Chat Widget
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
        */}
      </body>
    </html>
  )
}

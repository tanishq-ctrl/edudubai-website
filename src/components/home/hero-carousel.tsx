"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import { PartnerLogo } from "@/components/partner-logo"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface SlideData {
  eyebrow: string
  headline: string
  subheadline: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
  image: string
  imageAlt: string
  certifications?: {
    name: string
    imagePath: string
  }[]
  whiteLogos?: boolean
}

const slides: SlideData[] = [
  {
    eyebrow: "EduDubai • Training & Consulting",
    headline: "Compliance Leadership Starts Here.",
    subheadline: "Built for regulators & expectations — not checklists.",
    primaryCTA: {
      text: "Explore Courses",
      href: "/courses",
    },
    image: "/hero/slide-1.jpg",
    imageAlt: "Professional compliance training and consulting",
  },
  {
    eyebrow: "Exam Preparation",
    headline: "ACAMS Exam Prep",
    subheadline: "Live cohorts, case-led learning, readiness diagnostics.",
    primaryCTA: {
      text: "Join ACAMS Prep",
      href: "/courses?body=ACAMS",
    },
    secondaryCTA: {
      text: "Download Brochure",
      href: "/contact",
    },
    image: "/hero/slide-2.jpg",
    imageAlt: "ACAMS exam preparation and training",
    certifications: [
      { name: "CAMS", imagePath: "/images/certifications/camss.png" },
      { name: "CGSS", imagePath: "/images/certifications/cgss.png" },
      { name: "CCAS", imagePath: "/images/certifications/ccas.png" },
      { name: "CAFS", imagePath: "/images/certifications/cafs.png" },
    ],
    whiteLogos: true,
  },
  {
    eyebrow: "Exam Preparation",
    headline: "GCI Exam Prep",
    subheadline: "Global Compliance Institute certified training with expert guidance.",
    primaryCTA: {
      text: "Join GCI Prep",
      href: "/courses?body=GCI",
    },
    secondaryCTA: {
      text: "Download Brochure",
      href: "/contact",
    },
    image: "/hero/slide-3.jpg",
    imageAlt: "GCI exam preparation and training",
    certifications: [
      { name: "CCM", imagePath: "/images/certifications/ccm.png" },
      { name: "FCS", imagePath: "/images/certifications/fcs.png" },
      { name: "AMLS", imagePath: "/images/certifications/amls.png" },
      { name: "RCS", imagePath: "/images/certifications/rcs.png" },
      { name: "SCS", imagePath: "/images/certifications/scs.png" },
    ],
  },
  {
    eyebrow: "For Organizations",
    headline: "Corporate Training That Moves Metrics.",
    subheadline: "Customized programs across GCC, India, and global teams.",
    primaryCTA: {
      text: "Corporate Training",
      href: "/corporate-training",
    },
    secondaryCTA: {
      text: "Become a Trainer",
      href: "/become-a-trainer", // Links to trainer registration
    },
    image: "/hero/slide-4.jpg",
    imageAlt: "Corporate training and organizational development",
  },
]

// Partner logos for trust bar
const partners = [
  { name: "Deutsche Bank", imagePath: "/images/partners/deutsche-bank.png" },
  { name: "BNP Paribas", imagePath: "/images/partners/bnp-paribas.png" },
  { name: "Citibank", imagePath: "/images/partners/citibank.png" },
  { name: "UBS", imagePath: "/images/partners/ubs.png" },
  { name: "Emirates NBD", imagePath: "/images/partners/emirates-nbd.png" },
  { name: "First Abu Dhabi Bank", imagePath: "/images/partners/fab.png" },
  { name: "HSBC", imagePath: "/images/partners/hsbc.png" },
  { name: "Standard Chartered", imagePath: "/images/partners/standard-chartered.png" },
]

export function HeroCarousel() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
      if (swiperInstance) {
        if (e.matches) {
          swiperInstance.autoplay?.stop()
        } else {
          swiperInstance.autoplay?.start()
        }
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [swiperInstance])

  return (
    <section className="relative w-full h-screen min-h-[700px] max-h-[900px]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={
          prefersReducedMotion
            ? false
            : {
              delay: 6500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
        }
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        keyboard={{
          enabled: true,
        }}
        onSwiper={setSwiperInstance}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative h-full w-full">
            {/* Background Image - Full screen */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover brightness-110"
                style={{ objectPosition: '75% center' }}
                sizes="100vw"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const parent = target.parentElement
                  if (parent) {
                    parent.style.background =
                      "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #1e3a5f 100%)"
                  }
                }}
              />
            </div>


            {/* Gradient Overlay - Stronger on left to protect text area */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            {/* Content - Left Aligned */}
            <Container className={cn(
              "relative z-10 h-full flex items-center",
              !slide.certifications && "pb-16 md:pb-24"
            )}>
              {/* Certification Logos - Responsive sizing for mobile */}
              {slide.certifications && (
                <div className={cn(
                  "absolute inset-x-0 flex justify-center z-20 pointer-events-none px-2 sm:px-4",
                  index === 1 ? "top-32 md:top-28" : index === 2 ? "top-32 md:top-28" : "top-24 md:top-20"
                )}>
                  <div className={cn(
                    "flex justify-center items-center pointer-events-auto",
                    index === 2
                      ? "flex-nowrap gap-2 sm:gap-3 md:gap-6 lg:gap-10 overflow-x-auto max-w-full scrollbar-hide"
                      : "flex-wrap gap-2 sm:gap-3 md:gap-8 lg:gap-12 max-w-full"
                  )}>
                    {slide.certifications.map((cert, certIndex) => (
                      <div
                        key={certIndex}
                        className="transition-transform duration-300 hover:scale-110 flex-shrink-0"
                      >
                        <Image
                          src={cert.imagePath}
                          alt={cert.name}
                          width={140}
                          height={140}
                          className={cn(
                            index === 1
                              ? "w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 lg:w-40 lg:h-40 object-contain"
                              : index === 2
                                ? "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                                : "w-14 h-14 sm:w-18 sm:h-18 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain",
                            slide.whiteLogos
                              ? "brightness-0 invert drop-shadow-2xl opacity-90"
                              : "mix-blend-multiply contrast-[1.1] brightness-[1.05]"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="max-w-2xl text-left space-y-6 lg:space-y-8 animate-fade-up">
                {/* Badge */}
                <div className="inline-flex">
                  <span className="px-4 py-2 bg-brand-gold text-brand-navy text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-lg">
                    {slide.eyebrow}
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white drop-shadow-2xl">
                  {slide.headline}
                </h1>

                {/* Subheadline */}
                <p className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-lg">
                  {slide.subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="xl"
                    variant="gold"
                    className="min-w-[220px]"
                  >
                    <Link href={slide.primaryCTA.href}>
                      {slide.primaryCTA.text}
                    </Link>
                  </Button>
                  {slide.secondaryCTA && (
                    <Button
                      asChild
                      size="xl"
                      variant="outline"
                      className="bg-white/10 backdrop-blur-md border-2 border-white/60 text-white hover:bg-white/15 hover:border-white min-w-[220px]"
                    >
                      <Link href={slide.secondaryCTA.href}>
                        {slide.secondaryCTA.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="swiper-button-prev-custom absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="swiper-button-next-custom absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/30 hover:border-white/50 flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        @media (min-width: 640px) {
          .swiper-pagination-bullet-custom {
            width: 12px;
            height: 12px;
          }
        }
        .swiper-pagination-bullet-active-custom {
          background: #d4af37;
          width: 24px;
          border-radius: 6px;
        }
        @media (min-width: 640px) {
          .swiper-pagination-bullet-active-custom {
            width: 32px;
          }
        }
      `}</style>

      {/* Trust Bar - Scrolling logos at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-border/30 pt-5 pb-6 md:pt-6 md:pb-8">
        {/* Heading */}
        <div className="text-center mb-5 md:mb-6">
          <p className="text-xs md:text-sm font-bold text-brand-navy uppercase tracking-wider">
            Trusted by AML & Compliance Professionals Worldwide
          </p>
        </div>

        {/* Scrolling Logos */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            <div className="flex items-center gap-16 md:gap-20 flex-shrink-0 px-8">
              {partners.map((partner, index) => (
                <div
                  key={`first-${index}`}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <PartnerLogo
                    src={partner.imagePath}
                    alt={partner.name}
                    className="h-10 md:h-12"
                  />
                </div>
              ))}
            </div>
            {/* Second set of logos for seamless loop */}
            <div className="flex items-center gap-16 md:gap-20 flex-shrink-0 px-8">
              {partners.map((partner, index) => (
                <div
                  key={`second-${index}`}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                >
                  <PartnerLogo
                    src={partner.imagePath}
                    alt={partner.name}
                    className="h-10 md:h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


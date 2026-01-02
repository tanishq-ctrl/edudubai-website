"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
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
  secondaryCTA: {
    text: string
    href: string
  }
  image: string
  imageAlt: string
}

const slides: SlideData[] = [
  {
    eyebrow: "EduDubai • Training & Consulting",
    headline: "Compliance Leadership Starts Here.",
    subheadline: "Built for regulators' expectations — not checklists.",
    primaryCTA: {
      text: "Explore Courses",
      href: "/courses",
    },
    secondaryCTA: {
      text: "View Certifications",
      href: "/certifications",
    },
    image: "/hero/slide-1.jpg",
    imageAlt: "Professional compliance training and consulting",
  },
  {
    eyebrow: "Exam Preparation",
    headline: "CAMS Prep — Done Properly.",
    subheadline: "Live cohorts, case-led learning, readiness diagnostics.",
    primaryCTA: {
      text: "Join CAMS Prep",
      href: "/courses?category=AML_CFT",
    },
    secondaryCTA: {
      text: "Download Brochure",
      href: "/contact",
    },
    image: "/hero/slide-2.jpg",
    imageAlt: "CAMS exam preparation and training",
  },
  {
    eyebrow: "Specialized Financial Crime",
    headline: "Sanctions & TBML Mastery.",
    subheadline: "Learn what banks, auditors, and regulators actually test.",
    primaryCTA: {
      text: "Explore Sanctions",
      href: "/courses?category=SANCTIONS",
    },
    secondaryCTA: {
      text: "Explore TBML",
      href: "/courses?category=TBML",
    },
    image: "/hero/slide-3.jpg",
    imageAlt: "Sanctions and trade-based money laundering training",
  },
  {
    eyebrow: "For Organizations",
    headline: "Corporate Training That Moves Metrics.",
    subheadline: "Customized programs across GCC, India, and global teams.",
    primaryCTA: {
      text: "Corporate Training",
      href: "/corporate",
    },
    secondaryCTA: {
      text: "Become a Trainer",
      href: "/become-a-trainer",
    },
    image: "/hero/slide-4.jpg",
    imageAlt: "Corporate training and organizational development",
  },
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
    <section className="relative w-full h-[55vh] md:h-[70vh] min-h-[420px] overflow-hidden">
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
            {/* Background Image */}
            <div className="absolute inset-0 brightness-110">
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={index === 0}
                quality={90}
                className="object-cover object-center"
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

            {/* Dark Overlay Gradient - Lighter for brighter images */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/45" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.15)_100%)]" />

            {/* Content */}
            <Container className="relative z-10 h-full flex items-center">
              <div className="max-w-6xl w-full md:text-left text-center space-y-6 md:space-y-8 animate-fade-up">
                {/* Eyebrow */}
                <div className="text-base md:text-lg font-extrabold uppercase tracking-widest text-[#f4d03f] drop-shadow-[0_4px_8px_rgba(0,0,0,1)] [text-shadow:_-1px_-1px_0_rgba(0,0,0,0.8),1px_1px_0_rgba(0,0,0,0.8),0_0_10px_rgba(244,208,63,0.5)]">
                  {slide.eyebrow}
                </div>

                {/* Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {slide.headline}
                </h1>

                {/* Subheadline */}
                <p className="text-lg md:text-xl lg:text-2xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] max-w-3xl md:max-w-2xl">
                  {slide.subheadline}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    variant="gold"
                    className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-navy hover:from-brand-gold-light hover:to-brand-gold font-semibold px-8 py-6 text-base md:text-lg shadow-xl shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all hover:scale-105"
                  >
                    <Link href={slide.primaryCTA.href}>
                      {slide.primaryCTA.text}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="bg-white/15 backdrop-blur-sm border-2 border-white/70 text-white hover:bg-white/25 hover:border-white font-semibold px-8 py-6 text-base md:text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    <Link href={slide.secondaryCTA.href}>
                      {slide.secondaryCTA.text}
                    </Link>
                  </Button>
                </div>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2" />

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active-custom {
          background: #d4af37;
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  )
}


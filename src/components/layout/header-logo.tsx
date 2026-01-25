"use client"

import Image from "next/image"
import Link from "next/link"
import { BookOpen } from "lucide-react"

interface HeaderLogoProps {
    isTransparent: boolean
    isScrolled: boolean
    logoError: boolean
    setLogoError: (error: boolean) => void
}

export function HeaderLogo({ isTransparent, isScrolled, logoError, setLogoError }: HeaderLogoProps) {
    const shouldBeWhite = isTransparent && !isScrolled

    return (
        <Link href="/" className="flex items-center space-x-2 group">
            {!logoError ? (
                <div className="relative h-12 w-32 md:w-40">
                    <Image
                        src="/edudubai-logo.png"
                        alt="EduDubai - Global Education and Training Specialist"
                        fill
                        className="object-contain transition-all duration-300 group-hover:opacity-90"
                        style={{
                            filter: shouldBeWhite
                                ? 'brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.9))'
                                : 'brightness(0)',
                        }}
                        onError={() => setLogoError(true)}
                    />
                </div>
            ) : (
                <>
                    <BookOpen className={`h-7 w-7 transition-colors ${shouldBeWhite
                        ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                        : "text-brand-gold group-hover:text-brand-gold-light"
                        }`} />
                    <span className={`text-2xl font-bold transition-colors ${shouldBeWhite
                        ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] font-extrabold"
                        : "text-brand-navy"
                        }`}>
                        EduDubai
                    </span>
                </>
            )}
        </Link>
    )
}

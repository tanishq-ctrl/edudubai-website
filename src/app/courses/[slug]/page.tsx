import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { getCourseBySlugNew } from "@/server/actions/courses"
import { CourseDetailClient } from "./page-client"
import { CourseHero } from "./course-hero"
import { CourseCustomContent } from "./course-custom-content"
import { CGSSCustomContent } from "./cgss-custom"

import { Metadata } from "next"

interface CourseDetailPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: CourseDetailPageProps): Promise<Metadata> {
  const course = await getCourseBySlugNew(params.slug)

  if (!course) {
    return {
      title: "Course Not Found | EduDubai",
    }
  }

  // Custom metadata for CGSS
  if (params.slug === "certified-global-sanctions-specialist") {
    return {
      title: "CGSS Certification Training MENA | Certified Global Sanctions Specialist Course | Edu-Dubai",
      description: "Master global sanctions compliance with ACAMS CGSS certification training. 40-hour program covering OFAC, EU, UN sanctions. Flexible schedules. Expert instructors.",
      keywords: ["CGSS certification", "sanctions compliance training MENA", "ACAMS CGSS course", "global sanctions specialist", "OFAC training", "EU sanctions", "sanctions screening", "AML sanctions", "MENA compliance training", "financial crime certification"],
    }
  }

  return {
    title: `${course.title} | International Professional Certification`,
    description: `${course.shortDescription} Master the ${course.title} with EduDubai's global professional training track. Worldwide recognized certification training.`,
    keywords: [
      course.title,
      `${course.title} Certification`,
      "Global Compliance Training",
      "Professional Education",
      "International Specialist Certification",
      "Online Professional Courses"
    ],
    openGraph: {
      title: `${course.title} - Global Professional Training | EduDubai`,
      description: course.shortDescription,
      images: [course.imageUrl || "/edudubai-logo.png"],
    },
  }
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = await getCourseBySlugNew(params.slug)

  if (!course) {
    notFound()
  }

  // JSON-LD Structured Data for Course
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.shortDescription,
    "provider": {
      "@type": "Organization",
      "name": "EduDubai",
      "sameAs": "https://edudubai.org"
    },
    "image": course.imageUrl || "https://edudubai.org/edudubai-logo.png",
    "offers": {
      "@type": "Offer",
      "category": "Professional Education",
      "availability": "https://schema.org/InStock"
    },
    "courseCode": course.slug.toUpperCase(),
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": ["Online", "Live Virtual", "Self-Paced"],
      "location": "Global / Online"
    }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://edudubai.org"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://edudubai.org/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": course.title,
        "item": `https://edudubai.org/courses/${course.slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CourseDetailClient courseId={course.id} courseTitle={course.title} />
      <CourseHero course={course} />
      {course.slug === "certified-global-sanctions-specialist" ? (
        <CGSSCustomContent course={course} />
      ) : (
        <CourseCustomContent course={course} />
      )}
    </>
  )
}

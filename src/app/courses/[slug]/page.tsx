import { notFound } from "next/navigation"
import { Container } from "@/components/container"
import { getCourseBySlugNew } from "@/server/actions/courses"
import { CourseDetailClient } from "./page-client"
import { CourseHero } from "./course-hero"
import { CourseSidebar } from "./course-sidebar"
import { CourseOutcomes } from "./course-outcomes"
import { CourseWhoItsFor } from "./course-who-its-for"
import { CourseWhyChooseUs } from "./course-why-choose-us"
import { CourseDeliveryFormats } from "./course-delivery-formats"
import { CourseFAQ } from "./course-faq"

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
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <CourseOutcomes course={course} />
            <CourseWhoItsFor course={course} />
            <CourseWhyChooseUs course={course} />
            <CourseDeliveryFormats course={course} />
            <CourseFAQ course={course} />
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CourseSidebar course={course} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

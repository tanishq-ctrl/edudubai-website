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
    title: `${course.title} | EduDubai`,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
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

  return (
    <>
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

"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getAllCourses() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return courses
  } catch (error) {
    console.error("Error fetching courses:", error)
    return []
  }
}

export async function createCourse(data: {
  title: string
  description: string
  slug: string
  price: number
  duration: number
  level: string
  category: string
  instructorId: string
  published?: boolean
}) {
  try {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        slug: data.slug,
        price: data.price,
        duration: data.duration,
        level: data.level as any,
        category: data.category,
        instructorId: data.instructorId,
        published: data.published || false,
      },
    })
    revalidatePath("/admin")
    revalidatePath("/courses")
    return course
  } catch (error) {
    console.error("Error creating course:", error)
    throw error
  }
}

export async function updateCourse(
  id: string,
  data: {
    title?: string
    description?: string
    slug?: string
    price?: number
    duration?: number
    level?: string
    category?: string
    published?: boolean
  }
) {
  try {
    const course = await prisma.course.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.slug && { slug: data.slug }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.duration !== undefined && { duration: data.duration }),
        ...(data.level && { level: data.level as any }),
        ...(data.category && { category: data.category }),
        ...(data.published !== undefined && { published: data.published }),
      },
    })
    revalidatePath("/admin")
    revalidatePath("/courses")
    return course
  } catch (error) {
    console.error("Error updating course:", error)
    throw error
  }
}

export async function deleteCourse(id: string) {
  try {
    await prisma.course.delete({
      where: { id },
    })
    revalidatePath("/admin")
    revalidatePath("/courses")
  } catch (error) {
    console.error("Error deleting course:", error)
    throw error
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            enrollments: true,
            payments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return users
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}


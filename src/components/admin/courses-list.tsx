"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Pencil, Trash2, Plus } from "lucide-react"
import { useState } from "react"
import { CreateCourseDialog } from "./create-course-dialog"

interface Course {
  id: string
  title: string
  description: string
  slug: string
  price: number
  duration: number
  level: string
  category: string
  published: boolean
  instructor: {
    name: string | null
  }
  _count: {
    enrollments: number
  }
}

export function AdminCoursesList({ courses }: { courses: Course[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-navy">All Courses</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>
      <CreateCourseDialog open={open} onOpenChange={setOpen} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <Badge variant={course.published ? "default" : "secondary"}>
                  {course.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">${course.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enrollments:</span>
                  <span className="font-medium">{course._count.enrollments}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/courses/${course.slug}`}>View</Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


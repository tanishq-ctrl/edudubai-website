// In-memory seed data for Phase 1 (no database)

export type DeliveryFormat = "IN_PERSON" | "LIVE_VIRTUAL"

export interface Course {
  id: string
  title: string
  description: string
  slug: string
  image?: string
  price: number
  duration: number // in hours
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  category: string
  deliveryFormat: DeliveryFormat
  instructor: {
    name: string
    email: string
    image?: string
  }
  published: boolean
  modules: Module[]
  createdAt: Date
  updatedAt: Date
}

export interface Module {
  id: string
  courseId: string
  title: string
  description?: string
  order: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  description?: string
  videoUrl?: string
  content?: string
  order: number
  duration: number // in minutes
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: "ACTIVE" | "COMPLETED" | "CANCELLED"
  progress: number // percentage
  enrolledAt: Date
  completedAt?: Date
}

export interface Payment {
  id: string
  userId: string
  courseId: string
  amount: number
  currency: string
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"
  razorpayOrderId?: string
  razorpayPaymentId?: string
  createdAt: Date
}

export interface User {
  id: string
  email: string
  name?: string
  image?: string
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN"
  createdAt: Date
}

// In-memory storage
let courses: Course[] = []
let enrollments: Enrollment[] = []
let payments: Payment[] = []
let users: User[] = []

// Seed data
export function seedData() {
  courses = [
    {
      id: "1",
      title: "Digital Transformation Strategy",
      description: "Master the art of digital transformation with this comprehensive course covering strategy, implementation, and change management. Learn from industry experts how to lead digital initiatives in your organization.",
      slug: "digital-transformation-strategy",
      price: 2999,
      duration: 40,
      level: "INTERMEDIATE",
      category: "Strategy & Consulting",
      deliveryFormat: "LIVE_VIRTUAL",
      instructor: {
        name: "Dr. Sarah Ahmed",
        email: "sarah@edudubai.com",
      },
      published: true,
      modules: [
        {
          id: "m1",
          courseId: "1",
          title: "Introduction to Digital Transformation",
          order: 1,
          lessons: [
            { id: "l1", moduleId: "m1", title: "What is Digital Transformation?", order: 1, duration: 30 },
            { id: "l2", moduleId: "m1", title: "Key Drivers and Trends", order: 2, duration: 45 },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Data Analytics & Business Intelligence",
      description: "Transform data into actionable insights. Learn advanced analytics techniques, visualization, and how to build data-driven decision-making capabilities in your organization.",
      slug: "data-analytics-business-intelligence",
      price: 2499,
      duration: 35,
      level: "BEGINNER",
      category: "Data & Analytics",
      deliveryFormat: "LIVE_VIRTUAL",
      instructor: {
        name: "Mohammed Al-Rashid",
        email: "mohammed@edudubai.com",
      },
      published: true,
      modules: [
        {
          id: "m2",
          courseId: "2",
          title: "Fundamentals of Data Analytics",
          order: 1,
          lessons: [
            { id: "l3", moduleId: "m2", title: "Introduction to Analytics", order: 1, duration: 25 },
            { id: "l4", moduleId: "m2", title: "Data Collection Methods", order: 2, duration: 40 },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      title: "Leadership Excellence Workshop",
      description: "An intensive in-person workshop designed for senior executives. Develop leadership skills, strategic thinking, and learn to inspire high-performing teams.",
      slug: "leadership-excellence-workshop",
      price: 4999,
      duration: 16,
      level: "ADVANCED",
      category: "Leadership",
      deliveryFormat: "IN_PERSON",
      instructor: {
        name: "James Wilson",
        email: "james@edudubai.com",
      },
      published: true,
      modules: [
        {
          id: "m3",
          courseId: "3",
          title: "Core Leadership Principles",
          order: 1,
          lessons: [
            { id: "l5", moduleId: "m3", title: "Vision and Strategy", order: 1, duration: 60 },
            { id: "l6", moduleId: "m3", title: "Team Building", order: 2, duration: 90 },
          ],
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      title: "Cybersecurity Fundamentals",
      description: "Protect your organization from cyber threats. Learn essential cybersecurity practices, risk management, and compliance requirements.",
      slug: "cybersecurity-fundamentals",
      price: 1999,
      duration: 30,
      level: "BEGINNER",
      category: "Technology",
      deliveryFormat: "LIVE_VIRTUAL",
      instructor: {
        name: "Fatima Hassan",
        email: "fatima@edudubai.com",
      },
      published: true,
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "5",
      title: "Project Management Professional (PMP)",
      description: "Prepare for PMP certification with our comprehensive self-paced program. Includes practice exams and expert guidance.",
      slug: "project-management-professional-pmp",
      price: 3499,
      duration: 60,
      level: "INTERMEDIATE",
      category: "Project Management",
      deliveryFormat: "LIVE_VIRTUAL",
      instructor: {
        name: "David Chen",
        email: "david@edudubai.com",
      },
      published: true,
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "6",
      title: "Financial Modeling & Analysis",
      description: "Master financial modeling techniques used by top consulting firms. Hands-on Excel training and real-world case studies.",
      slug: "financial-modeling-analysis",
      price: 2799,
      duration: 25,
      level: "INTERMEDIATE",
      category: "Finance",
      deliveryFormat: "IN_PERSON",
      instructor: {
        name: "Priya Sharma",
        email: "priya@edudubai.com",
      },
      published: true,
      modules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
}

// Initialize seed data
seedData()

// Data access functions
export const dataStore = {
  // Courses
  getPublishedCourses: (): Course[] => {
    return courses.filter(c => c.published)
  },

  getCourseBySlug: (slug: string): Course | null => {
    return courses.find(c => c.slug === slug && c.published) || null
  },

  getCourseById: (id: string): Course | null => {
    return courses.find(c => c.id === id) || null
  },

  getAllCourses: (): Course[] => {
    return courses
  },

  // Enrollments
  getEnrollmentsByUserId: (userId: string): Enrollment[] => {
    return enrollments.filter(e => e.userId === userId)
  },

  getEnrollment: (userId: string, courseId: string): Enrollment | null => {
    return enrollments.find(e => e.userId === userId && e.courseId === courseId) || null
  },

  createEnrollment: (userId: string, courseId: string): Enrollment => {
    const enrollment: Enrollment = {
      id: `enr_${Date.now()}`,
      userId,
      courseId,
      status: "ACTIVE",
      progress: 0,
      enrolledAt: new Date(),
    }
    enrollments.push(enrollment)
    return enrollment
  },

  // Payments
  createPayment: (payment: Omit<Payment, "id" | "createdAt">): Payment => {
    const newPayment: Payment = {
      ...payment,
      id: `pay_${Date.now()}`,
      createdAt: new Date(),
    }
    payments.push(newPayment)
    return newPayment
  },

  getPaymentByOrderId: (orderId: string): Payment | null => {
    return payments.find(p => p.razorpayOrderId === orderId) || null
  },

  updatePayment: (id: string, updates: Partial<Payment>): Payment | null => {
    const index = payments.findIndex(p => p.id === id)
    if (index === -1) return null
    payments[index] = { ...payments[index], ...updates }
    return payments[index]
  },

  // Users
  getUserById: (id: string): User | null => {
    return users.find(u => u.id === id) || null
  },

  createUser: (user: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      ...user,
      id: `usr_${Date.now()}`,
      createdAt: new Date(),
    }
    users.push(newUser)
    return newUser
  },
}


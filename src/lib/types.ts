export type DeliveryMode = "IN_PERSON" | "LIVE_VIRTUAL"

export type Category =
  | "AML_CFT"
  | "SANCTIONS"
  | "TBML"
  | "FATCA_CRS"
  | "TAX"
  | "GOVERNANCE"
  | "RISK"
  | "DATA_AI"

export interface DeliverySchedule {
  name: string
  schedule: string
  duration: string
}

export interface Course {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  category: Category
  deliveryModes: DeliveryMode[]
  deliverySchedules?: DeliverySchedule[] // Optional detailed schedule information
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: number // in hours
  priceUsd: number
  currency: "USD"
  outcomes: string[]
  whoItsFor: string[]
  whyChooseUs?: {
    title: string
    description: string
    points: string[]
  }
  faq: Array<{
    question: string
    answer: string
  }>
  featured: boolean
  imageUrl?: string // Optional image URL for course thumbnail
  heroImageUrl?: string // Optional specialized image for course hero section
  examInfo?: {
    questions?: string
    duration?: string
    passingScore?: string
    format?: string
    requirements?: string[]
  }
  programOverview?: {
    whatIs?: string
    whyItMatters?: string
    jobReadySkills?: string
  }
  audienceCategories?: Array<{
    title: string
    roles: string[]
  }>
  issuingBody: "ACAMS" | "GCI" | "HOCK_INTERNATIONAL"
}


export type DeliveryMode = "IN_PERSON" | "LIVE_VIRTUAL" | "SELF_PACED"

export type Category = 
  | "AML_CFT" 
  | "SANCTIONS" 
  | "TBML" 
  | "FATCA_CRS" 
  | "TAX" 
  | "GOVERNANCE" 
  | "RISK" 
  | "DATA_AI"

export interface Course {
  id: string
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  category: Category
  deliveryModes: DeliveryMode[]
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  duration: number // in hours
  priceUsd: number
  currency: "USD"
  outcomes: string[]
  whoItsFor: string[]
  faq: Array<{
    question: string
    answer: string
  }>
  featured: boolean
  imageUrl?: string // Optional image URL for course thumbnail/hero
}


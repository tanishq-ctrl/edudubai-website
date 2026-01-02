import { NextRequest, NextResponse } from "next/server"

// Mark route as dynamic to prevent build-time analysis
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    // Lazy import Prisma to avoid initialization during build
    const { prisma } = await import("@/lib/prisma")
    
    const { id, email, name } = await req.json()

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id,
        email,
        name,
        role: "STUDENT",
      },
    })

    return NextResponse.json(user)
  } catch (error: any) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 }
    )
  }
}


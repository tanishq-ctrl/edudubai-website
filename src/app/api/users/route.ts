import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
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


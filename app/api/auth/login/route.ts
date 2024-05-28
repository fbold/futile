import { LoginSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const validationResult = await LoginSchema.safeParseAsync(data)

    if (!validationResult.success) {
      return NextResponse.json({
        error: validationResult.error,
      })
    }

    const { username, password } = validationResult.data

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return NextResponse.json({
        error: "User does not exist",
      })
    }

    const authenticated = await bcrypt.compare(password, user.password)

    if (authenticated)
      return NextResponse.json({
        message: "User logged in successfully.",
      })

    return NextResponse.json({
      message: "Wrong password",
    })
  } catch (error) {
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

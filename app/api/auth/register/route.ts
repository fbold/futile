import { registerSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // const result = await registerSchema.safeParseAsync(data)

    // if (!result.success) {
    //   return NextResponse.json({
    //     error: result.error.errors[0].message,
    //   })
    // }

    const { email, name } = data

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      return NextResponse.json({
        error: "User already exist with this email",
      })
    }

    await prisma.user.create({
      data: {
        email,
        name,
      },
    })

    return NextResponse.json({
      message: "User created successfully.",
    })
  } catch (error) {
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

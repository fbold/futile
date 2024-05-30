import { RegisterSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log(data)

    const validationResult = await RegisterSchema.safeParseAsync(data)
    console.log(validationResult)
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

    if (user) {
      return NextResponse.json({
        error: "User already exist with this username",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    return NextResponse.json({
      message: "User created successfully.",
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

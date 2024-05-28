import { LoginSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { getIronSession } from "iron-session"
import { SessionData, sessionOptions } from "@/lib/session"

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

    if (!authenticated)
      return NextResponse.json({
        status: 400,
        message: "Wrong password",
      })

    const session = await getIronSession<SessionData>(cookies(), sessionOptions)
    session.username = user.username
    session.isLoggedIn = true
    await session.save()
    return NextResponse.json({
      status: 200,
      message: "User logged in successfully.",
    })
  } catch (error) {
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

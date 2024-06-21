import { LoginSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { getIronSession } from "iron-session"
import { SessionData, getSession, sessionOptions } from "@/lib/session"
import { getRefreshToken } from "@/lib/refresh"

export async function POST(request: Request) {
  try {
    console.log("loggin in")
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

    // From here on we are authenticated
    // Save the main session info, if this session is logged in
    // then whoever is this session will have access to this boyos shit
    const session = await getSession()
    session.user = {
      id: user.id,
      username: user.username,
    }
    session.authControlKey = user.authControlKey
    session.expires = new Date().getTime() + 30 * 60 * 1000 // 30 minutes from now

    await session.save()

    console.log(session)
    // Generate refresh token and seal using iron-sesson
    // add to cookies using next.
    const refreshToken = await getRefreshToken(user.id, user.authControlKey)
    cookies().set({
      name: "futile-refresh-token",
      value: refreshToken,
      secure: false, //process.env.NODE_ENV === "production",
    })
    return NextResponse.json({
      status: 200,
      message: "User logged in successfully.",
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

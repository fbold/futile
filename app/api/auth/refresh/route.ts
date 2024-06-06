import prisma from "@/lib/prisma"
import { extractRefreshToken } from "@/lib/refresh"
import { getSession } from "@/lib/session"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const sealedToken = cookies().get("refresh-token")

    if (!sealedToken?.value)
      return NextResponse.json({
        status: 401,
        message: "No refresh token. Sign out",
      })

    // unseal the refresh token from iron-session sealed cookie
    const refreshToken = await extractRefreshToken(sealedToken.value)

    if (refreshToken.expires < Date.now())
      // expired token
      return NextResponse.json({
        status: 401,
        message: "Expired refresh token. Sign out",
      })

    // get user and check user iteration
    const user = await prisma.user.findUnique({
      where: {
        id: refreshToken.userId,
        authControlKey: refreshToken.authControlKey,
      },
    })

    if (!user)
      return NextResponse.json({
        status: 401,
        message:
          "User no longer/doesn't exist or auth key doesn't match. Sign out",
      })

    // all should be good, user exists, auth key matches, refresh token still valid
    // we can regenerate an access token
    const session = await getSession()
    session.user = {
      id: user.id,
      username: user.username,
    }
    session.authControlKey
    session.expires = new Date().getTime() + 30 * 60 * 1000 // 30 minutes from now

    await session.save()

    return NextResponse.json({
      status: 200,
      message: "Successfully refreshed",
    })
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      status: 400,
      message: "Server error occurred",
    })
  }
}

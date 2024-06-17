import prisma from "@/lib/prisma"
import { extractRefreshToken } from "@/lib/refresh"
import { SessionData, sessionOptions } from "@/lib/session"
import { sealData } from "iron-session"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { refreshToken: sealedRefreshToken } = await req.json()

    if (!sealedRefreshToken)
      return NextResponse.json({
        status: 401,
        message: "No refresh token. Sign out",
      })

    // unseal the refresh token from iron-session sealed cookie
    const refreshToken = await extractRefreshToken(sealedRefreshToken)
    console.log("REFRESH ENDPOINT: refresh token", refreshToken)
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

    console.log("REFRESH ENDPOINT: retrieved user in refresh endpoint", user)

    if (!user)
      return NextResponse.json({
        status: 401,
        message:
          "User no longer/doesn't exist or auth key doesn't match. Sign out",
      })

    // all should be good, user exists, auth key matches, refresh token still valid
    // we can regenerate an access token

    // if told to set we set the token here usig iron-session's method
    // this should only happen when being called diectly fromthe browser.
    // console.log("session in refresh endpoint", session)
    // extend the session validity
    const sessionData: SessionData = {
      user: {
        id: user.id,
        username: user.username,
      },
      expires: new Date().getTime() + 30 * 60 * 1000,
      authControlKey: user.authControlKey,
    }
    const sealedSession = await sealData(sessionData, sessionOptions)

    return NextResponse.json({
      status: 200,
      message: "REFRESH ENDPOINT: Successfully refreshed",
      sealedNewSessionData: sealedSession,
    })
  } catch (e) {
    console.log(e)
    return NextResponse.json({
      status: 400,
      message: "Server error occurred",
    })
  }
}

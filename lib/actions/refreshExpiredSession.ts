import prisma from "@/lib/prisma"
import { extractRefreshToken } from "@/lib/refresh"
import { SessionData } from "@/lib/session"

export const refreshExpiredSession = async (sealedRefreshToken: string) => {
  try {
    // unseal the refresh token from iron-session sealed cookie
    const refreshToken = await extractRefreshToken(sealedRefreshToken)

    if (refreshToken.expires < Date.now())
      // expired token
      return false

    // get user and check user iteration
    const user = await prisma.user.findUnique({
      where: {
        id: refreshToken.userId,
        authControlKey: refreshToken.authControlKey,
      },
    })

    console.log("REFRESH ACTION: retrieved user in refresh endpoint", user)

    if (!user) {
      console.log(
        "REFRESH ACTION: user doesn't exist or auth key doest match, destroy"
      )
      return false
    }

    // all should be good, user exists, auth key matches, refresh token still valid
    // we can regenerate a new access token

    // extend the session validity
    const sessionData: SessionData = {
      user: {
        id: user.id,
        username: user.username,
      },
      expires: new Date().getTime() + 30 * 60 * 1000,
      authControlKey: user.authControlKey,
    }

    return sessionData
  } catch (e) {
    console.log(e)
    return false
  }
}

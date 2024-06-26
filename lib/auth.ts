import { refreshExpiredSession } from "@/lib/actions/refreshExpiredSession"
import { getSession } from "@/lib/session"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const auth = async () => {
  const session = await getSession()
  if (session.expires > Date.now()) return session
  else {
    console.log("AUTH: session has expired, will try to refresh")
    // see if we have refresh token
    const sealedRefreshToken = cookies().get("futile-refresh-token")
    if (!sealedRefreshToken?.value) return false
    console.log("AUTH: attempting refresh")
    const sessionData = await refreshExpiredSession(sealedRefreshToken.value)
    if (!sessionData) return false
    session.user = sessionData.user
    session.expires = sessionData.expires
    session.authControlKey = sessionData.authControlKey

    session.save()
    const expiresIn = Math.round(session.expires / (1000 * 60))
    console.log(`AUTH: Session refreshed. Expires in ${expiresIn}`)
    return session
  }
}

export const getNewAuthKey = () => {
  return nanoid(32)
}

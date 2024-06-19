import { getNewAuthKey } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { SessionOptions, getIronSession } from "iron-session"
import { cookies } from "next/headers"

export interface SessionData {
  user: {
    id: string
    username: string
  }
  authControlKey: string
  expires: number
}

export const defaultSession: SessionData = {
  user: {
    id: "",
    username: "",
  },
  authControlKey: "",
  expires: 0,
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "futile-access-token",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
}

export const getSession = async () => {
  // check session expiry, see if need to refresh
  console.log("SESSION: retrieving session...")
  return await getIronSession<SessionData>(cookies(), sessionOptions)
}

export const killSession = async () => {
  const session = await getSession()
  if (session.user) {
    // update the auth key so existing refresh tokens aren't valid
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        authControlKey: getNewAuthKey(),
      },
    })
    // destroy the session
    session.destroy()
  }
  // delete the refresh cookie
  cookies().delete("futile-refresh-token")
}

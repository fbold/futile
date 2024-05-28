import { SessionOptions, getIronSession } from "iron-session"
import { cookies } from "next/headers"

export interface SessionData {
  username: string
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  username: "",
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.IRON_SESSION_PASSWORD!,
  cookieName: "thesesh",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
  },
}

export const getSession = async () => {
  return await getIronSession<SessionData>(cookies(), sessionOptions)
}

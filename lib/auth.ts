import { getSession } from "@/lib/session"
import { nanoid } from "nanoid"
import { NextResponse } from "next/server"

export const auth = async () => {
  const session = await getSession()
  if (session.expires > Date.now()) return session

  return false
}

export const getNewAuthKey = () => {
  return nanoid(32)
}

export const UnauthdResponse = NextResponse.json(
  {
    message: "Unauthenticated",
  },
  { status: 401 }
)

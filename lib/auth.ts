import { getSession } from "@/lib/session"
import { NextResponse } from "next/server"

export const auth = async () => {
  const session = await getSession()
  if (session.expires > Date.now()) return session

  return false
}

export const UnauthdResponse = NextResponse.json(
  {
    message: "Unauthenticated",
  },
  { status: 401 }
)

import { NextResponse } from "next/server"

export const GenericErrorResponse = NextResponse.json(
  { message: "A server error ocurred" },
  { status: 400 }
)

export const UnauthdResponse = NextResponse.json(
  {
    message: "Unauthenticated",
  },
  { status: 401 }
)

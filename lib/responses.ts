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

export const UserErrorResponse = (message: string, status = 400) => {
  return NextResponse.json(
    {
      message,
    },
    {
      status,
    }
  )
}

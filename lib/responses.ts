import { NextResponse } from "next/server"

export const GenericErrorResponse = NextResponse.json(
  { message: "A server error ocurred" },
  { status: 400 }
)

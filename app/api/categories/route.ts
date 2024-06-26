import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { GenericErrorResponse, UnauthdResponse } from "@/lib/responses"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const categories = await prisma.category.findMany({
      where: {
        user_id: session.user.id,
      },
    })

    return NextResponse.json({ categories }, { status: 200 })
  } catch (e) {
    console.log(e)
    return GenericErrorResponse
  }
}

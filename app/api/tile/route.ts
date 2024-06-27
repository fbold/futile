import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { GenericErrorResponse, UnauthdResponse } from "@/lib/responses"

export type TileInput = {
  title: string
  content: string
  category_id: string
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const data = (await request.json()) as TileInput
    const { title, content, category_id } = data

    const res = await prisma.tile.create({
      data: {
        category_id: category_id,
        content: content,
        title: title,
        user_id: session.user.id,
      },
    })

    return NextResponse.json({
      tile: res,
    })
  } catch (error) {
    console.log(error)
    return GenericErrorResponse
  }
}

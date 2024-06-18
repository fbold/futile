import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { UnauthdResponse, auth } from "@/lib/auth"

type Tile = {
  title: string
  content: string
  category: string
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const data = (await request.json()) as Tile
    const { title, content, category } = data

    const res = await prisma.tile.create({
      data: {
        category: category,
        content: content,
        title: title,
        user_id: session.user.id,
      },
    })

    return NextResponse.json({
      status: 200,
      tile: res,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

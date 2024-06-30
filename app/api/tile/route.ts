import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import {
  GenericErrorResponse,
  UnauthdResponse,
  UserErrorResponse,
} from "@/lib/responses"
import * as bcrypt from "bcrypt"

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

    if (!title || !category_id) return UserErrorResponse("No title or category")

    const res = await prisma.tile.create({
      data: {
        category_id: category_id,
        content: content,
        title: title,
        user_id: session.user.id,
      },
    })

    return NextResponse.json(
      {
        tile: res,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return GenericErrorResponse
  }
}

// should require password reprompt
export async function DELETE(req: NextRequest, route: { id: string }) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const { password } = (await req.json()) as { password: string }

    // check password matches
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    })

    if (!password || !user) return UnauthdResponse

    const match = await bcrypt.compare(password, user.password)
    if (!match) return UnauthdResponse

    const tileId = req.nextUrl.searchParams.get("id") as string
    if (!tileId) return UserErrorResponse("No ID provided")

    const res = await prisma.tile.delete({
      where: {
        id: tileId,
      },
    })

    if (!res) throw Error("Failed to delete tile")

    return NextResponse.json(
      {
        tile: res,
      },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return GenericErrorResponse
  }
}

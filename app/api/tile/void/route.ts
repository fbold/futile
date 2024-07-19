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

export type TilesSearchParams = {
  skip: number
  take: number
  inVoid: boolean
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const sp = request.nextUrl.searchParams
    const skip = parseInt(sp.get("skip") ?? "0")
    const take = parseInt(sp.get("take") ?? "10")

    const res = await prisma.tile.findMany({
      skip,
      take,
      where: {
        inVoid: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    return NextResponse.json({ tiles: res }, { status: 200 })
  } catch (error) {
    console.log(error)
    return GenericErrorResponse
  }
}

export async function PATCH(req: NextRequest) {
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

    const res = await prisma.tile.update({
      where: {
        id: tileId,
        user_id: session.user.id,
      },
      data: {
        inVoid: true,
      },
    })

    return NextResponse.json({ tile: res }, { status: 200 })
  } catch (error) {
    console.log(error)
    return GenericErrorResponse
  }
}

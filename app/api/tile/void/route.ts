import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import {
  GenericErrorResponse,
  UnauthdResponse,
  UserErrorResponse,
} from "@/lib/responses"

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

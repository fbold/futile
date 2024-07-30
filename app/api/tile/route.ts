import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import {
  GenericErrorResponse,
  UnauthdResponse,
  UserErrorResponse,
} from "@/lib/responses"
import * as bcrypt from "bcrypt"
import sanitizeHtml from "sanitize-html"
import { htmlSanitizationOptions } from "@/lib/sanitization"
import { Optional } from "@prisma/client/runtime/library"

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
        user_id: session.user.id,
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

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const data = (await request.json()) as TileInput
    const { title, content, category_id } = data

    if (!title || !category_id) return UserErrorResponse("No title or category")

    const sanitizedContent = sanitizeHtml(
      content || "",
      htmlSanitizationOptions
    )

    const res = await prisma.tile.create({
      data: {
        category_id: category_id,
        content: sanitizedContent,
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

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) return UnauthdResponse

    const tileId = request.nextUrl.searchParams.get("id") as string
    if (!tileId) return UserErrorResponse("No ID provided")

    const data = (await request.json()) as Optional<TileInput>
    const { title, content, category_id } = data

    const sanitizedContent = sanitizeHtml(
      content || "",
      htmlSanitizationOptions
    )

    const res = await prisma.tile.update({
      where: {
        id: tileId,
        user_id: session.user.id,
      },
      data: {
        category_id: category_id,
        content: sanitizedContent,
        title: title,
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
    if (!match) return UserErrorResponse("Password doesn't match")

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

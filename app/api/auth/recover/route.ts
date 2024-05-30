import prisma from "@/lib/prisma"
import { GenericErrorResponse } from "@/lib/responses"
import { getSession } from "@/lib/session"
import { RecoveryType } from "@/lib/validation"
import * as bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as RecoveryType
    // get user and bcrypt compare recovery phrase
    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    })

    if (!user)
      return NextResponse.json(
        {
          message: "no user with that username",
        },
        { status: 400 }
      )

    const result = await bcrypt.compare(
      data.recoveryPhrase,
      user.recoveryPhrase
    )

    if (!result)
      return NextResponse.json(
        {
          message: "incorrect recovery phrase",
        },
        { status: 400 }
      )

    // from this point on, since they have recovery phrase, we are trusting this is the user
    // set new password
    const hashedPassword = await bcrypt.hash(data.password, 12)
    await prisma.user.update({
      where: {
        username: data.username,
      },
      data: {
        password: hashedPassword,
      },
    })

    // log out user so that they sign in again confirming new password works
    const session = await getSession()
    session.destroy()

    return NextResponse.json({
      message: "password successfully changed",
    })
  } catch (e) {
    console.error(e)
    return GenericErrorResponse
  }
}

import { RegisterSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { generateMnemonic, mnemonicToSeed } from "@scure/bip39"
import { wordlist } from "@scure/bip39/wordlists/english"
import { getSession } from "@/lib/session"
import { getNewAuthKey } from "@/lib/auth"
import { cookies } from "next/headers"
import { getRefreshToken } from "@/lib/refresh"
import { GenericErrorResponse } from "@/lib/responses"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log(data)

    const validationResult = await RegisterSchema.safeParseAsync(data)
    console.log(validationResult)
    if (!validationResult.success) {
      return NextResponse.json({
        error: validationResult.error,
      })
    }

    const { username, password } = validationResult.data

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (user) {
      return NextResponse.json(
        {
          error: "User already exist with this username",
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    // generate a recovery mnemonic phrase
    // and hash it for recovery
    const mnemonic = generateMnemonic(wordlist, 128)
    const hashedMnemonic = await bcrypt.hash(mnemonic, 12)

    const createdUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        recoveryPhrase: hashedMnemonic,
        authControlKey: getNewAuthKey(),
      },
    })

    // save user to session
    // so we are logged in after registering
    const session = await getSession()
    session.user = {
      id: createdUser.id,
      username: createdUser.username,
    }
    session.expires = new Date().getTime() + 30 * 60 * 1000 // 30 minutes from now
    session.authControlKey = createdUser.authControlKey
    await session.save()
    // Generate refresh token and seal using iron-sesson
    // add to cookies using next.
    const refreshToken = await getRefreshToken(
      createdUser.id,
      createdUser.authControlKey
    )
    cookies().set({
      name: "futile-refresh-token",
      value: refreshToken,
      secure: false, //process.env.NODE_ENV === "production",
    })

    return NextResponse.json(
      {
        message: "User created successfully.",
        recoveryPhrase: mnemonic,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    // TODO make sure that if the user was created to delete it
    // careful about deleting an existing user if tat was the error
    // mor ejust so if there is an error after the actual insertion into databse
    // you dont end up with a bunch of "userless" users
    console.error(error)
    return GenericErrorResponse
  }
}

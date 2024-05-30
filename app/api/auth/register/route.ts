import { RegisterSchema } from "@/lib/validation"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { generateMnemonic, mnemonicToSeed } from "@scure/bip39"
import { wordlist } from "@scure/bip39/wordlists/english"
import { getSession } from "@/lib/session"

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
      return NextResponse.json({
        error: "User already exist with this username",
      })
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
      },
    })

    // save user to session
    // so we are logged in after registering
    const session = await getSession()
    session.id = createdUser.id
    session.username = createdUser.username
    session.isLoggedIn = true
    session.expires = new Date().getTime() + 30 * 60 * 1000 // 30 minutes from now

    await session.save()

    return NextResponse.json({
      message: "User created successfully.",
      recoveryPhrase: mnemonic,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      error: "System error. Please contact support",
    })
  }
}

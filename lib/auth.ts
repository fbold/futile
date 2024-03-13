import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

// // You'll need to import and pass this
// // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
// export const config = {
//   providers: [], // rest of your config
// } satisfies NextAuthOptions

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}

export function unauthorized() {
  return NextResponse.redirect("http://localhost:3000/login")
}

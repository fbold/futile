import NextAuth, { CallbacksOptions, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { JWT } from "next-auth/jwt"
import prisma from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

type RefreshResponse =
  | JWT
  | {
      error?: string
    }

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
  // CredentialsProvider({
  //   name: "credentials",
  //   credentials: {
  //     email: { label: "Email", type: "text" },
  //     password: { label: "Password", type: "password" },
  //   },
  //   async authorize(credentials, req) {
  //     try {
  //       const result = await loginSchema.safeParseAsync(credentials)

  //       if (!result.success) {
  //         throw new Error(result.error.errors[0].message)
  //       }

  //       const { email, password } = result.data

  //       const user = await prisma.user.findUnique({
  //         where: {
  //           email: email,
  //         },
  //         include: {
  //           accounts: true,
  //         },
  //       })

  //       if (!user) {
  //         throw new Error("User account does not exist")
  //       }

  //       if (user.accounts[0].provider !== "credentials") {
  //         throw new Error(`Please sign in with ${user.accounts[0].provider}`)
  //       }

  //       const passwordsMatch = await bcrypt.compare(password, user?.password!)

  //       if (!passwordsMatch) {
  //         throw new Error("Password is not correct")
  //       }

  //       return user
  //     } catch (error) {
  //       if (
  //         error instanceof Prisma.PrismaClientInitializationError ||
  //         error instanceof Prisma.PrismaClientKnownRequestError
  //       ) {
  //         throw new Error("System error. Please contact support")
  //       }

  //       throw error
  //     }
  //   },
  // }),
]

const callbacks: Partial<CallbacksOptions> = {
  async signIn({ user, account, profile, email }) {
    console.log(user, account, profile, email)
    // return true
    if (account?.provider === "email") {
      const userExists = await prisma.user.findUnique({
        where: { email: user.email! },
      })
      console.log("user", userExists)
      if (userExists) {
        return true
      } else {
        return false
      }
    }
    return true
  },
  jwt: async ({ token, user }) => {
    if (user) {
      // This will only be executed at login. Each next invocation will skip this part.
      // (because user is only passed as param on login)
      token.userId = user.id // set to have access in session callback
    }
    return token
  },
  session: async ({ session, user, token }) => {
    // here is where anything other than user (name, email, image)
    // is passed to the session (accessible client side)
    if (session.user) session.user.id = token.userId
    console.log("session", session)
    return session
  },
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
    signOut: "/login",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: "/", // New users will be directed here on first sign in
  },
  secret: process.env.NEXT_AUTH_SECRET,
  providers,
  callbacks,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 1 * 24 * 60 * 60, // 1 day
  },
  events: {
    // This gets called when as side effect when signOut is called on frontend
    // Need to happen as logout on API increments sessionCount on user
    // So access token will no longer work.
    async signOut({ session, token }) {
      console.log(session, token, "signing out")
    },
    async createUser(message) {
      console.log({ message })
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import { SessionData, sessionOptions } from "@/lib/session"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const REFRESH_THRESHOLD = 5 * 60 * 1000 // 5 minutes in ms

const handleRefresh = async (req: NextRequest): Promise<NextResponse> => {
  console.log("REFRESH: refreshing")
  try {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/refresh`,
      {
        method: "POST",
        body: JSON.stringify({
          refreshToken: cookies().get("futile-refresh-token")?.value,
        }),
      }
    )

    const { sealedNewSessionData } = await refreshResponse.json()

    if (!sealedNewSessionData) {
      console.log("REFRESH: Failed to refresh session. Will log out")
      const res = NextResponse.redirect(new URL("/login", req.url))
      const session = await getIronSession<SessionData>(
        req,
        res,
        sessionOptions
      )
      // IMPORTANT: delete refresh before session.destroy
      // for some reason, deleting refresh (expiring) overwrites the expiring of the access token
      // cookie done by session.destroy()
      res.cookies.delete("futile-refresh-token")
      session.destroy()
      return res
    }
    const goodRes = NextResponse.next()
    goodRes.cookies.set("futile-access-token", sealedNewSessionData)
    return goodRes
  } catch (e) {
    console.log("REFRESH: failed to refresh", e)
    const res = NextResponse.redirect(new URL("/login", req.url))
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    res.cookies.delete("futile-refresh-token")
    session.destroy()
    return res
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/register") &&
    !req.nextUrl.pathname.startsWith("/recover")
  ) {
    console.log("REFRESH: running refresh middleware")
    const res = NextResponse.next()
    const session = await getIronSession<SessionData>(req, res, sessionOptions)
    if (session.user) {
      // we have a session, check if expires soon
      // if session will expire within REFRESH_THRESHOLD, refresh
      const minutesLeft =
        Math.round(((session.expires - Date.now()) / (60 * 1000)) * 10) / 10
      console.log(`REFRESH: expiring in ${minutesLeft} min`)

      if (session.expires - Date.now() < REFRESH_THRESHOLD) {
        const refreshResult = await handleRefresh(req)
        return refreshResult
      }
      // no need to refresh because session is still within validity threshold
      return res
    } else {
      // no session, see if we can refresh anyway using refresh token
      const refreshResult = await handleRefresh(req)
      return refreshResult
    }
  }

  // any other response just proceed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}

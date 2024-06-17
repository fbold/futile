import { logout } from "@/lib/actions/logout"
import { getSession } from "@/lib/session"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const REFRESH_THRESHOLD = 5 * 60 * 1000 // 5 minutes in ms

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (!request.url.includes("login")) {
    console.log("REFRESH: running refresh middleware")
    const session = await getSession()
    // if session will expire within 5 mins refresh
    console.log(
      "REFRESH: expiring in",
      Math.round((session.expires - Date.now()) / (60 * 1000)),
      "min"
    )
    if (session.expires - Date.now() < REFRESH_THRESHOLD) {
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
          throw new Error("Failed to refresh, no new session returned")
        }
        // This doesn't work in middleware because of cookie stuff
        // instead we seal and set the cookie ourselves

        // const session = await getSession()
        // session.user = sealedNewSessionData.user
        // session.expires = sealedNewSessionData.expires
        // session.authControlKey = sealedNewSessionData.authControlKey
        // await session.save() // doesn't work in middleware

        console.log("REFRESH: successfully updated session", session)

        const response = NextResponse.next()
        response.cookies.set("futile-access-token", sealedNewSessionData)
        return response
      } catch (e) {
        console.log(
          "REFRESH: Failed to refresh session with below error. Will log out"
        )
        console.error(e)
        await logout()
        return NextResponse.redirect("/login")
      }
    } else {
      console.log("REFRESH: no need to refresh")
    }
  }

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

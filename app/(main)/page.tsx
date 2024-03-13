"use client"
import { signOut, useSession } from "next-auth/react"

export default function Home() {
  const session = useSession()

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <pre>{JSON.stringify(session.data?.user, null, 2)}</pre>
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
          sign out
        </button>
      </div>
    </>
  )
}

import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"

export default async function Me() {
  const getUserData = async () => {
    "use server"
    const session = await getSession()
    if (!session.isLoggedIn) return null
    return await prisma.user.findFirst({
      where: {
        id: session.id,
      },
    })
  }

  const user = await getUserData()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="sm:text-left w-1/3 sm:w-1/4 md:w-1/6 lg:w-2/12 sm:whitespace-break-spaces text-justify tracking-widest">
        <p>
          <span className="text-red-400">
            I{`   `}c a l l{`   `}m e{`   `}
          </span>
          {user?.username?.split("").join(" ")}
          {`   `}
          <span className="text-red-400">
            I{`   `}c a m e{`   `}h e r e{`   `}f i r s t{`   `}o n{`   `}
          </span>
          {user?.createdAt?.getTime().toString().split("").join(" ")}
        </p>
        <br />
      </div>
      {/* <p>{user?.createdAt?.getTime()}</p> */}
      {/* <h1 className="font-bold text-2xl">I call me</h1>
      <p>{user.name}</p>
      <h1 className="font-bold text-2xl">I call me</h1>
      <p>{user.name}</p> */}
    </div>
  )
}

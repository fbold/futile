import CategoriesList from "@/app/(main)/meta/me/categories-list"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"

export default async function Me() {
  const getUserData = async () => {
    "use server"
    const session = await getSession()
    if (!session.user) return null
    return await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        categories: true,
      },
    })
  }

  const user = await getUserData()

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="sm:text-left w-1/3 sm:w-1/4 md:w-1/6 lg:w-2/12 sm:whitespace-break-spaces text-justify tracking-widest">
        <p>
          <span className="text-r">u s e r n a m e</span>
          {` // `}
          {user?.username?.split("").join(" ")}
          {` // `}
          <span className="text-r">j o i n e d</span>
          {` // `}
          {user?.createdAt.toDateString().toLowerCase().split("").join(" ")}
        </p>
        <br />
        {user?.categories ? (
          <CategoriesList categories={user?.categories} />
        ) : (
          <p>...</p>
        )}
      </div>
    </div>
  )
}

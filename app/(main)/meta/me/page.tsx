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
      <div className="sm:text-left max-w-[10rem] sm:whitespace-break-spaces text-justify tracking-widest">
        <p>
          <span className="text-rd">u s e r n a m e</span>
          {` // `}
          <br />
          {user?.username?.split("").join(" ")}
          <br />
          <span className="text-rd">j o i n e d</span>
          {` // `}
          <br />
          {user?.createdAt
            .toLocaleDateString("en-UK")
            .replaceAll("/", "")
            .split("")
            .join(" ")}
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

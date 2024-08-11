import TileList from "@/components/read/tile-list"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Read({
  searchParams,
}: {
  searchParams: { c: string }
}) {
  const session = await getSession()
  if (!session.user) redirect("/login")
  const initialTiles = await prisma.tile.findMany({
    take: 10,
    where: {
      category_id: searchParams.c,
      user_id: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div className="w-full h-full gap-2 overflow-scroll">
      <div className="flex flex-col my-12 px-4 w-full md:w-2/3 lg:w-3/5 gap-4 relative left-1/2 -translate-x-1/2">
        <TileList initialTiles={initialTiles} />
      </div>
    </div>
  )
}

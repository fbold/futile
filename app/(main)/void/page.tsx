import VoidTileList from "@/components/read/void-tile-list"
import { VoidOverlay } from "@/components/void/overlay"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Void({
  searchParams,
}: {
  searchParams: { c: string }
}) {
  const session = await getSession()
  if (!session.user) redirect("/login")
  const initialTiles = await prisma.tile.findMany({
    take: 10,
    where: {
      inVoid: true,
    },
    omit: {
      user_id: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <div className="w-full h-full gap-2">
      <VoidOverlay />
      <div className="flex flex-col my-12 px-6 py-2 w-full md:w-2/3 lg:w-3/5 max-w-4xl gap-4 relative left-1/2 -translate-x-1/2">
        <VoidTileList initialTiles={initialTiles} />
      </div>
    </div>
  )
}

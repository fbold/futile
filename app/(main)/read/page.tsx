import TilePreview from "@/components/read/tile"
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
  })

  return (
    <div className="w-full h-full gap-2 overflow-scroll">
      <div className="flex flex-col my-12 px-4 sm:mx-0 w-full md:w-2/3 xl:w-1/2 gap-4 relative left-1/2 -translate-x-1/2">
        {initialTiles.map((tile) => (
          <TilePreview key={tile.id} tile={tile}></TilePreview>
        ))}
      </div>
    </div>
  )
}

import TileList from "@/components/read/tile-list"
import prisma from "@/lib/prisma"

export default async function Read({
  searchParams,
}: {
  searchParams: { c: string }
}) {
  const initialTiles = await prisma.tile.findMany({
    take: 10,
    where: {
      category: searchParams.c,
    },
  })

  return <TileList initialTiles={initialTiles} />
}

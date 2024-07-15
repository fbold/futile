import TilePreview from "@/components/read/tile"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
// import { Tile } from "@prisma/client"
// import { Suspense } from "react"

// const TilePreviewFallback = ({ tile }: { tile: Tile }) => {
//   console.log("fallbackkk....")
//   return (
//     <div>
//       {tile.content.split("\n").map((line) => (
//         <p key={line}>---------------</p>
//       ))}
//     </div>
//   )
// }

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
      <div className="flex flex-col my-12 px-4 sm:mx-0 w-full md:w-1/2 xl:w-1/3 gap-4 relative left-1/2 -translate-x-1/2">
        {initialTiles.map((tile) => (
          <TilePreview key={tile.id} tile={tile}></TilePreview>
        ))}
      </div>
    </div>
  )
}

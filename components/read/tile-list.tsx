"use client"
import TilePreview from "@/components/read/tile"
import useGET from "@/hooks/fetchers/useGET"
import useOnScreen from "@/hooks/useOnScreen"
import useSkipTake from "@/hooks/useSkipTake"
import type { Tile } from "@prisma/client"
import { useRef, useState } from "react"

type TileListProps = {
  initialTiles: Tile[]
}

export default function TileList({ initialTiles }: TileListProps) {
  const [tiles, setTiles] = useState(initialTiles)
  const secondLastTile = useRef<HTMLSpanElement>(null)

  const { skipTake, takeMore } = useSkipTake([10, 20])

  const { trigger } = useGET<{ tiles: Tile[] }>("/api/tile")

  const shouldLoadMore = useOnScreen(secondLastTile, async () => {
    console.log("on screen")
    const result = await trigger(
      `/api/tile?skip=${skipTake[0]}&take=${skipTake[1]}`
    )
    if (result?.tiles?.length) {
      setTiles((curr) => [
        ...curr,
        ...result.tiles.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        })),
      ])
    }
    // // for next time
    takeMore(10)
  })

  return (
    <div className="relative w-full h-full gap-2 overflow-scroll">
      <div className="flex flex-col w-full gap-2 px-12 py-12">
        {tiles.map((tile) => (
          <TilePreview key={tile.id} tile={tile}></TilePreview>
        ))}
      </div>
      {tiles.length === 10 ? (
        // this is our onscreen ref point. when this is crolled into view the next 10 tiles are fetched
        <span
          className="h-0 w-full absolute bottom-80"
          ref={secondLastTile}
        ></span>
      ) : null}
    </div>
  )
}

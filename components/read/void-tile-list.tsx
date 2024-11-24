"use client"
import TilePreview from "@/components/read/tile"
import useGET from "@/hooks/fetchers/useGET"
import useSkipTake from "@/hooks/useSkipTake"
import type { Tile } from "@prisma/client"
import { useState } from "react"
import { DefaultButton } from "../buttons"

type VoidTileListProps = {
  initialTiles: Omit<Tile, "user_id">[]
}

export default function VoidTileList({ initialTiles }: VoidTileListProps) {
  const [tiles, setTiles] = useState(initialTiles)

  const { skipTake, takeMore } = useSkipTake([initialTiles.length, 10])

  const { trigger } = useGET<{ tiles: Tile[] }>("/api/tile/void")

  const getNew = async () => {
    const result = await trigger(
      `/api/tile/void?skip=${skipTake[0]}&take=${skipTake[1]}`,
    )
    // for next time
    takeMore(10)
    if (result?.tiles?.length) {
      setTiles((curr) => [
        ...curr,
        ...result.tiles.map((t) => ({
          ...t,
          createdAt: new Date(t.createdAt),
        })),
      ])
    }
  }

  return (
    <div className="relative w-full h-full gap-2">
      <div className="flex flex-col w-full gap-2 py-12">
        {tiles.map((tile) => (
          <TilePreview
            key={tile.id}
            tile={tile}
            href={`/void/${tile.id}`}
          ></TilePreview>
        ))}
      </div>
      {tiles.length >= skipTake[0] ? (
        <DefaultButton
          className="h-16 w-36 border-dashed mx-auto text-center leading-none font-mono mb-20"
          onClick={getNew}
        >
          load more
        </DefaultButton>
      ) : null}
    </div>
  )
}

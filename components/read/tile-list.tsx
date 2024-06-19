import TilePreview from "@/components/read/tile"
import type { Tile } from "@prisma/client"

type TileListProps = {
  initialTiles: Tile[]
}

export default function TileList({ initialTiles }: TileListProps) {
  return (
    <div className="w-full h-full gap-2 overflow-scroll">
      <div className="flex flex-col w-full gap-2 px-12 py-12">
        {initialTiles.map((tile) => (
          <TilePreview key={tile.id} tile={tile}></TilePreview>
        ))}
      </div>
    </div>
  )
}

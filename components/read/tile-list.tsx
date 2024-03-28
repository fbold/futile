import TilePreview from "@/components/read/tile"
import type { Tile } from "@prisma/client"

type TileListProps = {
  initialTiles: Tile[]
}

export default function TileList({ initialTiles }: TileListProps) {
  return (
    <div className="flex flex-col w-full mt-12 gap-2 mx-12">
      {initialTiles.map((tile) => (
        <TilePreview key={tile.id} tile={tile}></TilePreview>
      ))}
    </div>
  )
}

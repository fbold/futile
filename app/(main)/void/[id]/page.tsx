import EditorRead from "@/components/editor/editor-read"
import { ReadOptions } from "@/components/read/read-options"
import { VoidIcon } from "@/components/read/void-icon"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Tile } from "@prisma/client"

export default async function Read({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const retrievedTile = await prisma.tile.findUnique({
    where: {
      id: params.id,
      inVoid: true, // has to be in the void
    },
  })

  let editOptions = false
  if (retrievedTile?.user_id === session.user.id) editOptions = true

  // TODO this might be giving the user id of void document to client
  // need to find a better way to do this (aka not the easiest way possible)
  // having said that, if I put a console.log of tile in ReadOptions, it doesn't show the user_id as surviving its way to the client
  if (retrievedTile) {
    // @ts-ignore
    delete retrievedTile.user_id
    const tile = retrievedTile as Exclude<Tile, "user_id">
    return (
      <>
        <div className="relative md:z-20 whitespace-pre-wrap overflow-x-visible w-full h-full pt-24 mx-6  sm:mx-20 md:mx-0 md:w-2/3 lg:w-1/2 max-w-4xl">
          <div className="my-2 flex flex-col">
            <VoidIcon inVoid>{tile.title}</VoidIcon>
            <p className="text-dim text-xs mb-2 ">
              {tile.createdAt
                ? `${tile.createdAt
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")}  ${tile.createdAt.toLocaleDateString()}`
                : null}
            </p>
          </div>
          {editOptions ? (
            <div className="fixed block top-24 right-8 sm:right-20 md:right-[16.7%]">
              <ReadOptions tile={tile} />
            </div>
          ) : null}
          <EditorRead content={tile.content} />
        </div>
      </>
    )
  } else return <div>couldnt find</div>
}

import { ReadOptions } from "@/components/read/read-options"
import EditorRead from "@/components/editor/editor-read"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { VoidIcon } from "@/components/read/void-icon"

export default async function Read({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const tile = await prisma.tile.findUnique({
    where: {
      id: params.id,
      user_id: session?.user.id,
    },
  })

  if (tile)
    return (
      <>
        <div className="relative md:z-20 whitespace-pre-wrap overflow-x-visible w-full h-full pt-24 px-6 md:w-2/3 lg:w-3/5 max-w-4xl">
          <div className="my-2 flex flex-col relative">
            <VoidIcon inVoid={tile.inVoid}>{tile.title}</VoidIcon>
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
          <div className="fixed md:absolute block top-24 right-8 sm:right-20 md:right-[16.7%]">
            <ReadOptions tile={tile} />
          </div>
          <EditorRead content={tile.content} />
        </div>
      </>
    )
  else return <div>couldnt find</div>
}

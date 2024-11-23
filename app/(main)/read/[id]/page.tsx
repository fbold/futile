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
        <div className="relative md:z-20 whitespace-pre-wrap overflow-x-visible w-full h-full pt-24 mx-5 md:mx-0 md:w-2/3 lg:w-1/2 max-w-3xl">
          <div className="fixed md:absolute block top-24 right-8 sm:right-20 md:right-[16.7%]">
            <ReadOptions tile={tile} />
          </div>
          <div className="my-2 flex flex-col relative">
            {tile.inVoid ? <VoidIcon className="absolute -left-2 top-2 rotate-90 md:rotate-0 -translate-x-full" /> : null}
            <h2 className="w-full">{tile.title}</h2>
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
          <EditorRead content={tile.content} />
        </div>
      </>
    )
  else return <div>couldnt find</div>
}

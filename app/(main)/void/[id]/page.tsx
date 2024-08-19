import EditorRead from "@/components/editor/editor-read"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export default async function Read({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session) return null

  const tile = await prisma.tile.findUnique({
    where: {
      id: params.id,
      inVoid: true, // has to be in the void
    },
  })

  if (tile)
    return (
      <>
        <div className="relative md:z-20 whitespace-pre-wrap overflow-x-visible w-full h-full pt-24 mx-5 sm:mx-20 md:mx-0 md:w-2/3 lg:w-1/2">
          <div className="my-2 flex flex-col">
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

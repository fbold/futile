import { ReadOptions } from "./read-options"
import EditorRead from "@/components/editor/editor-read"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

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
        <div className="relative md:z-20 whitespace-pre-wrap overflow-x-visible w-full h-full pt-24 mx-5 sm:mx-20 md:mx-0 md:w-2/3 lg:w-1/2">
          <div className="fixed block top-24 right-8 sm:right-20 md:right-[16.7%]">
            <ReadOptions tile={tile} />
          </div>
          <div className="my-2 flex justify-between">
            <p className="font-bold w-full">{tile.title}</p>
          </div>
          <EditorRead content={tile.content} />
        </div>
      </>
    )
  else return <div>couldnt find</div>
}

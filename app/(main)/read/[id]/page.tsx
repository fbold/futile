import EditorRead from "@/components/editor/editor-read"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { CSSProperties } from "react"

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
      <div className="relative md:z-50 whitespace-pre-wrap w-full h-full pt-24 mx-5 sm:mx-20 md:mx-0 md:w-2/3 lg:w-1/2">
        <div className="my-2 flex justify-between">
          <p className="font-bold w-full">{tile.title}</p>
          <div className="absolute flex flex-row justify-between items-start top-24 right-0">
            {/* {tile.id === session.data?.user.id ? ( */}
            <div className="mt-2 flex flex-col">
              <a className="w-16 underline" href={`/write/${tile.id}`}>
                edit
              </a>
              <a className="w-16 underline text-rd" href={`/write/${tile.id}`}>
                delete
              </a>
            </div>
            {/* ) : null} */}
          </div>
        </div>
        <EditorRead content={tile.content} />
      </div>
    )
  else return <div>couldnt find</div>
}

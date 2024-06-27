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
      <div className="relative whitespace-pre-wrap w-full h-full md:w-2/3 lg:w-1/2">
        <div className="mb-2 flex justify-between">
          <span>
            <h1 className="font-bold">{tile.title}</h1>
          </span>
          <div className="absolute flex flex-row justify-between items-start top-0 right-0">
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

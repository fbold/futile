import EditorRead from "@/components/editor/editor-read"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { Tile } from "@prisma/client"
import { redirect } from "next/navigation"

export default async function Void({}: {}) {
  const session = await getSession()
  if (!session.user) redirect("/login")
  const result = await prisma.$queryRaw<
    [Partial<Tile>]
  >`SELECT title,"updatedAt","createdAt",content,id,"inVoid" FROM tiles WHERE "inVoid" = true ORDER BY RANDOM() LIMIT 1`
  const tile = result && result[0]
  console.log(tile)

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
          <EditorRead content={tile.content!} />
        </div>
      </>
    )
  else return <div>couldnt find</div>
}

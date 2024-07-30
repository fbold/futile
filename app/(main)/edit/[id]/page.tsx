import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import EditClient from "./client-editor"

export default async function Edit({ params }: { params: { id: string } }) {
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
      <EditClient
        tileId={tile.id}
        editorContent={tile.content}
        title={tile.title}
      />
    )
  else return <div>couldnt find</div>
}

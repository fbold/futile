"use client"
import Editor from "@/components/editor"
import usePATCH from "@/hooks/fetchers/usePATCH"
import { Tile } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"

type EditClientProps = {
  tileId: string
  editorContent: string
  title: string
}

export default function EditClient({
  tileId,
  editorContent,
  title,
}: EditClientProps) {
  const router = useRouter()
  const params = useSearchParams()
  const category = params.get("c") || ""

  const { trigger, loading, success, error } = usePATCH<Partial<Tile>, any>(
    `/api/tile?id=${tileId}`
  )

  const handleSave = async (title: string, content?: string) => {
    const result = await trigger({ title, content })

    if (result) {
      router.push(`/read/${result.tile.id}`)
    }
  }

  return (
    // <div className="flex justify-center h-full max-h-full scroll">
    <div
      className="relative p-4 pt-11 md:px-8 md:py-20 flex flex-col w-full md:w-2/3 lg:w-3/5 h-full min-h-full"
      key={category}
    >
      <Editor
        onSave={handleSave}
        loadingSave={loading}
        category={category}
        initialContent={editorContent}
        initialTitle={title}
      />
    </div>
    // </div>
  )
}

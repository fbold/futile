"use client"
import Editor from "@/components/editor"
import usePOST from "@/hooks/fetchers/usePOST"
import { Tile } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Write() {
  const router = useRouter()
  const params = useSearchParams()
  const category = params.get("c") || ""
  const localStorageKey = category + "-write"

  const { trigger, loading, success, error } = usePOST<Partial<Tile>, any>(
    "/api/tile"
  )

  const handleSave = async (title: string, content?: string) => {
    if (!category) return //TODO: handle this error case
    const result = await trigger({ title, content, category_id: category })

    if (result) {
      localStorage.removeItem(localStorageKey)
      router.push(`/read/${result.tile.id}`)
    }
  }

  const localSave =
    typeof window !== "undefined" ? localStorage.getItem(localStorageKey) : null
  const { editorContent = "", title = "" } = localSave
    ? JSON.parse(localSave)
    : {}

  return (
    // <div className="flex justify-center h-full max-h-full scroll">
    <div
      className="relative p-4 pt-11 md:px-8 md:py-20 flex flex-col w-full md:w-2/3 lg:w-3/5 h-full min-h-full"
      key={category}
    >
      <Editor
        onSave={handleSave}
        loadingSave={loading}
        initialContent={editorContent}
        initialTitle={title}
        saveTo={localStorageKey}
      />
    </div>
    // </div>
  )
}

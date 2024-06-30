"use client"
import Editor from "@/components/editor"
import usePOST from "@/hooks/fetchers/usePOST"
import { Tile } from "@prisma/client"
import { useRouter, useSearchParams } from "next/navigation"

export default function Write() {
  const router = useRouter()
  const params = useSearchParams()

  const { trigger, loading, success, error } = usePOST<Partial<Tile>, any>(
    "/api/tile"
  )

  const handleSave = async (title: string, content?: string) => {
    const category = params.get("c")
    if (!category) return //TODO: handle this error case
    const result = await trigger({ title, content, category_id: category })

    if (result) {
      router.push(`/read/${result.tile.id}`)
    }
  }

  return (
    // <div className="flex justify-center h-full max-h-full scroll">
    <div className="relative bg-pri dark:bg-pri-d p-4 md:px-8 md:py-4 flex flex-col w-full md:w-2/3 lg:w-3/5 h-full min-h-full">
      <Editor onSave={handleSave} loadingSave={loading} />
    </div>
    // </div>
  )
}

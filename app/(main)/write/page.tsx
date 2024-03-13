"use client"
import Editor from "@/components/editor"
import { useRouter, useSearchParams } from "next/navigation"

export default function Write() {
  const router = useRouter()
  const params = useSearchParams()
  const handleSave = async (title: string, content?: string) => {
    const post = await fetch("/api/tile", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        category: params.get("c"),
      }),
    }).then((res) => res.json())

    if (post.status === 200) {
      router.push(`/read/${post.tile.id}`)
    }
  }

  return (
    // <div className="flex justify-center h-full max-h-full scroll">
    <div className="relative bg-pri dark:bg-pri-d md:px-8 md:py-4 flex flex-col w-full md:w-2/3 lg:w-1/2 h-full min-h-full">
      <Editor onSave={handleSave} saveResult={true} />
    </div>
    // </div>
  )
}

"use client"
import Editor from "@/components/editor"

export default function Write() {
  return (
    <div className="flex justify-center h-full max-h-full scroll">
      <div className="relative bg-pri dark:bg-pri-d md:px-8 md:py-4 flex flex-col w-full md:w-2/3 lg:w-1/2 h-full min-h-full">
        <Editor onSave={(e) => ({})} saveResult={true} />
      </div>
    </div>
  )
}

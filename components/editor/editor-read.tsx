"use client"
import { defaults } from "@/components/editor/editor-defaults"
import { useEditor, EditorContent } from "@tiptap/react"
import clsx from "clsx"

type EditorReadProps = {
  content: string
}

const EditorRead = ({ content }: EditorReadProps) => {
  const editor = useEditor({
    ...defaults,
    editable: false,
    content: content,
  })

  if (!editor) return <p>Loading</p>
  return (
    <EditorContent
      editor={editor}
      className={
        clsx()
        // "h-full"
        // 'before:absolute before:w-full before:bg-gradient-to-b before:from-sec before:h-5'
      }
    />
  )
}

export default EditorRead

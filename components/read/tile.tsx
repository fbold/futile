"use client"
import { defaults } from "@/components/editor/editor-defaults"
import { EditorContent, useEditor } from "@tiptap/react"
import clsx from "clsx"
import Link from "next/link"
import { memo, useEffect, useRef, useState } from "react"
import type { Tile } from "@prisma/client"
type Props = {
  tile: Partial<Tile>
}

const TilePreview = memo(({ tile }: Props) => {
  const divRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [fadeText, setFadeText] = useState(false)

  const editor = useEditor({
    ...defaults,
    editable: false,
    content: tile.content,
    onUpdate() {
      // Calculates if there is an overflow and shows fade if so
      // The multiplier should be same as height in percent of tile div
      if (divRef.current && window.visualViewport && titleRef.current) {
        setFadeText(
          divRef.current?.getBoundingClientRect().height +
            titleRef.current?.getBoundingClientRect().height >=
            window.visualViewport?.height * 0.5
        )
      }
    },
  })

  useEffect(() => {
    if (!editor || !tile) return
    editor?.commands.setContent(tile.content || "", true)
  }, [editor, tile])

  return (
    <div
      className={clsx(
        "rounded-none flex-1 p-4 w-auto break-inside-avoid bg-pri dark:bg-pri-d mb-1 border border-opacity-30 relative overflow-hidden cursor-pointer"
        // !fadeText && "py-14"
      )}
    >
      <Link href={`/read/${encodeURIComponent(tile.id ?? "")}`}>
        <h2 ref={titleRef} className="font-extrabold">
          {tile.title}
        </h2>
      </Link>
      <p className="text-gray-500 text-xs mb-2">
        {tile.createdAt ? tile.createdAt.toDateString() : null}
      </p>
      <div
        ref={divRef}
        className="overflow-hidden whitespace-pre-wrap font-eb-garamond text-base"
      >
        <EditorContent editor={editor} />
      </div>
      {fadeText ? (
        <span className="absolute rounded-b-lg -ml-2 w-full h-32 pointer-events-none bottom-0 bg-gradient-to-t from-pri dark:from-pri-d"></span>
      ) : null}
    </div>
  )
})

TilePreview.displayName = "TilePreview"

export default TilePreview

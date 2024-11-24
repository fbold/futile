"use client"
import { defaults } from "@/components/editor/editor-defaults"
import { EditorContent, useEditor } from "@tiptap/react"
import clsx from "clsx"
import Link from "next/link"
import { memo, useEffect, useRef, useState } from "react"
import type { Tile } from "@prisma/client"
import { VoidIcon } from "./void-icon"
type Props = {
  tile: Partial<Tile>
  href?: string
}

const TilePreview = memo(({ tile, href }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [fadeText, setFadeText] = useState(false)

  // const editor = useEditor({
  //   ...defaults,
  //   editable: false,
  //   content: tile.content,
  //   onUpdate() {
  //     // Calculates if there is an overflow and shows fade if so
  //     // The multiplier should be same as height in percent of tile div
  //     if (
  //       containerRef.current &&
  //       divRef.current &&
  //       window.visualViewport &&
  //       titleRef.current
  //     ) {
  //       setFadeText(
  //         divRef.current?.getBoundingClientRect().height +
  //           titleRef.current?.getBoundingClientRect().height >=
  //           containerRef.current?.getBoundingClientRect().height
  //       )
  //     }
  //   },
  // })

  useEffect(() => {
    if (
      containerRef.current &&
      divRef.current &&
      window.visualViewport &&
      titleRef.current
    ) {
      setFadeText(
        divRef.current?.getBoundingClientRect().height +
          titleRef.current?.getBoundingClientRect().height >=
          containerRef.current?.getBoundingClientRect().height,
      )
    }
  }, [])

  return (
    <div
      className={clsx(
        "relative rounded-none block w-full flex-grow max-h-screen break-inside-avoid mb-1 cursor-pointer",
        // !fadeText && "py-14"
      )}
      ref={containerRef}
    >
      <Link href={href || `/read/${encodeURIComponent(tile.id ?? "")}`}>
        <VoidIcon inVoid={tile.inVoid}>{tile.title}</VoidIcon>
      </Link>
      <p
        className="text-dim text-xs mb-2 whitespace-pre-wrap"
        suppressHydrationWarning
      >
        {tile.createdAt
          ? `${tile.createdAt
              .toLocaleTimeString()
              .split(":")
              .slice(0, 2)
              .join(":")}  ${tile.createdAt.toLocaleDateString()}`
          : null}
      </p>
      <div
        ref={divRef}
        className="overflow-hidden whitespace-pre-line space-y-2"
        dangerouslySetInnerHTML={{ __html: tile.content! }}
      >
        {/* <EditorContent editor={editor} /> */}
      </div>
      {fadeText ? (
        <>
          <span className="absolute rounded-b-lg -ml-2 w-full h-32 pointer-events-none bottom-0 bg-gradient-to-t from-sec from-5% to-transparent"></span>
          <Link
            href={`/read/${encodeURIComponent(tile.id ?? "")}`}
            className="absolute bottom-2 left-1/2 -translate-x-1/2"
          >
            read more...
          </Link>
        </>
      ) : null}
    </div>
  )
})

TilePreview.displayName = "TilePreview"

export default TilePreview

"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import clsx from "clsx"
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
} from "@tabler/icons-react"
import { EditorButton } from "@/components/editor/editor-button"
import { TextInput } from "@/components/input"
import { SubmitHandler, useForm } from "react-hook-form"
// import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
// import { UseMutationState } from 'urql'
import { MutationButton } from "@/components/buttons"
import { useRef } from "react"
import { localSave } from "@/lib/editor"

type EditorProps = {
  onSave: (title: string, content?: string) => {}
  initialTitle?: string
  initialContent?: string
  loadingSave: boolean //UseMutationState
  saveTo?: string
}

const PoemSchema = z.object({
  title: z.string().min(1, { message: "Poem must have a title" }),
})

type PoemType = z.infer<typeof PoemSchema>

const Editor = ({
  onSave,
  initialTitle,
  initialContent,
  loadingSave,
  saveTo,
}: EditorProps) => {
  const savingTimeout = useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    autofocus: true,
    editable: true,
    injectCSS: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start your poem here ...",
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "px-2 pt-1 pb-32 min-h-full focus:outline-none break-words",
      },
    },
    onUpdate(e) {
      if (!saveTo) return
      if (savingTimeout.current) clearTimeout(savingTimeout.current)

      savingTimeout.current = setTimeout(() => {
        console.log("saving to localStorage")
        localSave(e.editor?.getHTML() || "", getValues("title"), saveTo)
      }, 1000)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<PoemType>({
    // resolver: zodResolver(PoemSchema),
    defaultValues: {
      title: initialTitle,
    },
  })

  const handleSave: SubmitHandler<PoemType> = ({ title }) => {
    onSave(title, editor?.getHTML())
  }

  if (!editor) return <p>Loading</p>
  return (
    <>
      <div className="px-2 z-50">
        <TextInput
          type="text"
          placeholder="title"
          className="font-open-sans bg-transparent w-full text-xl border-0 outline-none max-h-none p-3 text-left"
          classNameOnError="focus:outline-none focus:outline-0"
          error={errors?.title?.message || null}
          autoComplete="off"
          outline={false}
          {...register("title")}
        />
      </div>
      <div className="w-full h-8 mb-3 flex flex-row gap-2 sticky top-0 bg-gradient-to-b from-80% justify-between">
        <div className="flex flex-row gap-2 h-8 w-full">
          <EditorButton
            editor={editor}
            toggleEffect={(e) => e.toggleBold()}
            effectConditions="bold"
            Icon={IconBold}
          />
          <EditorButton
            editor={editor}
            toggleEffect={(e) => e.toggleItalic()}
            effectConditions="italic"
            Icon={IconItalic}
          />
          <div className="flex flex-row">
            <EditorButton
              editor={editor}
              toggleEffect={(e) => e.setTextAlign("left")}
              effectConditions={{ textAlign: "left" }}
              Icon={IconAlignLeft}
              group="left"
            />
            <EditorButton
              editor={editor}
              toggleEffect={(e) => e.setTextAlign("center")}
              effectConditions={{ textAlign: "center" }}
              Icon={IconAlignCenter}
              group="middle"
            />
            <EditorButton
              editor={editor}
              toggleEffect={(e) => e.setTextAlign("right")}
              effectConditions={{ textAlign: "right" }}
              Icon={IconAlignRight}
              group="middle"
            />
            <EditorButton
              editor={editor}
              toggleEffect={(e) => e.setTextAlign("justify")}
              effectConditions={{ textAlign: "justify" }}
              Icon={IconAlignJustified}
              group="right"
            />
          </div>
        </div>
        <MutationButton
          className="h-full"
          fetching={loadingSave}
          onClick={handleSubmit(handleSave)}
        >
          save
        </MutationButton>
      </div>
      <EditorContent editor={editor} className="h-full" />
    </>
  )
}

export default Editor

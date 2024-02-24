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

type EditorProps = {
  onSave: (title: string, content?: string) => {}
  initialTitle?: string
  initialContent?: string
  saveResult: any //UseMutationState
}

const PoemSchema = z.object({
  title: z.string().min(1, { message: "Poem must have a title" }),
})

type PoemType = z.infer<typeof PoemSchema>

const Editor = ({
  onSave,
  initialTitle,
  initialContent,
  saveResult,
}: EditorProps) => {
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
        class: "px-2 pt-1 pb-3 min-h-full focus:outline-none",
      },
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      <div className="px-2">
        <TextInput
          type="text"
          placeholder="Title"
          className="w-full text-2xl border-0 outline-none max-h-none p-3 text-center"
          classNameOnError="focus:outline-none focus:outline-0"
          error={errors?.title?.message || null}
          autoComplete="off"
          outline={false}
          {...register("title")}
        />
      </div>
      <div className="w-full flex flex-row p-2 pb-3 gap-2 sticky top-0 bg-gradient-to-b from-pri dark:from-pri-d from-80% justify-between">
        <div className="flex flex-row gap-2">
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
          <div>
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
          fetching={saveResult.fetching}
          onClick={handleSubmit(handleSave)}
        />
      </div>
      <EditorContent
        editor={editor}
        className={clsx(
          "h-full"
          // 'before:absolute before:w-full before:bg-gradient-to-b before:from-sec before:h-5'
        )}
      />
    </>
  )
}

export default Editor

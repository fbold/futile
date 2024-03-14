import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorOptions } from "@tiptap/react"

export const defaults: Partial<EditorOptions> = {
  autofocus: false,
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
  editorProps: {
    attributes: {
      class: "focus:outline-none",
    },
  },
}

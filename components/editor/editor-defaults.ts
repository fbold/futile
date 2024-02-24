import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import { EditorOptions } from '@tiptap/react'

export const defaults: Partial<EditorOptions> = {
  autofocus: false,
  editable: true,
  injectCSS: false,
  extensions: [
    StarterKit,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  editorProps: {
    attributes: {
      class: 'focus:outline-none',
    },
  },
}

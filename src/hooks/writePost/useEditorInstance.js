import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const useEditorInstance = ({ initialContent, onChange, onPasteImage }) => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            style: 'white-space: pre-wrap;',
          },
        },
        hardBreak: {
          HTMLAttributes: {
            style: 'white-space: pre-wrap;',
          },
        },
      }),
      Image,
      Placeholder.configure({ placeholder: '내용을 입력하세요' }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    parseOptions: {
      preserveWhitespace: 'full',
    },
    editorProps: {
      attributes: {
        class:
          'tiptap text-left text-lg min-h-[300px] border border-dark-gray rounded-md p-4 focus:outline-none bg-white whitespace-pre-wrap',
        style: 'white-space: pre-wrap;',
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false

        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
              onPasteImage(file)
                .then((url) => {
                  view.dispatch(
                    view.state.tr.replaceSelectionWith(
                      view.state.schema.nodes.image.create({ src: url }),
                    ),
                  )
                })
                .catch(() => {})
              return true
            }
          }
        }

        return false
      },
    },
  })
}

export default useEditorInstance

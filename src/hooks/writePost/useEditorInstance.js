import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import HardBreak from '@tiptap/extension-hard-break'

const CustomHardBreak = HardBreak.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setHardBreak(),
    }
  },
})

const useEditorInstance = ({ initialContent, onChange, onPasteImage }) => {
  return useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'mb-2',
          },
        },
        hardBreak: false,
      }),
      CustomHardBreak.configure({
        keepMarks: true,
        HTMLAttributes: {
          class: 'line-break',
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
          'tiptap text-left text-lg min-h-[300px] border border-dark-gray rounded-md p-4 focus:outline-none bg-white prose-content',
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

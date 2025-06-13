import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

const useEditorInstance = ({ initialContent, onChange, onPasteImage }) => {
  return useEditor({
    extensions: [StarterKit, Image, Placeholder.configure({ placeholder: '내용을 입력하세요' })],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'tiptap prose text-left prose-lg min-h-[300px] border border-dark-gray rounded-md p-4 focus:outline-none bg-white',
      },
      handlePaste: async (event) => {
        const items = event.clipboardData?.items
        if (!items) return false
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
              try {
                const url = await onPasteImage(file)
                editor.chain().focus().setImage({ src: url }).run()
              } catch (error) {}
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

import { useEditor, EditorContent } from '@tiptap/react'
import { authApi } from '../../services/api/axios'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback } from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null
  return (
    <div className='mb-2 flex gap-2'>
      <button
        className='px-2 py-1 border rounded hover:bg-gray-100 font-bold'
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ fontWeight: editor.isActive('bold') ? 'bold' : 'normal' }}
      >
        Bold
      </button>
      <button
        className='px-2 py-1 border rounded hover:bg-gray-100 italic'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal' }}
      >
        Italic
      </button>
      <button
        className='px-2 py-1 border rounded hover:bg-gray-100'
        onClick={() => document.querySelector('#file-input').click()}
      >
        Image
      </button>
    </div>
  )
}

const WriteEditor = ({ initialContent, onChange, onAddFileId }) => {
  const uploadImage = useCallback(
    async (file) => {
      const res = await authApi.post('/images', {
        fileName: file.name,
        fileSize: file.size,
        boardType: 'BOARD',
      })
      const { presignedUrl, fileId } = res.data.data
      await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      const imageUrl = presignedUrl.split('?')[0]
      onAddFileId?.(fileId)
      return imageUrl
    },
    [onAddFileId],
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          'tiptap prose prose-lg min-h-[300px] border border-gray-300 rounded-md p-4 focus:outline-none bg-white',
      },
      handlePaste: async (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
              const url = await uploadImage(file)
              editor.chain().focus().setImage({ src: url }).run()
              return true
            }
          }
        }
        return false
      },
    },
  })

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = await uploadImage(file)
    editor.chain().focus().setImage({ src: url }).run()
  }

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <input
        id='file-input'
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default WriteEditor

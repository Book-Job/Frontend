import { useEditor, EditorContent } from '@tiptap/react'
import { authApi } from '../../services/api/axios'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import axios from 'axios'
import { useCallback } from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null
  return (
    <div className='mb-2 flex gap-2'>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ fontWeight: editor.isActive('bold') ? 'bold' : 'normal' }}
      >
        Bold
      </button>
      <button
        type='button'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal' }}
      >
        Italic
      </button>
      <button type='button' onClick={() => document.querySelector('#file-input').click()}>
        Image
      </button>
    </div>
  )
}

const WriteEditor = ({ initialContent, onChange, onAddFileId }) => {
  const uploadImage = useCallback(
    async (file) => {
      try {
        const res = await authApi.post('/images', {
          fileName: file.name,
          fileSize: file.size,
          boardType: 'BOARD',
        })
        const { presignedUrl, fileId } = res.data.data
        const response = await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': 'image/jpeg',
          },
        })

        if (response.status === 200 || response.status === 204) {
        } else {
          console.error('S3 업로드 실패:', response.status, response.statusText)
          throw new Error(`이미지 업로드 실패: ${response.status} ${response.statusText}`)
        }

        const imageUrl = presignedUrl.split('?')[0]
        onAddFileId?.(fileId)
        return imageUrl
      } catch (error) {
        if (error.response) {
          console.error('S3 업로드 403 에러 상세:', {
            status: error.response.status,
            statusText: error.response.statusText,
            headers: error.response.headers,
            data: error.response.data,
          })
          alert(
            (error.response.data && error.response.data.message) ||
              error.response.data ||
              '이미지 업로드에 실패했습니다.',
          )
        } else {
          console.error('S3 업로드 네트워크/기타 에러:', error.message)
          alert(error.message || '이미지 업로드에 실패했습니다.')
        }
        throw error
      }
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
          'tiptap prose prose-lg min-h-[300px] border border-dark-gray rounded-md p-4 focus:outline-none bg-white',
      },
      handlePaste: async (view, event) => {
        const items = event.clipboardData?.items
        if (!items) return false
        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile()
            if (file) {
              try {
                const url = await uploadImage(file)
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const url = await uploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch (error) {}
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

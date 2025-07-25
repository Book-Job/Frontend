import { forwardRef, useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import { authApi } from '../../../services/api/axios'
import EditorToolbar from './EditorToolbar'
import ImageBubbleMenu from './ImageBubbleMenu'
import useEditorInstance from '../../../hooks/writePost/useEditorInstance'
import { EditorContent } from '@tiptap/react'
import ToastService from '../../../services/toast/ToastService'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const WriteEditor = forwardRef(({ value, initialContent, onChange, onAddFileId }, ref) => {
  const editorRef = useRef(null)
  const uploadImage = useCallback(
    async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        ToastService.error('이미지 크기는 5MB를 초과할 수 없습니다.')
        throw new Error('파일 크기 초과')
      }

      const res = await authApi.post('/images', {
        fileName: file.name,
        fileSize: file.size,
        boardType: 'BOARD',
      })

      const { presignedUrl, fileId } = res.data.data

      try {
        const contentType = 'image/jpeg'
        await axios.put(presignedUrl, file, {
          headers: { 'Content-Type': contentType },
          withCredentials: false,
        })
      } catch (error) {
        ToastService.error('이미지 업로드 실패. 다시 시도해주세요.')
        throw error
      }

      const imageUrl = presignedUrl.split('?')[0]
      onAddFileId?.(fileId)
      return imageUrl
    },
    [onAddFileId],
  )

  const editor = useEditorInstance({
    initialContent: value ?? initialContent,
    onChange,
    onPasteImage: uploadImage,
  })

  useEffect(() => {
    if (editor) {
      editorRef.current = editor
      if (ref) {
        if (typeof ref === 'function') {
          ref(editor)
        } else {
          ref.current = editor
        }
      }
      if (value !== undefined && value !== editor.getHTML()) {
        editor.commands.setContent(value || '', false)
      }
    }
  }, [value, editor, ref])

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const url = await uploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch (error) {
      ToastService.error('이미지 업로드 실패. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className='text-[16px]' />
      <ImageBubbleMenu editor={editor} />
      <input id='file-input' type='file' accept='image/*' onChange={handleFileChange} hidden />
    </div>
  )
})
WriteEditor.displayName = 'WriteEditor'
export default WriteEditor

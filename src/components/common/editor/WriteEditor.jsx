import { useCallback, useEffect } from 'react'
import axios from 'axios'
import { authApi } from '../../../services/api/axios'
import EditorToolbar from './EditorToolbar'
import ImageBubbleMenu from './ImageBubbleMenu'
import useEditorInstance from '../../../hooks/writePost/useEditorInstance'
import { EditorContent } from '@tiptap/react'
import ToastService from '../../../utils/toastService'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const WriteEditor = ({ value, initialContent, onChange, onAddFileId }) => {
  const uploadImage = useCallback(
    async (file) => {
      if (file.size > MAX_FILE_SIZE) {
        ToastService('이미지 크기는 5MB를 초과할 수 없습니다.')
        throw new Error('파일 크기 초과')
      }

      const res = await authApi.post('/images', {
        fileName: file.name,
        fileSize: file.size,
        boardType: 'BOARD',
      })
      const { presignedUrl, fileId } = res.data.data
      await axios.put(presignedUrl, file)
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
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false)
    }
  }, [value, editor])

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
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
      <ImageBubbleMenu editor={editor} />
      <input id='file-input' type='file' accept='image/*' onChange={handleFileChange} hidden />
    </div>
  )
}

export default WriteEditor

import { useState, useEffect } from 'react'
import { editPost } from '../../service/postService'
import ToastService from '../../../../utils/toastService'
import { EditorState, ContentState, convertToRaw } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'

const htmlToEditorState = (html) => {
  const blocksFromHtml = htmlToDraft(html || '')
  const { contentBlocks, entityMap } = blocksFromHtml
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
  return EditorState.createWithContent(contentState)
}

const useEditPost = (id, fetchDetail) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        const detail = await fetchDetail()
        setEditorState(htmlToEditorState(detail.text || ''))
      } catch (err) {
        setError('게시글을 불러오는 데 오류가 발생했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id && fetchDetail) fetchPostData()
  }, [id, fetchDetail])

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      await editPost(id, { text: html })
      ToastService.success('게시글이 수정되었습니다.')
    } catch (err) {
      setError('수정 중 오류가 발생했습니다.')
      ToastService.error('수정 중 오류가 발생했습니다.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    editorState,
    setEditorState,
    loading,
    error,
    handleSubmit,
  }
}

export default useEditPost

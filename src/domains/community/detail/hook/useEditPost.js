import { useState, useEffect } from 'react'
import { editPost } from '../../service/postService'
import ToastService from '../../../../services/toast/ToastService'

const useEditPost = (id, initialData = {}) => {
  const [title, setTitle] = useState(initialData.title || '')
  const [content, setContent] = useState(initialData.text || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setTitle(initialData.title || '')
    setContent(initialData.text || '')
  }, [initialData])

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await editPost(id, { title, text: content })
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
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    handleSubmit,
  }
}

export default useEditPost

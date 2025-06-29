import { useState, useEffect } from 'react'
import { editPost } from '../../service/postService'
import ToastService from '../../../../services/toast/ToastService'

const useEditPost = (id, fetchDetail) => {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        const detail = await fetchDetail()
        setContent(detail.text || '')
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
    if (e?.preventDefault) e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await editPost(id, { text: content })
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
    content,
    setContent,
    loading,
    error,
    handleSubmit,
  }
}

export default useEditPost

import { useState, useEffect } from 'react'
import { editPost } from '../../service/postService'
import ToastService from '../../../../utils/toastService'

const useEditPost = (id) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (!response.ok) throw new Error('데이터를 불러오지 못했습니다.')
        const data = await response.json()
        setPostData({
          title: data.title || '',
          content: data.content || '',
        })
      } catch (error) {
        setError('게시글을 불러오는 데 오류가 발생했습니다.')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchPostData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await editPost(id, postData)
      ToastService.success('게시글이 수정되었습니다.')
    } catch (error) {
      setError('수정 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return {
    postData,
    loading,
    error,
    handleSubmit,
    handleInputChange,
    setPostData, // 필요하다면 외부에서 수동으로 값 세팅 가능
  }
}

export default useEditPost

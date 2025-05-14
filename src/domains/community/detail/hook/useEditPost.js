import { useState, useEffect } from 'react'
import { editPost } from '../../service/postService'

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
      } catch (err) {
        setError('게시글을 불러오는 데 오류가 발생했습니다.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPostData()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await editPost(id, postData)
      alert('게시글이 수정되었습니다.')
    } catch (err) {
      setError('수정 중 오류가 발생했습니다.')
      console.error(err)
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
  }
}

export default useEditPost

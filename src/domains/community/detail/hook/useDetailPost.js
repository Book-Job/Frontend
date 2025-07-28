import { useState, useCallback, useEffect } from 'react'
import { getDetailPost } from '../../service/postService'

const useDetailPost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPost = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getDetailPost(id)
      setPost(data)
      setError(null)
    } catch (err) {
      setError(err)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      fetchPost()
    }
  }, [id, fetchPost])

  return { post, loading, error, setPost }
}

export default useDetailPost

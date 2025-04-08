import { useEffect, useState } from 'react'
import { getDetailPost } from '../../service/postService'

const useDetailPost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getDetailPost(id)
        setPost(data)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  return { post, loading, error }
}

export default useDetailPost

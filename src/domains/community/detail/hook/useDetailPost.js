import { useEffect, useState, useCallback, useRef } from 'react'
import { getDetailPost } from '../../service/postService'

const useDetailPost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const hasFetched = useRef(false)

  const refetch = useCallback(async () => {
    if (hasFetched.current) {
      return
    }
    hasFetched.current = true
    setLoading(true)

    try {
      const data = await getDetailPost(id)
      setPost(data)
      setError(null)
      return data
    } catch (err) {
      setError(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id, refetch])

  return { post, loading, error, refetch }
}

export default useDetailPost

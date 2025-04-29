import { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/postService.js'
const useCommunityPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts()
      .then(({ boards }) => {
        setPosts(boards)
        setLoading(false)
      })
      .catch((error) => {
        console.error('전체 글 불러오기 실패:', error)
        setLoading(false)
      })
  }, [])

  return { posts, loading }
}

export default useCommunityPosts

<<<<<<< HEAD
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
=======
import { useRef, useCallback, useState, useEffect } from 'react'
import { getAllPosts } from '../../service/postService'

const useCommunityPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState(null) 
  const loadingRef = useRef(false)

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true
    setLoading(true)

    try {
      const { boards, lastBoardId } = await getAllPosts({ last: lastId, size: 6 }) 

      if (boards.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prev) => {
          const ids = new Set(prev.map((p) => p.boardId))
          const newBoards = boards.filter((b) => !ids.has(b.boardId))
          return [...prev, ...newBoards]
        })

        setLastId(lastBoardId) 
      }
    } catch (error) {
      console.error('게시글 불러오기 실패:', error)
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [hasMore, lastId])

  useEffect(() => {
    loadMore()
  }, [])

  return {
    posts,
    loading,
    hasMore,
    loadMore,
  }
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
}

export default useCommunityPosts

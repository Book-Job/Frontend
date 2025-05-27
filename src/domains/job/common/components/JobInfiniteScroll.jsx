import { useState, useEffect, useCallback } from 'react'
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
import JobPostList from '../../main/components/JobPostList'
import Spinner from '../../../../components/web/Spinner'
import { useNavigate } from 'react-router-dom'
const JobInfiniteScroll = ({ fetcher, dataKey, postType, order }) => {
  const [posts, setPosts] = useState([])
  const [lastId, setLastId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setPosts([])
    setLastId(null)
    setHasMore(true)
    setLoading(false)
  }, [order, postType])

  useEffect(() => {
    if (lastId === null && hasMore && !loading) {
      loadPosts()
    }
  }, [fetcher, lastId, order, dataKey, hasMore, loading])

  const loadPosts = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const response = await fetcher(lastId, order)
      let newPosts = response?.[dataKey] || []
      const newLastId = response?.lastId

      setPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post.id))
        const filtered = newPosts.filter((post) => !existingIds.has(post.id))
        return [...prev, ...filtered]
      })
      setLastId(newLastId)
      setHasMore(newPosts.length > 0)
    } catch (err) {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [fetcher, lastId, order, dataKey, hasMore, loading])
  return (
    <InfiniteScrollList onIntersect={loadPosts} disabled={!hasMore || loading}>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        <JobPostList posts={posts} navigate={navigate} />
      </div>
      {loading && (
        <div className='flex justify-center items-center h-[100px]'>
          <Spinner size={32} color='main-pink' />
        </div>
      )}
      {!hasMore && !loading && posts.length > 0 && (
        <div className='text-center text-gray-500 my-6'>더 이상 게시물이 없습니다.</div>
      )}
    </InfiniteScrollList>
  )
}

export default JobInfiniteScroll

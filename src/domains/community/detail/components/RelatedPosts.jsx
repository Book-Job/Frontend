<<<<<<< HEAD
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/postService'
=======
import { useEffect, useState, useCallback } from 'react'
import { getAllPosts } from '../../service/postService'
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
import FreeBoard from '../../../../components/web/FreeBoard'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
import Spinner from '../../../../components/web/Spinner'
import useIsMobile from '../../../../hooks/header/useIsMobile'
<<<<<<< HEAD
const RelatedPosts = ({ currentId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const allPostsData = await getAllPosts()
        const boards = allPostsData.boards || []
        const filtered = boards.filter((p) => String(p.boardId) !== String(currentId))
        setPosts(filtered)
      } catch (error) {
        setError(error)
        console.error('관련 글 불러오기 에러:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [currentId])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  if (error) return <p className='text-red-500'>관련 글을 불러올 수 없습니다.</p>
  if (posts.length === 0) return <p className='text-gray-400'>관련 글이 없습니다.</p>

  return (
    <div
      className={
        isMobile ? 'flex flex-col gap-3' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
      }
    >
      {posts.map((post) => (
        <div key={post.boardId} className='w-full max-w-xs mx-auto'>
          {isMobile ? (
            <MobileFreeBoard
              boardId={post.boardId}
              title={post.title}
              content={post.text.replace(/<[^>]*>/g, '')}
              name={post.nickname}
              date={new Date(post.createdAt).toLocaleDateString()}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
              onClick={() => {
                console.log(`${post.nickname}의 게시글 보기`)
              }}
            />
          ) : (
            <FreeBoard
              boardId={post.boardId}
              title={post.title}
              content={post.text.replace(/<[^>]*>/g, '')}
              name={post.nickname}
              date={new Date(post.createdAt).toLocaleDateString()}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
              onNameClick={(name) => {
                console.log(`${name}의 게시글 보기`)
              }}
            />
          )}
        </div>
      ))}
    </div>
=======

const RelatedPosts = ({ currentId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const isMobile = useIsMobile()

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const lastId = posts.length > 0 ? posts[posts.length - 1].boardId : null
      const { boards } = await getAllPosts({ last: lastId, size: 6 })
      const filtered = boards.filter((p) => String(p.boardId) !== String(currentId))

      if (filtered.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prev) => {
          const ids = new Set(prev.map((p) => p.boardId))
          const newPosts = filtered.filter((p) => !ids.has(p.boardId))
          return [...prev, ...newPosts]
        })
      }
    } catch (error) {
      console.error('관련 글 불러오기 에러:', error)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, posts, currentId])

  useEffect(() => {
    setPosts([])
    setHasMore(true)
  }, [currentId])

  useEffect(() => {
    if (posts.length === 0 && hasMore) {
      loadMore()
    }
  }, [posts.length, hasMore, loadMore])

  return (
    <InfiniteScrollList onIntersect={loadMore} disabled={!hasMore || loading}>
      {posts.length === 0 && loading ? (
        <div className='flex justify-center items-center h-[300px]'>
          <Spinner size={48} color='main-pink' />
        </div>
      ) : posts.length === 0 ? (
        <p className='text-gray-400'>관련 글이 없습니다.</p>
      ) : (
        <div
          className={
            isMobile
              ? 'flex flex-col gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
          }
        >
          {posts.map((post) => (
            <div key={post.boardId} className='w-full max-w-xs mx-auto'>
              {isMobile ? (
                <MobileFreeBoard
                  boardId={post.boardId}
                  title={post.title}
                  content={post.text.replace(/<[^>]*>/g, '')}
                  name={post.nickname}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  commentCount={post.commentCount}
                  viewCount={post.viewCount}
                />
              ) : (
                <FreeBoard
                  boardId={post.boardId}
                  title={post.title}
                  content={post.text.replace(/<[^>]*>/g, '')}
                  name={post.nickname}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  commentCount={post.commentCount}
                  viewCount={post.viewCount}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </InfiniteScrollList>
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  )
}

export default RelatedPosts

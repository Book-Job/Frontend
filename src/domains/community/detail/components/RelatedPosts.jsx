import { useEffect, useState } from 'react'
import { getAllPosts } from '../../service/postService'
import FreeBoard from '../../../../components/web/FreeBoard'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
import Spinner from '../../../../components/web/Spinner'
import useIsMobile from '../../../../hooks/header/useIsMobile'
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
  )
}

export default RelatedPosts

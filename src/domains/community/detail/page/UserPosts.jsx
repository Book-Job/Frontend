import { useState, useEffect } from 'react'
import foldArrow from '../../../../assets/icons/common/common_fold_arrow.svg'
import spreadArrow from '../../../../assets/icons/common/common_spread_arrow.svg'
import { useParams } from 'react-router-dom'
import { getAllPosts } from '../../service/postService'
import BoardCategory from '../../../../components/web/BoardCategory'
import Spinner from '../../../../components/web/Spinner'

const UserPosts = () => {
  const { nickname } = useParams()

  const [userPosts, setUserPosts] = useState([])
  const [lastId, setLastId] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isFolded, setIsFolded] = useState(true)

  const toggleArrow = () => {
    setIsFolded((prev) => !prev)
  }

  const fetchUserPosts = async (last = null) => {
    if (!nickname || loading || !hasMore) return

    setLoading(true)
    try {
      const data = await getAllPosts({
        keyword: nickname,
        searchType: 'NICKNAME',
        size: 6,
        last,
      })

      if (data.boards && data.boards.length > 0) {
        setUserPosts((prev) => {
          const existingIds = new Set(prev.map((post) => post.boardId))
          const filteredNewBoards = data.boards.filter((post) => !existingIds.has(post.boardId))
          return [...prev, ...filteredNewBoards]
        })
        setLastId(data.lastId || null)
        setHasMore(Boolean(data.lastId))
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('유저 게시글 조회 실패', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setUserPosts([])
    setLastId(null)
    setHasMore(true)
    fetchUserPosts()
  }, [nickname])

  const sortedPosts = [...userPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return isFolded ? dateB - dateA : dateA - dateB
  })

  return (
    <div className='flex flex-col'>
      <span className='sm:text-[30px] text-[24px] block mb-[60px] mt-[20px]'>
        {nickname ?? '닉네임 없음'}님이 작성한 글
      </span>

      <div className='flex flex-col max-w-[940px] w-full mx-auto'>
        <div className='w-full h-[1px] bg-black' />
        <table className='w-full border-collapse'>
          <thead>
            <tr className='pb-3 text-sm border-b border-dark-gray '>
              <th className='py-3'>No</th>
              <th className='py-3'>제목</th>
              <th className='py-3 '>
                <button
                  onClick={toggleArrow}
                  className='flex items-center gap-1 focus:outline-none'
                >
                  등록 날짜
                  <img
                    src={isFolded ? foldArrow : spreadArrow}
                    alt='정렬 화살표'
                    className='w-[12px] h-[12px]'
                  />
                </button>
              </th>
              <th className='py-3'>글쓴이</th>
              <th className='py-3'>카테고리</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post, index) => (
              <tr
                key={post.boardId}
                className={index !== sortedPosts.length - 1 ? 'border-b border-light-gray' : ''}
              >
                <td className='py-3 text-[12px] sm:text-[14px] lg:text-[14px]'>{index + 1}</td>
                {/* <td className='py-3 text-[12px] sm:text-[14px] lg:text-[14px]'>{post.title}</td> */}
                <td className='py-3 text-[12px] sm:text-[14px] lg:text-[14px]'>
                  {post.title.length > 20 ? `${post.title.slice(0, 20)}...` : post.title}
                </td>
                <td className='py-3 text-[12px] sm:text-[14px] lg:text-[14px]'>
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className='py-3 text-[12px] sm:text-[14px] lg:text-[14px]'>{post.nickname}</td>
                <td className='py-2'>
                  <BoardCategory label='자유게시판' />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='5' className='border-b border-dark-gray'></td>
            </tr>
          </tfoot>
        </table>

        {loading && (
          <div className='flex justify-center mt-40'>
            <Spinner size={48} color='main-pink' />
          </div>
        )}
        {!hasMore && (
          <div className='my-6 text-center text-gray-500'>더 이상 불러올 게시글이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default UserPosts

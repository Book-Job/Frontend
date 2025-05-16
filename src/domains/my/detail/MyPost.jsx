import MyPostHead from './components/MyPostHead'
import PostList from './components/PostList'
import useBoardStore from '../../../store/mypage/useBoardStore'
import useMyBoardStore from '../../../store/mypage/useMyBoardStore'
import { useEffect } from 'react'

const MyPost = () => {
  const { choiceBoard } = useBoardStore()
  // const jobData = [
  //   { recruitmentId: 1, title: '아이돌나라 편집자 구해요', createdAt: '2025.04.10', recruitmentCategory: '구인' },
  //   { id: 2, title: '아이돌나라 편집자 구해요', date: '2025.04.03', category: '구직' },
  // ]
  // const freeData = [
  //   { boardId: 1, title: '아이돌나라 편집자 구해요', createdAt: '2025.04.10', commentCount: 23, viewCount: 342 },
  //   { id: 2, title: '아이돌나라 편집자 구해요', date: '2025.04.03', comment: 23, view: 342 },
  // ]

  const {
    freeBoard,
    jobBoard,
    isFreeLoading,
    isJobLoading,
    freeError,
    jobError,
    fetchFreeBoard,
    fetchJobBoard,
  } = useMyBoardStore()

  useEffect(() => {
    fetchFreeBoard()
    fetchJobBoard()
  }, [fetchFreeBoard, fetchJobBoard])

  // const currentList = choiceBoard === '자유게시판' ? freeBoard : jobBoard
  const isLoading = choiceBoard === '자유게시판' ? isFreeLoading : isJobLoading
  const error = choiceBoard === '자유게시판' ? freeError : jobError
  return (
    <div className='w-full'>
      <div className='sm:max-w-[940px] mx-auto'>
        <MyPostHead choiceBoard={choiceBoard} />

        {
          isLoading ? (
            <div className='text-center'>로딩 중...</div>
          ) : error ? (
            <div className='flex flex-col text-center text-red-500'>
              {error}
              <button
                onClick={() => (choiceBoard === '자유게시판' ? fetchFreeBoard() : fetchJobBoard())}
                className='ml-2 text-blue-500'
              >
                재시도
              </button>
            </div>
          ) : (
            <PostList
              boardData={
                Array.isArray(choiceBoard === '구인구직' ? jobBoard : freeBoard)
                  ? choiceBoard === '구인구직'
                    ? jobBoard
                    : freeBoard
                  : []
              }
            />
          )
          // choiceBoard === '구인구직' ? (
          //   <PostList boardData={jobBoard} />
          // ) : (
          //   <PostList boardData={freeBoard} />
          // )
        }
      </div>
    </div>
  )
}

export default MyPost

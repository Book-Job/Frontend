import MyPostHead from './components/MyPostHead'
import PostList from './components/PostList'
import useBoardStore from '../../../store/mypage/useBoardStore'
import useMyBoardStore from '../../../store/mypage/useMyBoardStore'
import { useEffect } from 'react'
import Spinner from '../../../components/web/Spinner'

const MyPost = () => {
  const { choiceBoard } = useBoardStore()

  const { isFreeLoading, isJobLoading, freeError, jobError, fetchFreeBoard, fetchJobBoard } =
    useMyBoardStore()

  useEffect(() => {
    const token = localStorage.getItem('Authorization')
    if (token) {
      fetchFreeBoard(token, true)
      fetchJobBoard(token, true)
    }
  }, [fetchFreeBoard, fetchJobBoard])

  const isLoading = choiceBoard === '자유게시판' ? isFreeLoading : isJobLoading
  const error = choiceBoard === '자유게시판' ? freeError : jobError
  return (
    <div className='w-full'>
      <div className='sm:max-w-[940px] mx-auto'>
        <MyPostHead choiceBoard={choiceBoard} />

        {isLoading ? (
          <div className='text-center'>
            <Spinner size={48} color='main-pink' />
          </div>
        ) : error ? (
          <div className='flex flex-col text-center text-red-500'>
            {error}
            <button
              onClick={() =>
                choiceBoard === '자유게시판'
                  ? fetchFreeBoard(localStorage.getItem('Authorization'), true)
                  : fetchJobBoard(localStorage.getItem('Authorization'), true)
              }
              className='ml-2 text-blue-500'
            >
              재시도
            </button>
          </div>
        ) : (
          <PostList />
        )}
      </div>
    </div>
  )
}

export default MyPost

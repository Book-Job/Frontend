import { useInfiniteQuery } from '@tanstack/react-query'
import MyPostHead from './components/MyPostHead'
import PostList from './components/PostList'
import useBoardStore from '../../../store/mypage/useBoardStore'
import useMyBoardStore from '../../../store/mypage/useMyBoardStore'
import Spinner from '../../../components/web/Spinner'
import InfiniteScrollList from '../../../components/common/InfiniteScrollList'
import { useEffect } from 'react'

const MyPost = () => {
  const { choiceBoard } = useBoardStore()
  const { fetchFreeBoard, fetchJobBoard, resetBoard, freeError, jobError } = useMyBoardStore()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['myPosts', choiceBoard],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await (choiceBoard === '자유게시판'
        ? fetchFreeBoard(pageParam, 10)
        : fetchJobBoard(pageParam, 10))
      return response
    },
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.currentPage + 1 : undefined
    },
  })

  const posts =
    data?.pages.flatMap((page) =>
      choiceBoard === '자유게시판'
        ? page.data.myPostingsInBoardList || []
        : page.data.postings || [],
    ) || []

  useEffect(() => {
    resetBoard(choiceBoard === '자유게시판' ? 'free' : 'job')
  }, [choiceBoard, resetBoard])

  return (
    <div className='w-full'>
      <div className='sm:max-w-[940px] mx-auto'>
        <MyPostHead choiceBoard={choiceBoard} />
        {isLoading && posts.length === 0 ? (
          <div className='flex justify-center items-center h-[100px]'>
            <Spinner size={48} color='main-pink' />
          </div>
        ) : posts.length === 0 ? (
          <p className='mt-12 text-dark-gray'>첫 글을 작성해보세요! </p>
        ) : (choiceBoard === '자유게시판' ? freeError : jobError) ? (
          <div className='flex flex-col text-center text-red-500'>
            {choiceBoard === '자유게시판' ? freeError : jobError}
            <button
              onClick={() =>
                choiceBoard === '자유게시판' ? fetchFreeBoard(0, 10) : fetchJobBoard(0, 10)
              }
              className='ml-2 text-blue-500'
            >
              재시도
            </button>
          </div>
        ) : (
          <InfiniteScrollList
            onIntersect={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            <PostList boardData={posts} />
            {isFetchingNextPage && (
              <div className='flex justify-center items-center h-[100px]'>
                <Spinner size={38} color='main-pink' />
              </div>
            )}
            {!hasNextPage && posts.length > 0 && (
              <div className='flex items-center justify-center py-8 text-sm text-dark-gray'>
                더 이상 불러올 작성글이 없습니다.
              </div>
            )}
          </InfiniteScrollList>
        )}
      </div>
    </div>
  )
}

export default MyPost

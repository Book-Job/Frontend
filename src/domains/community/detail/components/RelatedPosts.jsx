import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
import FreeBoard from '../../../../components/web/FreeBoard'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
import Spinner from '../../../../components/web/Spinner'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import { getAllPosts } from '../../service/postService'
const RelatedPosts = ({ currentId }) => {
  const isMobile = useIsMobile()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['relatedPosts', currentId],
    queryFn: async ({ pageParam = null }) => {
      const { boards } = await getAllPosts({ last: pageParam, size: 6 })
      return boards.filter((p) => String(p.boardId) !== String(currentId))
    },
    getNextPageParam: (lastPage) => {
      const lastItem = lastPage[lastPage.length - 1]
      return lastItem?.boardId ?? undefined
    },
    enabled: !!currentId,
  })

  const posts = data?.pages.flat() || []

  return (
    <InfiniteScrollList
      onIntersect={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
    >
      {isLoading && posts.length === 0 ? (
        <div className='flex justify-center items-center h-[300px]'>
          <Spinner size={48} color='main-pink' />
        </div>
      ) : posts.length === 0 ? (
        <p className='text-dark-gray'>관련 글이 없습니다.</p>
      ) : (
        <div
          className={
            isMobile
              ? 'flex flex-col gap-3'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
          }
        >
          {posts.map((post) => {
            const strippedText = post.text.replace(/<[^>]*>/g, '').trim()
            const content = strippedText.length === 0 ? '이미지 게시글입니다' : strippedText
            const isImagePost = strippedText.length === 0

            return (
              <div key={post.boardId} className='w-full max-w-xs mx-auto'>
                {isMobile ? (
                  <MobileFreeBoard
                    boardId={post.boardId}
                    title={post.title}
                    content={content}
                    isImagePost={isImagePost}
                    name={post.nickname}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    commentCount={post.commentCount}
                    viewCount={post.viewCount}
                  />
                ) : (
                  <FreeBoard
                    boardId={post.boardId}
                    title={post.title}
                    content={content}
                    isImagePost={isImagePost}
                    name={post.nickname}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    commentCount={post.commentCount}
                    viewCount={post.viewCount}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </InfiniteScrollList>
  )
}

export default RelatedPosts

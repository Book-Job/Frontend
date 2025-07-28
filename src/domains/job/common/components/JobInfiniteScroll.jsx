import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
import JobPostList from '../../main/components/JobPostList'
import Spinner from '../../../../components/web/Spinner'
import { useNavigate } from 'react-router-dom'

const JobInfiniteScroll = ({
  fetcher,
  dataKey,
  postType,
  order,
  renderList,
  loadingComponent,
  refreshToken,
}) => {
  const navigate = useNavigate()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['jobPosts', postType, order, refreshToken],
    queryFn: ({ pageParam = null }) => fetcher(pageParam, order),
    getNextPageParam: (lastPage) => {
      const newPosts = lastPage?.[dataKey] ?? []
      return newPosts.length > 0 ? lastPage.lastId : undefined
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })

  const posts = data?.pages.flatMap((page) => page?.[dataKey] || []) || []

  return (
    <InfiniteScrollList onIntersect={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}>
      {renderList ? (
        renderList(posts)
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl'>
          <JobPostList posts={posts} navigate={navigate} />
        </div>
      )}
      {isFetchingNextPage &&
        (loadingComponent ?? (
          <div className='flex justify-center items-center h-[100px]'>
            <Spinner size={32} color='main-pink' />
          </div>
        ))}

      {!hasNextPage && posts.length > 0 && (
        <div className='flex justify-center items-center py-8 text-dark-gray text-base'>
          더 이상 불러올 게시물이 없습니다.
        </div>
      )}
    </InfiniteScrollList>
  )
}

export default JobInfiniteScroll

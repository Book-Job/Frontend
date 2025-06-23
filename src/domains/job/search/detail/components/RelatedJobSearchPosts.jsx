import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getJobPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'
import InfiniteScrollList from '../../../../../components/common/InfiniteScrollList'

const RelatedJobSearchPosts = ({ currentId }) => {
  const navigate = useNavigate()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['relatedJobSearchPosts', currentId],
    queryFn: async ({ pageParam = null }) => {
      const data = await getJobPosts(pageParam, 'latest')
      const filtered = (data?.jobSeekings || []).filter((p) => String(p.id) !== String(currentId))
      return {
        ...data,
        jobSeekings: filtered,
      }
    },
    getNextPageParam: (lastPage) => {
      const posts = lastPage?.jobSeekings || []
      return posts.length > 0 ? lastPage.lastId : undefined
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })

  const posts = data?.pages.flatMap((page) => page?.jobSeekings || []) || []

  return (
    <InfiniteScrollList onIntersect={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage}>
      {isLoading ? (
        <div className='flex justify-center items-center h-[300px]'>
          <Spinner size={48} color='main-pink' />
        </div>
      ) : posts.length === 0 ? (
        <p className='text-dark-gray'>관련 구직 글이 없습니다.</p>
      ) : (
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          <JobPostList posts={posts} navigate={navigate} />
        </div>
      )}

      {isFetchingNextPage && (
        <div className='flex justify-center items-center h-[100px]'>
          <Spinner size={32} color='main-pink' />
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className='flex justify-center items-center py-8 text-dark-gray text-sm'>
          더 이상 불러올 게시물이 없습니다.
        </div>
      )}
    </InfiniteScrollList>
  )
}

export default RelatedJobSearchPosts

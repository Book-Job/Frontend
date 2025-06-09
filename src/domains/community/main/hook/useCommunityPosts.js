import { useInfiniteQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../service/postService'

const useCommunityPosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['communityPosts'],
    queryFn: ({ pageParam = null }) => getAllPosts({ last: pageParam, size: 6 }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.boards.length === 0) return undefined
      return lastPage.lastBoardId
    },
  })

  const posts = data?.pages.flatMap((page) => page.boards) || []

  return {
    posts,
    loading: isLoading || isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
  }
}

export default useCommunityPosts

import { useState } from 'react'
import BannerExample from '../../../../components/common/BannerExample'
import SearchBar from '../../../../components/web/SearchBar'
<<<<<<< HEAD
import JobPostSortDropDown from '../../../job/main/components/JobPostSortDropDown'
import FreeBoard from '../../../../components/web/FreeBoard'
import useCommunityPosts from '../hook/useCommunityPosts'
=======
import PostSortDropDown from '../../../../components/common/PostSortDropDown'
import FreeBoard from '../../../../components/web/FreeBoard'
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
import Spinner from '../../../../components/web/Spinner'
import useSearchPosts from '../../service/useSearchPosts'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
<<<<<<< HEAD

const CommunityMainPage = () => {
  const { posts, loading } = useCommunityPosts()
=======
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
import useCommunityPosts from '../hook/useCommunityPosts'

const CommunityMainPage = () => {
  const { posts, loading, hasMore, loadMore } = useCommunityPosts()
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  const [sortOrder, setSortOrder] = useState('latest')
  const isMobile = useIsMobile()
  const { searchResults, searchLoading, hasSearched, handleSearch } = useSearchPosts()

  const rawPosts = searchResults.length > 0 ? searchResults : posts
  const displayedPosts = [...rawPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
  })

<<<<<<< HEAD
  if (loading || searchLoading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

=======
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  return (
    <>
      <BannerExample />
      <section className='flex justify-center mt-7'>
        <SearchBar onSearch={handleSearch} placeholder='검색어를 입력하세요' />
      </section>
      <div className='flex flex-col mx-4 md:mx-10 lg:mx-[100px] xl:mx-[250px]'>
        <div className='w-full flex justify-end mt-5 text-[14px] mb-3'>
<<<<<<< HEAD
          <JobPostSortDropDown onSortChange={setSortOrder} />
        </div>
        <div className='mt-[15px] overflow-x-auto'>
          {searchLoading ? (
            <div className='flex justify-center items-center h-[200px]'>
              <Spinner size={40} color='main-pink' />
=======
          <PostSortDropDown onSortChange={setSortOrder} />
        </div>
        <div className='mt-[15px] overflow-x-auto'>
          {!posts.length && (loading || searchLoading) ? (
            <div className='flex justify-center items-center h-[300px]'>
              <Spinner size={48} color='main-pink' />
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
            </div>
          ) : hasSearched && displayedPosts.length === 0 ? (
            <div className='text-center text-gray-500 text-lg my-10'>
              검색어와 일치하는 결과가 없습니다.
            </div>
          ) : (
<<<<<<< HEAD
            <div
              className={
                isMobile
                  ? 'flex flex-col gap-2'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'
              }
            >
              {displayedPosts.map((post) => {
                return (
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
                )
              })}
            </div>
=======
            <>
              <InfiniteScrollList
                onIntersect={() => {
                  if (!hasSearched) {
                    loadMore()
                  }
                }}
                disabled={!hasMore || loading || hasSearched}
              >
                <div
                  className={
                    isMobile
                      ? 'flex flex-col gap-2'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'
                  }
                >
                  {displayedPosts.map((post) => (
                    <div
                      key={`${post.boardId}-${post.createdAt}`}
                      className='w-full max-w-xs mx-auto'
                    >
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
              </InfiniteScrollList>

              {!hasMore && !loading && !hasSearched && (
                <div className='text-center text-gray-500 my-6'>
                  더 이상 불러올 게시글이 없습니다.
                </div>
              )}
            </>
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

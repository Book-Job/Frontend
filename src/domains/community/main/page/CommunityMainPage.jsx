import { useState } from 'react'
import BannerExample from '../../../../components/common/BannerExample'
import SearchBar from '../../../../components/web/SearchBar'
import PostSortDropDown from '../../../../components/common/PostSortDropDown'
import FreeBoard from '../../../../components/web/FreeBoard'
import Spinner from '../../../../components/web/Spinner'
import useSearchPosts from '../../service/useSearchPosts'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
import InfiniteScrollList from '../../../../components/common/InfiniteScrollList'
import useCommunityPosts from '../hook/useCommunityPosts'
import SeoHelmet from '../../../../components/common/SeoHelmet'
import { BsCardImage } from 'react-icons/bs'

const CommunityMainPage = () => {
  const { posts, loading, hasMore, loadMore } = useCommunityPosts()
  const [sortOrder, setSortOrder] = useState('latest')
  const isMobile = useIsMobile()
  const { searchResults, searchLoading, hasSearched, handleSearch } = useSearchPosts()

  const rawPosts = hasSearched ? searchResults : posts
  const displayedPosts = [...rawPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
  })

  return (
    <>
      <BannerExample />
      <SeoHelmet
        title='북잡 | 출판업계 커뮤니티'
        description='출판업계 관련 정보와 소통을 위한 자유게시판입니다. 업계 종사자들의 다양한 이야기를 확인해보세요.'
        image='https://book-job.co.kr/metatag.png'
        url='https://book-job.co.kr/community'
      />
      <section className='w-full flex justify-center mt-7 px-5 md:px-10 lg:px-[100px]'>
        <div className='w-full max-w-[940px]'>
          <SearchBar onSearch={handleSearch} placeholder='검색어를 입력하세요' className='w-full' />
        </div>
      </section>

      <div className='flex flex-col mx-4 md:mx-10 lg:mx-[100px] xl:mx-[250px]'>
        <div className='w-full flex justify-end mt-5 text-[14px] mb-3 px-4 sm:px-6 lg:px-0'>
          <PostSortDropDown onSortChange={setSortOrder} />
        </div>

        <div className='mt-[15px] overflow-x-auto'>
          {!posts.length && (loading || searchLoading) ? (
            <div className='flex justify-center items-center h-[300px]'>
              <Spinner size={48} color='main-pink' />
            </div>
          ) : hasSearched && displayedPosts.length === 0 ? (
            <div className='my-10 text-lg text-center text-gray-500'>
              검색어와 일치하는 결과가 없습니다.
            </div>
          ) : (
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
                  {displayedPosts.map((post) => {
                    const strippedText = post.text.replace(/<[^>]*>/g, '').trim()
                    const content =
                      strippedText.length === 0 ? (
                        <span className='text-gray-500 flex items-center gap-1'>
                          <BsCardImage className='text-lg' />
                          이미지 게시글입니다
                        </span>
                      ) : (
                        strippedText
                      )

                    return (
                      <div
                        key={`${post.boardId}-${post.createdAt}`}
                        className='w-full max-w-xs mx-auto'
                      >
                        {isMobile ? (
                          <MobileFreeBoard
                            boardId={post.boardId}
                            title={post.title}
                            content={content}
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
              </InfiniteScrollList>

              {!hasMore && !loading && !hasSearched && (
                <div className='my-6 text-center text-gray-500'>
                  더 이상 불러올 게시글이 없습니다.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

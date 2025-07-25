import { useState } from 'react'
import Banner from '../../../../components/common/Banner'
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
      <Banner />
      <SeoHelmet
        title='북잡 | 출판업계 커뮤니티'
        description='출판업계 관련 정보와 소통을 위한 자유게시판입니다. 업계 종사자들의 다양한 이야기를 확인해보세요.'
        image='https://www.bookjob.co.kr/metatag.png'
        url='https://www.bookjob.co.kr/community'
      />
      <div className='w-full px-4'>
        <section className='flex justify-center w-full mt-7'>
          <div className='w-full max-w-[940px] justify-center flex'>
            <SearchBar
              onSearch={handleSearch}
              placeholder='검색어를 입력하세요'
              className='w-full'
            />
          </div>
        </section>

        <div className='flex flex-col w-full max-w-[940px] mx-auto'>
          <div className='flex items-center justify-center w-full mt-6 mb-3'>
            <div className='flex justify-end w-full sm:max-w-[940px] max-w-xs '>
              <PostSortDropDown onSortChange={setSortOrder} />
            </div>
          </div>

          <div className='overflow-x-auto'>
            {!posts.length && (loading || searchLoading) ? (
              <div className='flex justify-center items-center h-[300px]'>
                <Spinner size={48} color='main-pink' />
              </div>
            ) : hasSearched && displayedPosts.length === 0 ? (
              <div className='my-10 text-lg text-center text-dark-gray'>
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
                        : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    }
                  >
                    {displayedPosts.map((post) => {
                      const strippedText = post.text.replace(/<[^>]*>/g, '').trim()
                      const content =
                        strippedText.length === 0 ? (
                          <span className='flex items-center gap-1 text-dark-gray'>
                            <BsCardImage className='text-lg' />
                            이미지 게시글입니다
                          </span>
                        ) : (
                          strippedText
                        )

                      return (
                        <div
                          key={`${post.boardId}-${post.createdAt}`}
                          className='flex justify-center w-full'
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
                  <div className='my-6 text-center text-dark-gray'>
                    더 이상 불러올 게시글이 없습니다.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

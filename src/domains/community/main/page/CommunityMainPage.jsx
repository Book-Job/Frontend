import { useState } from 'react'
import BannerExample from '../../../../components/common/BannerExample'
import SearchBar from '../../../../components/web/SearchBar'
import JobPostSortDropDown from '../../../job/main/components/JobPostSortDropDown'
import FreeBoard from '../../../../components/web/FreeBoard'
import useCommunityPosts from '../hook/useCommunityPosts'
import Spinner from '../../../../components/web/Spinner'
import useSearchPosts from '../../service/useSearchPosts'
const CommunityMainPage = () => {
  const { posts, loading } = useCommunityPosts()
  const [sortOrder, setSortOrder] = useState('latest')
  const { searchResults, searchLoading, hasSearched, handleSearch } = useSearchPosts()
  const rawPosts = searchResults.length > 0 ? searchResults : posts
  const displayedPosts = [...rawPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
  })

  if (loading || searchLoading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  return (
    <>
      <BannerExample />
      <section className='flex justify-center mt-7'>
        <SearchBar onSearch={handleSearch} placeholder='검색어를 입력하세요' />
      </section>
      <div className='flex flex-col mx-4 md:mx-10 lg:mx-[100px] xl:mx-[250px]'>
        <div className='w-full flex justify-end px-30 mt-5 text-[14px] mb-3'>
          <JobPostSortDropDown onSortChange={setSortOrder} />
        </div>
        <div className='mt-[15px] overflow-x-auto'>
          {searchLoading ? (
            <div className='flex justify-center items-center h-[200px]'>
              <Spinner size={40} color='main-pink' />
            </div>
          ) : hasSearched && displayedPosts.length === 0 ? (
            <div className='text-center text-gray-500 text-lg my-10'>
              검색어와 일치하는 결과가 없습니다.
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
              {displayedPosts.map((post) => (
                <div key={post.boardId} className='min-w-[300px]'>
                  <FreeBoard
                    boardId={post.boardId}
                    title={post.title}
                    content={post.text.replace(/<[^>]*>/g, '')}
                    name={post.nickname}
                    date={new Date(post.createdAt).toLocaleDateString()}
                    commentCount={post.commentCount}
                    viewCount={String(post.viewCount)}
                    onNameClick={(name) => {
                      console.log(`${name}의 게시글 보기`)
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

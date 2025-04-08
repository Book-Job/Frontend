import BannerExample from '../../../../components/common/BannerExample'
import SearchBar from '../../../../components/web/SearchBar'
import JobPostSortDropDown from '../../../job/main/components/JobPostSortDropDown'
import FreeBoard from '../../../../components/web/FreeBoard'
import useCommunityPosts from '../hook/useCommunityPosts'
import Spinner from '../../../../components/web/Spinner'
import useSearchPosts from '../../service/useSearchPosts'

const CommunityMainPage = () => {
  const { posts, loading } = useCommunityPosts()
  const { searchResults, searchLoading, hasSearched, handleSearch } = useSearchPosts()

  const displayedPosts = searchResults.length > 0 ? searchResults : posts

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
      <SearchBar
        className='mt-[45px] ml-[264px]'
        onSearch={handleSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='mx-[250px] flex flex-col'>
        <div className='flex justify-end mt-[20px]'>
          <JobPostSortDropDown />
        </div>
        <div className='mt-[15px]'>
          {searchLoading ? (
            <div className='flex justify-center items-center h-[200px]'>
              <Spinner size={40} color='main-pink' />
            </div>
          ) : hasSearched && displayedPosts.length === 0 ? (
            <div className='text-center text-gray-500 text-lg my-10'>
              검색어와 일치하는 결과가 없습니다.
            </div>
          ) : (
            displayedPosts.map((post) => (
              <FreeBoard
                key={post.boardId}
                title={post.title}
                content={post.text}
                name={post.nickname}
                date={new Date(post.createdAt).toLocaleDateString()}
                comment1={post.commentCount}
                view1={post.viewCount}
                onNameClick={(name) => {
                  console.log(`${name}의 게시글 보기`)
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default CommunityMainPage

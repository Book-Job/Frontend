import { useState, useEffect } from 'react'
import SearchBar from '../../../../components/web/SearchBar'
//import CountPost from '../components/CountPost' API 완성 안된듯..
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import { useNavigate } from 'react-router-dom'
import useJobSeekingSearch from '../../common/hook/useJobSeekingSearch'
import useRecruitmentSearch from '../../common/hook/useRecruitmentSearch '
import JobPostList from '../components/JobPostList'
import Spinner from '../../../../components/web/Spinner'
import { useLocation } from 'react-router-dom'

const JobMainPage = () => {
  const location = useLocation()
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [order, setOrder] = useState('latest')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 구인/구직 검색 현재 오류 발생중
  const {
    searchResults: recruitmentResults,
    searchLoading: recruitmentLoading,
    hasSearched: recruitmentHasSearched,
    handleSearch: handleRecruitmentSearch,
    reset: resetRecruitmentSearch,
  } = useRecruitmentSearch()

  const {
    searchResults: jobSeekingResults,
    searchLoading: jobSeekingLoading,
    hasSearched: jobSeekingHasSearched,
    handleSearch: handleJobSeekingSearch,
    reset: resetJobSeekingSearch,
  } = useJobSeekingSearch()

  const isRecruitment = selectedJobTabs === 'job list'
  const searchResults = isRecruitment ? recruitmentResults : jobSeekingResults
  const searchLoading = isRecruitment ? recruitmentLoading : jobSeekingLoading
  const hasSearched = isRecruitment ? recruitmentHasSearched : jobSeekingHasSearched
  const handleSearch = isRecruitment ? handleRecruitmentSearch : handleJobSeekingSearch
  const resetSearch = isRecruitment ? resetRecruitmentSearch : resetJobSeekingSearch

  useEffect(() => {
    if (location.state?.refresh) {
      loadPosts()
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const loadPosts = async () => {
    setLoading(true)
    try {
      let data = isRecruitment ? await getAllRecruitmentPosts(null, 'LATEST') : await getJobPosts()
      const newPostsRaw = isRecruitment ? data?.jobPostings || [] : data?.jobSeekings || []
      let sortedPosts = [...newPostsRaw]
      if (order === 'latest') {
        sortedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else if (order === 'oldest') {
        sortedPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      }
      setPosts(
        sortedPosts.map((post) => ({
          ...post,
          joboffer1: isRecruitment,
          jobsearch1: !isRecruitment,
        })),
      )
    } catch (error) {
      console.error('게시물 로딩 실패', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    resetSearch()
    loadPosts()
  }, [selectedJobTabs, order])

  const displayedPosts = hasSearched ? searchResults : posts

  return (
    <>
      <div className='flex justify-center'>
        <SearchBar
          placeholder='검색어를 입력하세요'
          value={searchKeyword}
          onChange={setSearchKeyword}
          onSearch={handleSearch}
        />
      </div>
      <div className='px-4 md:px-[100px] mt-2 lg:px-[250px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-end'>
            <JobDropDown handleTabChange={setSelectedJobTabs} />
            <JobPostSortDropDown
              className='text-xs sm:text-sm md:text-[15px] font-semibold'
              onSortChange={setOrder}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {loading || searchLoading ? (
            <Spinner />
          ) : displayedPosts.length > 0 ? (
            <JobPostList posts={displayedPosts} navigate={navigate} />
          ) : hasSearched ? (
            <span>검색 결과가 없습니다.</span>
          ) : (
            <span>게시물이 없습니다.</span>
          )}
        </div>
      </div>
    </>
  )
}

export default JobMainPage

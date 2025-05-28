<<<<<<< HEAD
import { useState, useEffect } from 'react'
import SearchBar from '../../../../components/web/SearchBar'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import JobPostList from '../components/JobPostList'
import Spinner from '../../../../components/web/Spinner'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPostCounts } from '../../common/utils/getPostCounts'
import useScrapStore from '../../scrap/store/useScrapStore'
import useJobSearch from '../../common/hook/useJobSearch'

const JobMainPage = () => {
  const location = useLocation()
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [order, setOrder] = useState('latest')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const counts = getPostCounts(posts)
  const loadScraps = useScrapStore((state) => state.loadScraps)
=======
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../../../components/web/SearchBar'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../../common/components/JobPostSortDropDown'
import JobPostList from '../components/JobPostList'
import JobInfiniteScroll from '../../common/components/JobInfiniteScroll'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import { getPostCounts } from '../../common/utils/getPostCounts'
import useScrapStore from '../../scrap/store/useScrapStore'
import useJobSearch from '../../common/hook/useJobSearch'
import { recruitmentSortOptions, seekingSortOptions } from '../../common/constants/sortOptions'

const JobMainPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const loadScraps = useScrapStore((state) => state.loadScraps)

  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')
  const [searchKeyword, setSearchKeyword] = useState('')

  const [recruitmentOrder, setRecruitmentOrder] = useState('latest')
  const [seekingOrder, setSeekingOrder] = useState('latest')

  const recruitmentFetcher = useCallback(getAllRecruitmentPosts, [])
  const seekingFetcher = useCallback(getJobPosts, [])
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c

  const {
    searchResults: jobSeekingResults,
    searchLoading: jobSeekingLoading,
    hasSearched: jobSeekingHasSearched,
    handleSearch: handleJobSeekingSearch,
    reset: resetJobSeekingSearch,
  } = useJobSearch(getJobPosts, 'jobSeekings')

  const {
    searchResults: recruitmentResults,
    searchLoading: recruitmentLoading,
    hasSearched: recruitmentHasSearched,
    handleSearch: handleRecruitmentSearch,
    reset: resetRecruitmentSearch,
  } = useJobSearch(getAllRecruitmentPosts, 'jobPostings')

  const isRecruitment = selectedJobTabs === 'job list'
<<<<<<< HEAD
=======
  const sortOptions = isRecruitment ? recruitmentSortOptions : seekingSortOptions

  const currentOrder = useMemo(
    () => (isRecruitment ? recruitmentOrder : seekingOrder),
    [isRecruitment, recruitmentOrder, seekingOrder],
  )

  const setOrder = isRecruitment
    ? (value) => {
        setRecruitmentOrder(value)
      }
    : (value) => {
        setSeekingOrder(value)
      }

>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  const searchResults = isRecruitment ? recruitmentResults : jobSeekingResults
  const searchLoading = isRecruitment ? recruitmentLoading : jobSeekingLoading
  const hasSearched = isRecruitment ? recruitmentHasSearched : jobSeekingHasSearched
  const handleSearch = isRecruitment ? handleRecruitmentSearch : handleJobSeekingSearch
  const resetSearch = isRecruitment ? resetRecruitmentSearch : resetJobSeekingSearch

  useEffect(() => {
    ;(async () => {
      try {
        resetSearch()
        await loadScraps()
<<<<<<< HEAD
        await loadPosts()
=======
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
      } catch (error) {
        console.error('데이터 로딩 실패', error)
      }
    })()
<<<<<<< HEAD
  }, [selectedJobTabs, order])
=======
  }, [selectedJobTabs, currentOrder])
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c

  useEffect(() => {
    if (location.state?.refresh) {
      loadScraps()
<<<<<<< HEAD
      loadPosts()
=======
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

<<<<<<< HEAD
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
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }
  const displayedPosts = hasSearched ? searchResults : posts
=======
  const counts = getPostCounts(searchResults)
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c

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
<<<<<<< HEAD
          <div className='flex justify-between items-center px-7 mt-4 gap-5 text-xs sm:text-sm md:text-[15px] font-semibold'>
            전체: {counts.total}개 | 오늘: {counts.today}개
          </div>
          <div className='flex items-end'>
            <JobDropDown selectedJobTabs={selectedJobTabs} handleTabChange={setSelectedJobTabs} />
            <JobPostSortDropDown
              className='text-xs sm:text-sm md:text-[15px] font-semibold'
              onSortChange={setOrder}
            />
          </div>
        </div>

        {displayedPosts.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            <JobPostList posts={displayedPosts} navigate={navigate} />
          </div>
        ) : (
          <div className='flex justify-center items-center min-h-[300px] w-full'>
            <p className='text-gray-500 text-lg'>
              {hasSearched ? '검색 결과가 없습니다.' : '게시물이 없습니다.'}
            </p>
          </div>
        )}
=======
          {/*  div className='flex justify-between items-center px-7 mt-4 gap-5 text-xs sm:text-sm md:text-[15px] font-semibold'>
            전체: {counts.total}개 | 오늘: {counts.today}개
          </div>*/}
          <div className='flex items-end ml-auto gap-2'>
            <JobDropDown selectedJobTabs={selectedJobTabs} handleTabChange={setSelectedJobTabs} />
            <JobPostSortDropDown
              className='text-xs sm:text-sm md:text-[15px] font-semibold'
              onSortChange={(value) => {
                setOrder(value)
              }}
              options={sortOptions}
              selected={currentOrder}
            />
          </div>
        </div>
        {hasSearched && searchResults.length > 0 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
            <JobPostList posts={searchResults} navigate={navigate} />
          </div>
        )}
        {hasSearched && searchResults.length === 0 && (
          <div className='flex justify-center items-center min-h-[300px] w-full'>
            <p className='text-gray-500 text-lg'>검색 결과가 없습니다.</p>
          </div>
        )}

        {!hasSearched && (
          <JobInfiniteScroll
            fetcher={isRecruitment ? recruitmentFetcher : seekingFetcher}
            dataKey={isRecruitment ? 'jobPostings' : 'jobSeekings'}
            postType={isRecruitment ? 'recruitment' : 'seeking'}
            order={currentOrder}
          />
        )}
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
      </div>
    </>
  )
}

export default JobMainPage

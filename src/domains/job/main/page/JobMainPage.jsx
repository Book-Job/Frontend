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
      } catch (error) {
        console.error('데이터 로딩 실패', error)
      }
    })()
  }, [selectedJobTabs, currentOrder])

  useEffect(() => {
    if (location.state?.refresh) {
      loadScraps()
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  const counts = getPostCounts(searchResults)

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
      <div className='px-2 md:px-10 mt-2 max-w-screen-xl mx-auto'>
        <div className='flex items-center justify-between mb-2'>
          {/*  div className='flex justify-between items-center px-7 mt-4 gap-5 text-xs sm:text-sm md:text-[15px] font-semibold'>
            전체: {counts.total}개 | 오늘: {counts.today}개
          </div>*/}
          <div className='flex items-end gap-2 ml-auto'>
            <JobDropDown selectedJobTabs={selectedJobTabs} handleTabChange={setSelectedJobTabs} />
            <JobPostSortDropDown
              className='text-xs sm:text-sm md:text-[15px] font-semibold '
              onSortChange={(value) => {
                setOrder(value)
              }}
              options={sortOptions}
              selected={currentOrder}
            />
          </div>
        </div>
        {hasSearched && searchResults.length > 0 && (
          <div className='grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3'>
            <JobPostList posts={searchResults} navigate={navigate} />
          </div>
        )}
        {hasSearched && searchResults.length === 0 && (
          <div className='flex justify-center items-center min-h-[300px] w-full'>
            <p className='text-lg text-gray-500'>검색 결과가 없습니다.</p>
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
      </div>
    </>
  )
}

export default JobMainPage

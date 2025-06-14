import { useState, useEffect, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../../../components/web/SearchBar'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../../common/components/JobPostSortDropDown'
import JobPostList from '../components/JobPostList'
import JobInfiniteScroll from '../../common/components/JobInfiniteScroll'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import useScrapStore from '../../scrap/store/useScrapStore'
import useJobSearch from '../../common/hook/useJobSearch'
import { recruitmentSortOptions, seekingSortOptions } from '../../common/constants/sortOptions'
import SeoHelmet from '../../../../components/common/SeoHelmet'
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

  return (
    <>
      <div className='flex justify-center'>
        <SeoHelmet
          title='북잡 | 출판업계 자유게시판'
          description='출판 업계의 자유게시글을 한눈에 확인해보세요. 실시간으로 업데이트됩니다.'
          image='https://book-job.co.kr/metatag.png'
          url='https://book-job.co.kr/job'
        />
        <SearchBar
          value={searchKeyword}
          onChange={(value) => {
            setSearchKeyword(value)
            if (value.trim() === '') resetSearch()
          }}
          onSearch={(value) => {
            setSearchKeyword(value)
            if (value.trim() === '') resetSearch()
            else handleSearch(value)
          }}
        />
      </div>
      <div className='board flex flex-col mx-4 md:mx-10 lg:mx-[100px] xl:mx-[250px] mt-2'>
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-end gap-2 ml-auto'>
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

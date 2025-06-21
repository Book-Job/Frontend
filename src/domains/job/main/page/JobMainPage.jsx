import { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../../../components/web/SearchBar'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../../common/components/JobPostSortDropDown'
import JobPostList from '../components/JobPostList'
import JobInfiniteScroll from '../../common/components/JobInfiniteScroll'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import useScrapStore from '../../scrap/store/useScrapStore'
import useJobSearch from '../../common/hook/useJobSearch'
import SeoHelmet from '../../../../components/common/SeoHelmet'
import useJobMainState from '../hook/useJobMainState'
import useSortOptions from '../../common/hook/useSortOptions'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const JobMainPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const loadScraps = useScrapStore((state) => state.loadScraps)
  const isMobile = useIsMobile()
  const [refreshToken, setRefreshToken] = useState(0)

  const { selectedTab, setSelectedTab, order, setOrder, keyword, setKeyword } = useJobMainState()

  const recruitmentFetcher = useCallback(getAllRecruitmentPosts, [])
  const { recruitmentSortOptions, seekingSortOptions } = useSortOptions()
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

  const isRecruitment = selectedTab === 'job list'
  const sortOptions = isRecruitment ? recruitmentSortOptions : seekingSortOptions

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
  }, [selectedTab, order])

  useEffect(() => {
    if (location.state?.refresh) {
      resetSearch()
      loadScraps()
      if (selectedTab === 'job list') {
        handleRecruitmentSearch('')
      } else {
        handleJobSeekingSearch('')
      }
      if (location.state.triggerRefresh) {
        setRefreshToken((prev) => prev + 1)
      }
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  return (
    <>
      <section className='flex justify-center mt-7'>
        <SeoHelmet
          title='북잡 | 출판업계 구인 & 구직'
          description='출판 업계의 구인 | 구직 공고를 한눈에 확인해보세요. 실시간으로 업데이트됩니다.'
          image='https://book-job.co.kr/metatag.png'
          url='https://book-job.co.kr/job'
        />
        <SearchBar
          value={keyword}
          placeholder='검색어를 입력하세요'
          onChange={(value) => {
            setKeyword(value)
            if (value.trim() === '') resetSearch()
          }}
          onSearch={(value) => {
            setKeyword(value)
            if (value.trim() === '') resetSearch()
            else handleSearch(value)
          }}
        />
      </section>
      <div className='flex flex-col mx-4 md:mx-10 lg:mx-[100px] xl:mx-[250px]'>
        <div className='flex items-end ml-auto'>
          <JobDropDown selectedJobTabs={selectedTab} handleTabChange={setSelectedTab} />
          <JobPostSortDropDown onSortChange={setOrder} options={sortOptions} selected={order} />
        </div>
        {hasSearched && searchResults.length > 0 && (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
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
            key={`${selectedTab}-${order}`}
            fetcher={isRecruitment ? recruitmentFetcher : seekingFetcher}
            dataKey={isRecruitment ? 'jobPostings' : 'jobSeekings'}
            postType={isRecruitment ? 'recruitment' : 'seeking'}
            order={order}
            refreshToken={refreshToken}
            isMobile={isMobile}
          />
        )}
      </div>
    </>
  )
}

export default JobMainPage

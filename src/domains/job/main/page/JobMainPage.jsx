import { useEffect, useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from '../../../../components/web/SearchBar'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../../common/components/JobPostSortDropDown'
import JobInfiniteScroll from '../../common/components/JobInfiniteScroll'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import useScrapStore from '../../scrap/store/useScrapStore'
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
  const seekingFetcher = useCallback(getJobPosts, [])
  const { recruitmentSortOptions, seekingSortOptions } = useSortOptions()

  const isRecruitment = selectedTab === 'job list'
  const sortOptions = isRecruitment ? recruitmentSortOptions : seekingSortOptions
  const fetcher = isRecruitment ? recruitmentFetcher : seekingFetcher
  const dataKey = isRecruitment ? 'jobPostings' : 'jobSeekings'
  const postType = isRecruitment ? 'recruitment' : 'seeking'

  useEffect(() => {
    ;(async () => {
      try {
        await loadScraps()
      } catch (error) {
        console.error('데이터 로딩 실패', error)
      }
    })()
  }, [selectedTab, order])

  return (
    <div className='w-full'>
      <section className='flex justify-center w-full mt-7 '>
        <SeoHelmet
          title='북잡 | 출판업계 구인 & 구직'
          description='출판 업계의 구인 | 구직 공고를 한눈에 확인해보세요. 실시간으로 업데이트됩니다.'
          image='https://www.bookjob.co.kr/metatag.png'
          url='https://www.bookjob.co.kr/job'
        />
        <div className='w-full max-w-[940px] justify-center flex'>
          <SearchBar placeholder='검색어를 입력하세요' onSearch={(value) => setKeyword(value)} />
        </div>
      </section>

      <div className='flex flex-col w-full max-w-[940px] mx-auto'>
        <div className='flex items-center justify-center w-full mt-6 mb-3'>
          <div className='flex justify-end w-full sm:max-w-[940px] max-w-xs '>
            <JobDropDown selectedJobTabs={selectedTab} handleTabChange={setSelectedTab} />
            <JobPostSortDropDown onSortChange={setOrder} options={sortOptions} selected={order} />
          </div>
        </div>

        <JobInfiniteScroll
          key={`${selectedTab}-${order}-${refreshToken}-${keyword || ''}`}
          fetcher={fetcher}
          dataKey={dataKey}
          postType={postType}
          order={order}
          refreshToken={refreshToken}
          searchKeyword={keyword}
          isMobile={isMobile}
          navigate={navigate}
        />
      </div>
    </div>
  )
}

export default JobMainPage

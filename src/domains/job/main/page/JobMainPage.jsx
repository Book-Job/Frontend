import { useState, useEffect } from 'react'
import SearchBar from '../../../../components/web/SearchBar'
import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import CountPost from '../components/CountPost'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'

const JobMainPage = () => {
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastId, setLastId] = useState(null) // 마지막 조회된 ID
  const [order, setOrder] = useState('LATEST') // 기본 정렬 기준

  // 구인 또는 구직 글을 불러오는 함수
  const loadPosts = async () => {
    setLoading(true)
    try {
      let data
      if (selectedJobTabs === 'job list') {
        data = await getAllRecruitmentPosts(lastId, order) // 구인 API 호출
      } else {
        data = await getJobPosts(lastId, order) // 구직 API 호출
      }

      const newPosts = data?.jobPostings || []
      if (newPosts.length > 0) {
        setPosts((prev) => [...prev, ...newPosts])
        setLastId(data.lastId) // 마지막 ID 갱신
      }
    } catch (err) {
      console.error('게시물 로딩 실패', err)
    } finally {
      setLoading(false)
    }
  }

  // 탭 클릭 시 선택된 탭에 맞는 글을 불러옴
  const handleTabChange = (tab) => {
    setSelectedJobTabs(tab)
    setPosts([]) // 새로운 탭으로 변경 시 기존 게시물 초기화
    setLastId(null) // 마지막 ID 초기화
  }

  // 페이지가 로드될 때 글을 불러옴
  useEffect(() => {
    loadPosts()
  }, [selectedJobTabs, lastId, order]) // selectedJobTabs, lastId, order 변경 시마다 글을 로드

  return (
    <>
      <div className='flex justify-center'>
        <SearchBar placeholder='검색어를 입력하세요' />
      </div>
      <div className='px-4 md:px-[100px] mt-2 lg:px-[250px]'>
        <div className='flex items-center justify-between'>
          <CountPost />
          <div className='flex items-end'>
            <JobDropDown handleTabChange={handleTabChange} />
            <JobPostSortDropDown className='text-xs sm:text-sm md:text-[15px] font-semibold' />
          </div>
        </div>

        <div className='flex gap-4 mt-4 mx-[27px]'>
          {posts.length > 0 ? (
            <>
              <WorkBoard className='hidden sm:block' posts={posts} loading={loading} />
              <MobileWorkBoard className='block sm:hidden' posts={posts} loading={loading} />
            </>
          ) : (
            <span>게시물이 없습니다.</span>
          )}
        </div>
      </div>
    </>
  )
}

export default JobMainPage

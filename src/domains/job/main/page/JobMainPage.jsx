import { useState, useEffect } from 'react'
import SearchBar from '../../../../components/web/SearchBar'
import CountPost from '../components/CountPost'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import { useNavigate } from 'react-router-dom'
//import ROUTER_PATHS from '../../../../routes/RouterPath'
import JobPostList from '../components/JobPostList'

const JobMainPage = () => {
  const [selectedJobTabs, setSelectedJobTabs] = useState('job list')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastId, setLastId] = useState(null)
  const [order, setOrder] = useState('LATEST')
  const navigate = useNavigate()

  const loadPosts = async () => {
    setLoading(true)
    try {
      let data
      if (selectedJobTabs === 'job list') {
        data = await getAllRecruitmentPosts(lastId, order)
      } else {
        data = await getJobPosts(lastId, order)
      }

      const newPostsRaw = data?.jobSeekings || []
      const newPosts = newPostsRaw.map((post) => ({
        ...post,
        joboffer1: selectedJobTabs === 'job list',
        jobsearch1: selectedJobTabs !== 'job list',
      }))

      if (newPosts.length > 0) {
        setPosts((prev) => {
          const uniquePosts = [...prev, ...newPosts].filter(
            (post, index, self) => index === self.findIndex((p) => p.id === post.id),
          )
          return uniquePosts
        })
        setLastId(data.lastId)
      }
    } catch (err) {
      console.error('게시물 로딩 실패', err)
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setSelectedJobTabs(tab)
    setPosts([])
    setLastId(null)
  }

  useEffect(() => {
    loadPosts()
  }, [selectedJobTabs, lastId, order])

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

        <div className='flex flex-wrap gap-4 mt-4 mx-[27px]'>
          <div className='flex flex-wrap gap-4 mt-4 mx-[27px]'>
            {posts.length > 0 ? (
              <JobPostList posts={posts} navigate={navigate} />
            ) : (
              <span>게시물이 없습니다.</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default JobMainPage

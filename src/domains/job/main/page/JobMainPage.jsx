import { useState, useEffect } from 'react'
import SearchBar from '../../../../components/web/SearchBar'
import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import CountPost from '../components/CountPost'
import JobDropDown from '../components/JobDropDown'
import JobPostSortDropDown from '../components/JobPostSortDropDown'
import { getAllRecruitmentPosts, getJobPosts } from '../service/jobMainService'
import { useNavigate } from 'react-router-dom'

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

      const handlePostClick = (postId) => {
        navigate(`/post/${postId}`)
      }

      const newPosts = data?.jobSeekings || []
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
          {posts.length > 0 ? (
            <>
              <div className='hidden sm:flex flex-wrap gap-4'>
                {posts.map((post) => (
                  <WorkBoard
                    key={post.id}
                    title={post.title}
                    name={post.nickname}
                    date={post.createdAt}
                    view={post.viewCount}
                    experience={post.experience}
                    employmentType={post.employmentType}
                    jobCategory={post.jobCategory}
                  />
                ))}
              </div>
              <div className='block sm:hidden'>
                <div className='flex flex-wrap gap-4 mt-4'>
                  {posts.map((post) => (
                    <MobileWorkBoard
                      key={post.id}
                      title={post.title}
                      name={post.nickname}
                      date={post.createdAt}
                      like={post.like}
                      popular1={post.popular1}
                      joboffer1={post.joboffer1}
                      history1={post.history1}
                      jobsearch1={post.jobsearch1}
                      othersite1={post.othersite1}
                      worktype1={post.worktype1}
                      view={post.viewCount}
                      onClick={() => handlePostClick(post.id)}
                    />
                  ))}
                </div>
              </div>
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

import React, { useEffect, useState, useMemo } from 'react'
import WorkBoard from '../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../components/app/MobileWorkBoard'
import PageTitle from '../../Find/common/components/PageTitle'
import { getAllScrap } from '../../job/scrap/service/scrapService'
import getExperienceLabel from '../../job/common/utils/getExperienceLabel'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../../store/login/useAuthStore'
import Spinner from '../../../components/web/Spinner'
import PostSortDropDown from '../../../components/common/PostSortDropDown'

//현재 라우팅도 오류남.. 잡카테고리를 안 넘겨움 + 닉네임
const MyScrap = () => {
  const [scrapPosts, setScrapPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState('latest')
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const loggedInUserId = user ? user.userId : null

  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    getAllScrap()
      .then((data) => {
        if (isMounted) setScrapPosts(data)
      })
      .catch(console.error)
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  const sortedPosts = useMemo(() => {
    if (!scrapPosts) return []
    return [...scrapPosts].sort((a, b) => {
      if (sort === 'latest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
    })
  }, [scrapPosts, sort])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <PageTitle title={'스크랩'} />
      <div className='flex justify-end max-w-[932px] mx-auto mb-2'>
        <PostSortDropDown onSortChange={setSort} />
      </div>

      <div className='hidden sm:grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 max-w-[932px] mx-auto justify-items-center'>
        {sortedPosts.map((post) => (
          <WorkBoard
            key={post.bookMarkId || post.id}
            postId={post.entityId || post.id}
            title={post.title}
            name={post.nickname}
            date={formatDate(post.createdAt)}
            like={post.like || false}
            popular1={post.popular1 || false}
            joboffer1={post.joboffer1 || false}
            experienceLabel={getExperienceLabel(post.experienceMin, post.experienceMax)}
            jobsearch1={post.jobsearch1 || false}
            othersite1={post.othersite1 || false}
            worktype1={post.worktype1 || post.employmentType}
            employmentType={post.employmentType}
            view={post.viewCount || post.view}
            userId={loggedInUserId}
            initialScrapped={true}
            type={post.joboffer1 ? 'JOB_POSTING' : post.jobsearch1 ? 'JOB_SEEKING' : 'UNKNOWN'}
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${post.entityId}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${post.entityId}`)
              } else {
                navigate(`/detail/${post.entityId}`)
              }
            }}
          />
        ))}
      </div>

      <div className='block sm:hidden flex flex-wrap gap-4 mt-4 ml-4'>
        {sortedPosts.map((post) => (
          <MobileWorkBoard
            key={post.bookMarkId || post.id}
            postId={post.entityId || post.id}
            title={post.title}
            name={post.nickname || post.recruitmentCategory || '작성자 없음'}
            date={formatDate(post.createdAt)}
            like={post.like || false}
            popular1={post.popular1 || false}
            joboffer1={post.joboffer1 || false}
            experienceLabel={getExperienceLabel(post.experienceMin, post.experienceMax)}
            jobsearch1={post.jobsearch1 || false}
            othersite1={post.othersite1 || false}
            worktype1={post.worktype1 || post.employmentType}
            employmentType={post.employmentType}
            view={post.viewCount || post.view}
            userId={loggedInUserId}
            initialScrapped={true}
            type={post.joboffer1 ? 'JOB_POSTING' : post.jobsearch1 ? 'JOB_SEEKING' : 'UNKNOWN'}
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${post.entityId}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${post.entityId}`)
              } else {
                navigate(`/detail/${post.entityId}`)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MyScrap

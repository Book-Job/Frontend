import { useEffect, useState, useMemo } from 'react'
import WorkBoard from '../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../components/app/MobileWorkBoard'
import PageTitle from '../../Find/common/components/PageTitle'
import getExperienceLabel from '../../job/common/utils/getExperienceLabel'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../../../store/login/useAuthStore'
import Spinner from '../../../components/web/Spinner'
import PostSortDropDown from '../../../components/common/PostSortDropDown'
import useIsMobile from '../../../hooks/header/useIsMobile'
import useScrapStore from '../../job/scrap/store/useScrapStore'
import ToastService from '../../../services/toast/ToastService'

const MyScrap = () => {
  const { scraps, loadScraps } = useScrapStore()
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState('latest')
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const loggedInUserId = user ? user.userId : null

  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        await loadScraps()
      } catch (err) {
        console.error(err)
        ToastService.error('스크랩 데이터를 불러오는 데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const sortedPosts = useMemo(() => {
    const posts = Object.values(scraps || {})
    return posts.sort((a, b) => {
      return sort === 'latest'
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    })
  }, [scraps, sort])

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[300px]'>
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className='sm:mt-10'>{!isMobile && <PageTitle title={'스크랩'} />}</div>

      {!loading && sortedPosts.length === 0 && (
        <div className='items-center text-center text-dark-gray'>스크랩한 글이 없습니다.</div>
      )}

      {sortedPosts.length > 0 && (
        <div className='flex justify-end mx-auto sm:mt-0 mb-4 sm:max-w-[940px] max-w-xs'>
          <PostSortDropDown onSortChange={setSort} />
        </div>
      )}

      <div className='hidden sm:grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-[940px] mx-auto mt-5 justify-items-center'>
        {sortedPosts.map((post) => (
          <WorkBoard
            key={post.bookMarkId ?? post.entityId ?? post.id}
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
            view={post.viewCount || post.view || 0}
            userId={loggedInUserId}
            initialScrapped={!!scraps[post.entityId || post.id]}
            type={post.joboffer1 ? 'JOB_POSTING' : post.jobsearch1 ? 'JOB_SEEKING' : 'UNKNOWN'}
            onClick={() => {
              const id = post.entityId
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${id}`)
              } else {
                navigate(`/detail/${id}`)
              }
            }}
          />
        ))}
      </div>

      <div className='flex flex-wrap gap-3 sm:hidden'>
        {sortedPosts.map((post) => (
          <MobileWorkBoard
            key={post.bookMarkId ?? post.entityId ?? post.id}
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
            view={post.viewCount || post.view || 0}
            userId={loggedInUserId}
            initialScrapped={!!scraps[post.entityId || post.id]}
            type={post.joboffer1 ? 'JOB_POSTING' : post.jobsearch1 ? 'JOB_SEEKING' : 'UNKNOWN'}
            onClick={() => {
              const id = post.entityId
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${id}`)
              } else {
                navigate(`/detail/${id}`)
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default MyScrap

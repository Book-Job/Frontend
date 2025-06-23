import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import useAuthStore from '../../../../store/login/useAuthStore'
import getExperienceLabel from '../../common/utils/getExperienceLabel'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const JobPostList = ({ posts, navigate }) => {
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  const loggedInUserId = user ? user.userId : null
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  return (
    <>
      {posts.map((post) => {
        const commonProps = {
          title: post.title,
          name: post.nickname,
          date: formatDate(post.createdAt),
          like: post.like,
          popular1: post.popular1,
          joboffer1: post.joboffer1,
          experienceLabel: getExperienceLabel(post.experienceMin, post.experienceMax),
          jobsearch1: post.jobsearch1,
          othersite1: post.othersite1,
          worktype1: post.worktype1,
          employmentType: post.employmentType,
          view: post.viewCount,
          userId: loggedInUserId,
          initialScrapped: false,
          postId: post.id,
          type: post.joboffer1 ? 'JOB_POSTING' : post.jobsearch1 ? 'JOB_SEEKING' : 'UNKNOWN',
          onClick: () => {
            if (post.joboffer1) {
              navigate(`/job/recruitment/post/${post.id}`)
            } else if (post.jobsearch1) {
              navigate(`/job/job-seek/post/${post.id}`)
            } else {
              navigate(`/detail/${post.id}`)
            }
          },
        }

        return isMobile ? (
          <div className='w-full' key={post.id}>
            <MobileWorkBoard {...commonProps} />
          </div>
        ) : (
          <div className='w-full' key={post.id}>
            <WorkBoard {...commonProps} />
          </div>
        )
      })}
    </>
  )
}

export default JobPostList

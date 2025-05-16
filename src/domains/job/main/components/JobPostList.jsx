import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import useAuthStore from '../../../../store/login/useAuthStore'
const JobPostList = ({ posts, navigate }) => {
  const { user } = useAuthStore()

  const loggedInUserId = user ? user.userId : null
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  return (
    <>
      {posts.map((post) => (
        <div className='hidden sm:block w-full' key={post.id}>
          <WorkBoard
            key={post.id}
            title={post.title}
            name={post.nickname}
            date={formatDate(post.createdAt)}
            like={post.like}
            popular1={post.popular1}
            joboffer1={post.joboffer1}
            history1={post.history1}
            jobsearch1={post.jobsearch1}
            othersite1={post.othersite1}
            worktype1={post.worktype1}
            view={post.viewCount}
            userId={loggedInUserId}
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${post.id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${post.id}`)
              } else {
                navigate(`/detail/${post.id}`)
              }
            }}
          />
        </div>
      ))}

      <div className='block sm:hidden flex flex-wrap gap-4 mt-4 ml-4'>
        {posts.map((post) => (
          <MobileWorkBoard
            key={post.id}
            title={post.title}
            name={post.nickname}
            date={formatDate(post.createdAt)}
            like={post.like}
            popular1={post.popular1}
            joboffer1={post.joboffer1}
            userId={loggedInUserId}
            history1={post.history1}
            jobsearch1={post.jobsearch1}
            othersite1={post.othersite1}
            worktype1={post.worktype1}
            view={post.viewCount}
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job/recruitment/post/${post.id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-seek/post/${post.id}`)
              } else {
                navigate(`/detail/${post.id}`)
              }
            }}
          />
        ))}
      </div>
    </>
  )
}

export default JobPostList

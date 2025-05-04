import WorkBoard from '../../../../components/web/WorkBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
const JobPostList = ({ posts, navigate }) => {
  return (
    <>
      <div className='hidden sm:flex flex-wrap gap-4'>
        {posts.map((post) => (
          <WorkBoard
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
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job-offer/${post.id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-search/post/${post.id}`)
              } else {
                navigate(`/detail/${post.id}`)
              }
            }}
          />
        ))}
      </div>

      <div className='block sm:hidden flex flex-wrap gap-4 mt-4'>
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
            onClick={() => {
              if (post.joboffer1) {
                navigate(`/job-offer/${post.id}`)
              } else if (post.jobsearch1) {
                navigate(`/job/job-search/post/${post.id}`)
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

import { useNavigate } from 'react-router-dom'
import WorkBoard from '../../../../components/web/WorkBoard'
import getExperienceLabel from '../../../job/common/utils/getExperienceLabel'
import FreeBoard from '../../../../components/web/FreeBoard'

const RecentList = ({ sortedPosts }) => {
  const navigate = useNavigate()
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  return (
    <div className='w-full sm:max-w-[940px] mx-auto px-4 sm:px-10'>
      <div className='sm:grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 max-w-[932px] mx-auto justify-items-center px-4'>
        {sortedPosts.map((post) =>
          post.draftType !== 'community' ? (
            <WorkBoard
              key={post.id}
              postId={post.id}
              title={post.title}
              name={post.nickname}
              date={formatDate(post.createdAt)}
              like={post.like || false}
              popular1={post.popular1 || false}
              joboffer1={post.draftType === 'jobPostings' || false}
              experienceLabel={
                getExperienceLabel(post.experienceMin, post.experienceMax) ||
                getExperienceLabel(post.experience)
              }
              jobsearch1={post.draftType === 'jobSeekings' || false}
              othersite1={post.othersite1 || false}
              worktype1={post.worktype1 || post.employmentType}
              employmentType={post.employmentType}
              view={post.viewCount || post.view}
              type={post.draftType || 'community'}
              onClick={() => {
                const id = post.id
                if (post.draftType === 'jobPostings') {
                  navigate(`/job/recruitment/post/${id}`)
                } else {
                  navigate(`/job/job-seek/post/${id}`)
                }
              }}
            />
          ) : (
            <FreeBoard
              key={post.id}
              boardId={post.id}
              title={post.title}
              content={post.text}
              name={post.nickname}
              date={formatDate(post.createdAt)}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default RecentList

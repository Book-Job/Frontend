import { useNavigate } from 'react-router-dom'
import WorkBoard from '../../../../components/web/WorkBoard'
import getExperienceLabel from '../../../job/common/utils/getExperienceLabel'
import FreeBoard from '../../../../components/web/FreeBoard'
import MobileWorkBoard from '../../../../components/app/MobileWorkBoard'
import MobileFreeBoard from '../../../../components/app/MobileFreeBoard'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import { BsCardImage } from 'react-icons/bs'

const RecentList = ({ sortedPosts }) => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const formatDate = (dateStr) => (dateStr ? dateStr.slice(0, 10) : '')

  const WorkBoardComponent = isMobile ? MobileWorkBoard : WorkBoard
  const FreeBoardComponent = isMobile ? MobileFreeBoard : FreeBoard
  return (
    <div className='w-full sm:max-w-[940px] mx-auto '>
      <div className='grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 max-w-[932px] mx-4 justify-items-center '>
        {sortedPosts.map((post) => {
          const strippedText = post.text.replace(/<[^>]*>/g, '').trim()
          const content =
            strippedText.length === 0 ? (
              <span className='flex items-center gap-1 text-gray-500'>
                <BsCardImage className='text-lg' />
                이미지 게시글입니다
              </span>
            ) : (
              strippedText
            )
          return post.draftType !== 'community' ? (
            <WorkBoardComponent
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
            <FreeBoardComponent
              key={post.id}
              boardId={post.id}
              title={post.title}
              content={content}
              name={post.nickname}
              date={formatDate(post.createdAt)}
              commentCount={post.commentCount}
              viewCount={post.viewCount}
            />
          )
        })}
      </div>
    </div>
  )
}

export default RecentList

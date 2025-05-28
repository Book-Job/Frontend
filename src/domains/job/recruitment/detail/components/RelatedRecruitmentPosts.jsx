import { useNavigate } from 'react-router-dom'
import { getAllRecruitmentPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'
import JobInfiniteScroll from '../../../common/components/JobInfiniteScroll'

const RelatedRecruitmentPosts = ({ currentId }) => {
  const navigate = useNavigate()

  const fetchRelatedPosts = async (lastId) => {
    const data = await getAllRecruitmentPosts(lastId, 'LATEST')
    const filtered = (data?.jobPostings || []).filter((p) => String(p.id) !== String(currentId))
    return {
      ...data,
      jobPostings: filtered,
    }
  }

  return (
    <JobInfiniteScroll
      fetcher={fetchRelatedPosts}
      dataKey='jobPostings'
      postType='recruitment'
      order='latest'
      renderList={(posts) =>
        posts.length === 0 ? (
          <p className='text-gray-400'>관련 채용 글이 없습니다.</p>
        ) : (
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
            <JobPostList posts={posts} navigate={navigate} />
          </div>
        )
      }
      loadingComponent={
        <div className='flex justify-center items-center h-[300px]'>
          <Spinner size={48} color='main-pink' />
        </div>
      }
    />
  )
}

export default RelatedRecruitmentPosts

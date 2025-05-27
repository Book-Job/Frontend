import { useNavigate } from 'react-router-dom'
import { getJobPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'
import JobInfiniteScroll from '../../../common/components/JobInfiniteScroll'

const RelatedJobSearchPosts = ({ currentId }) => {
  const navigate = useNavigate()
  const fetchRelatedPosts = async (lastId) => {
    const data = await getJobPosts(lastId, 'LATEST')
    const filtered = (data?.jobSeekings || []).filter((p) => String(p.id) !== String(currentId))
    return {
      ...data,
      jobSeekings: filtered,
    }
  }

  return (
    <JobInfiniteScroll
      fetcher={fetchRelatedPosts}
      dataKey='jobSeekings'
      postType='seeking'
      order='latest'
      renderList={(posts) =>
        posts.length === 0 ? (
          <div className='text-gray-400'>관련 구직 글이 없습니다.</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
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

export default RelatedJobSearchPosts

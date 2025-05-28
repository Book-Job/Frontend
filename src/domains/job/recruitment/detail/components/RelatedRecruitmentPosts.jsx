<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
import { useNavigate } from 'react-router-dom'
import { getAllRecruitmentPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'
<<<<<<< HEAD

const RelatedRecruitmentPosts = ({ currentId }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getAllRecruitmentPosts(undefined, 'LATEST')
        const jobPostings = data?.jobPostings || []
        const filtered = jobPostings.filter((p) => String(p.id) !== String(currentId))

        if (isMounted) setPosts(filtered)
      } catch (err) {
        if (isMounted) setError(err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchPosts()
    return () => {
      isMounted = false
    }
  }, [currentId])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[300px]'>
        <Spinner size={48} color='main-pink' />
      </div>
    )
  }

  if (error) return <p className='text-red-500'>관련 채용 글을 불러올 수 없습니다.</p>
  if (posts.length === 0) return <p className='text-gray-400'>관련 채용 글이 없습니다.</p>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
      <JobPostList posts={posts} navigate={navigate} />
    </div>
=======
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
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  )
}

export default RelatedRecruitmentPosts

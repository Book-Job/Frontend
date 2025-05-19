import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getJobPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'

const RelatedJobSearchPosts = ({ currentId }) => {
  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getJobPosts(undefined, 'LATEST')
        const jobSeekings = data?.jobSeekings || []
        const filtered = jobSeekings.filter((p) => String(p.id) !== String(currentId))
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

  if (error) return <div className='text-red-500'>관련 채용 글을 불러올 수 없습니다.</div>
  if (posts.length === 0) return <div className='text-gray-400'>관련 채용 글이 없습니다.</div>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
      <JobPostList posts={posts} navigate={navigate} />
    </div>
  )
}

export default RelatedJobSearchPosts

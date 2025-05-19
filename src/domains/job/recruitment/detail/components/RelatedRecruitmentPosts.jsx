import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllRecruitmentPosts } from '../../../../job/main/service/jobMainService'
import JobPostList from '../../../main/components/JobPostList'
import Spinner from '../../../../../components/web/Spinner'

const RelatedRecruitmentPosts = ({ currentId }) => {
  const [posts, setPosts] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await getAllRecruitmentPosts(undefined, 'LATEST')
        const jobPostings = data?.jobPostings || []
        const filtered = jobPostings.filter((p) => String(p.id) !== String(currentId))
        jobPostings.forEach((p) => console.log('post.id:', p.id))

        setPosts(filtered)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
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

  console.log('currentId:', currentId)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
      <JobPostList posts={posts} navigate={navigate} />
    </div>
  )
}

export default RelatedRecruitmentPosts

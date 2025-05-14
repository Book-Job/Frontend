import { useEffect, useState } from 'react'
import { getRecruitmentPostDetail } from '../../../service/postService'

const useRecruitmentPostDetail = (jobPostingId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobPostingId) return
    setLoading(true)
    setError(null)
    getRecruitmentPostDetail(jobPostingId)
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message || '상세 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [jobPostingId])

  return { data, loading, error }
}

export default useRecruitmentPostDetail

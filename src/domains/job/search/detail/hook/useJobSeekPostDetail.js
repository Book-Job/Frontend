import { useEffect, useState } from 'react'
import { getJobSeekPostDetail } from '../../../service/postService'

const useJobSeekPostDetail = (jobSeekingId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!jobSeekingId) return
    console.log('상세 조회 useEffect 실행:', jobSeekingId)
    setLoading(true)
    setError(null)
    getJobSeekPostDetail(jobSeekingId)
      .then((res) => setData(res))

      .catch((err) => setError(err.message || '상세 정보를 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [jobSeekingId])

  return { data, loading, error }
}

export default useJobSeekPostDetail

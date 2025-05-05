import { authApi } from '../../../services/api/axios'

//구인 글 작성
export const createRecruitmentPost = async (postData) => {
  const response = await authApi.post('/job-posting', postData)
  return response.data
}

//구직 글 작성
export const createJobSeekPost = async (postData) => {
  const response = await authApi.post('/job-seeking', postData)
  return response.data
}

//구직 글 상세조회
export const JobSeekPostDetail = async (postData) => {
  const response = await authApi.get('job-seeking/{jobSeekingId}', postData)
  return response.data
}

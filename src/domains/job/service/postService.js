import { authApi } from '../../../services/api/axios'

//구인 글 작성
export const createRecruitmentPost = async (postData) => {
  const response = await authApi.post('/job-posting', postData)
  return response.data
}

//구인 글 상세조회
export const getRecruitmentPostDetail = async (jobPostingId) => {
  const response = await authApi.get(`/job-posting/${jobPostingId}`)
  return response.data
}

//구인 글 수정
export const editRecruitmentPost = async (jobPostingId, data) => {
  const response = await authApi.patch(`/job-posting/${jobPostingId}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}
//구인 글 삭제
export const deleteRecruitmentPost = async (jobPostingId) => {
  const response = await authApi.delete(`/job-posting/${jobPostingId}`)
  return response.data.data
}

//구직 글 작성
export const createJobSeekPost = async (postData) => {
  const response = await authApi.post('/job-seeking', postData)
  return response.data
}

//구직 글 상세조회
export const getJobSeekPostDetail = async (jobSeekingId) => {
  const response = await authApi.get(`/job-seeking/${jobSeekingId}`)
  return response.data.data
}

//구직 글 삭제
export const deleteJobSeekPost = async (jobSeekingId) => {
  const response = await authApi.delete(`/job-seeking/${jobSeekingId}`)
  return response.data.data
}

//구직 글 수정

import { authApi } from '../../../../services/api/axios'

export const createRecruitmentPost = async (postData) => {
  const response = await authApi.post('/job-posting', postData)
  return response.data
}

export const getRecruitmentPostDetail = async (jobPostingId) => {
  const response = await authApi.get(`/job-posting/${jobPostingId}`)
  return response.data
}

export const editRecruitmentPost = async (jobPostingId, data) => {
  const response = await authApi.patch(`/job-posting/${jobPostingId}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

export const deleteRecruitmentPost = async (jobPostingId) => {
  const response = await authApi.delete(`/job-posting/${jobPostingId}`)
  return response.data.data
}

export const createJobSeekPost = async (postData) => {
  const response = await authApi.post('/job-seeking', postData)
  return response.data
}

export const getJobSeekPostDetail = async (jobSeekingId) => {
  const response = await authApi.get(`/job-seeking/${jobSeekingId}`)
  return response.data.data
}

export const deleteJobSeekPost = async (jobSeekingId) => {
  const response = await authApi.delete(`/job-seeking/${jobSeekingId}`)
  return response.data.data
}

export const editJobSeekPost = async (jobSeekingId, data) => {
  const response = await authApi.patch(`/job-seeking/${jobSeekingId}`, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return response.data.data
}

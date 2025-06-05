import { publicApi } from '../../../../services/api/axios'
import { recruitmentSortOrder, seekingSortOrder } from '../../../job/common/utils/sortOrder'

export const getAllRecruitmentPosts = async (lastId, order, keyword) => {
  const apiOrder = recruitmentSortOrder[order] || order || 'LATEST'
  const params = {
    order: apiOrder,
    size: 6,
  }
  if (lastId !== undefined && lastId !== null) params.last = lastId

  if (keyword && keyword.trim() !== '') {
    params.keyword = keyword
    params.searchType = 'NICKNAME'
  }

  const response = await publicApi.get('/job-posting', { params })
  const data = response.data.data
  return {
    jobPostings: (data.jobPostings || []).map((post) => ({
      ...post,
      joboffer1: true,
    })),
    lastId: data.lastId,
  }
}

export const getJobPosts = async (lastId, order, keyword) => {
  const apiOrder = seekingSortOrder[order] || 'LATEST'
  const params = { order: apiOrder, size: 6 }
  if (lastId !== undefined && lastId !== null) params.last = lastId

  if (keyword && keyword.trim() !== '') {
    params.keyword = keyword
    params.searchType = 'NICKNAME'
  }

  const response = await publicApi.get('/job-seeking', { params })
  const data = response.data.data
  return {
    jobSeekings: (data.jobSeekings || []).map((post) => ({
      ...post,
      jobsearch1: true,
    })),
    lastId: data.lastId,
  }
}

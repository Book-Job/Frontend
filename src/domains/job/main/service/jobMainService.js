<<<<<<< HEAD
// 구인 전체 글 조회 및 검색
import { publicApi } from '../../../../services/api/axios'
export const getAllRecruitmentPosts = async (lastId, order, keyword) => {
  try {
    const params = {}
    if (lastId !== undefined && lastId !== null) params.last = lastId
    if (order !== undefined && order !== null) params.order = order
    if (keyword && keyword.trim() !== '') params.keyword = keyword

    const response = await publicApi.get('/job-posting', {
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    const data = response.data.data

    const postsWithTag = (Array.isArray(data.jobPostings) ? data.jobPostings : []).map((post) => ({
      ...post,
      joboffer1: true,
      createdAtShort: post.createdAt ? post.createdAt.slice(0, 10) : '',
    }))

    return {
      ...data,
      jobPostings: postsWithTag,
    }
  } catch (error) {
    console.error('에러발생:', error)
    throw error
  }
}

//구직 글 검색 및 전체조회
export const getJobPosts = async (lastId, order, keyword) => {
  try {
    const params = { lastId, order }
    if (keyword && keyword.trim() !== '') {
      params.keyword = keyword
    }

    const response = await publicApi.get('/job-seeking', {
      params,
    })
    const data = response.data.data

    const postsWithTag = (Array.isArray(data.jobSeekings) ? data.jobSeekings : []).map((post) => ({
      ...post,
      jobsearch1: true,
    }))

    return {
      ...data,
      jobSeekings: postsWithTag,
    }
  } catch (error) {
    console.error('getJobPosts 에러발생:', error)
    throw error
=======
import { publicApi } from '../../../../services/api/axios'
import { recruitmentSortOrder, seekingSortOrder } from '../../../job/common/utils/sortOrder'

// 구인 전체 글 조회 및 검색
export const getAllRecruitmentPosts = async (lastId, order, keyword) => {
  const apiOrder = recruitmentSortOrder[order] || order || 'LATEST'
  const params = {
    order: apiOrder,
    size: 6,
  }
  if (lastId !== undefined && lastId !== null) params.last = lastId
  if (keyword && keyword.trim() !== '') params.keyword = keyword

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

// 구직 전체 글 조회 및 검색
export const getJobPosts = async (lastId, order, keyword) => {
  const apiOrder = seekingSortOrder[order] || 'LATEST'
  console.log('getJobPosts order:', order, 'apiOrder:', apiOrder)
  const params = { order: apiOrder, size: 6 }
  if (lastId !== undefined && lastId !== null) params.last = lastId
  if (keyword && keyword.trim() !== '') params.keyword = keyword
  const response = await publicApi.get('/job-seeking', { params })
  const data = response.data.data
  return {
    jobSeekings: (data.jobSeekings || []).map((post) => ({
      ...post,
      jobsearch1: true,
    })),
    lastId: data.lastId,
>>>>>>> a002db00f5b234dc767012ea5df884703d65535c
  }
}

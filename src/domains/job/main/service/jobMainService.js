// 구인 전체 글 조회 및 검색
import { publicApi } from '../../../../services/api/axios'
export const getAllRecruitmentPosts = async (lastId, order, keyword) => {
  try {
    const params = {}
    if (lastId !== undefined && lastId !== null) params.last = lastId
    if (order !== undefined && order !== null) params.order = order
    if (keyword && keyword.trim() !== '') params.keyword = keyword

    console.log('[구인 API 요청] params:', params)

    const response = await publicApi.get('/job-posting', {
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('[구인 API 응답 전체]', response)

    const data = response.data.data
    console.log('[구인 API 응답 data]', data)

    const postsWithTag = (Array.isArray(data.jobPostings) ? data.jobPostings : []).map((post) => ({
      ...post,
      joboffer1: true,
      createdAtShort: post.createdAt ? post.createdAt.slice(0, 10) : '',
    }))

    console.log('[구인 API 최종 반환]', { ...data, jobPostings: postsWithTag })

    return {
      ...data,
      jobPostings: postsWithTag,
    }
  } catch (error) {
    console.error('[구인 API 에러메세지]:', error)
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
    console.log('[구직 API 요청] params:', params)

    const response = await publicApi.get('/job-seeking', {
      params,
    })

    console.log('[구직 API 응답 전체]', response)

    const data = response.data.data

    console.log('[구직 API 응답 data]', data)

    const postsWithTag = (Array.isArray(data.jobSeekings) ? data.jobSeekings : []).map((post) => ({
      ...post,
      jobsearch1: true,
    }))

    console.log('[구직 API 최종 반환]', { ...data, jobSeekings: postsWithTag })

    return {
      ...data,
      jobSeekings: postsWithTag,
    }
  } catch (error) {
    console.log('[구직 API 에러메세지]:', error)
    throw error
  }
}

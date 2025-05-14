// 구인 전체 글 조회 및 검색
import { publicApi } from '../../../../services/api/axios'

export const getAllRecruitmentPosts = async (lastId, order, keyword) => {
  console.log('getAllRecruitmentPosts 호출됨', lastId, order, keyword)
  try {
    const params = { last: lastId, order }
    if (keyword && keyword.trim() !== '') {
      params.keyword = keyword
    }

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
    console.error('에러메세지: ', error)
    throw error
  }
}

// 구직 전체 글 조회 및 검색
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
    console.log('에러메세지: ', error)
    throw error
  }
}

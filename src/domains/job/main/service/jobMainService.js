// 구인 전체 글 조회 및 검색
import { publicApi } from '../../../../services/api/Axios'
// 구인 전체 글 조회 및 검색
export const getAllRecruitmentPosts = async (lastId, order) => {
  try {
    const response = await publicApi.get('/job-posting', {
      params: { last: lastId, order },
    })
    const data = response.data.data

    const postsWithTag = data.jobSeekings.map((post) => ({
      ...post,
      joboffer1: true,
    }))

    return {
      ...data,
      jobSeekings: postsWithTag,
    }
  } catch (error) {
    console.error('에러메세지: ', error)
    throw error
  }
}

// 구직 전체 글 조회 및 검색
export const getJobPosts = async (lastId, order) => {
  try {
    const response = await publicApi.get('/job-seeking', {
      params: { lastId, order },
    })
    const data = response.data.data

    const postsWithTag = data.jobSeekings.map((post) => ({
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

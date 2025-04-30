// 구인 전체 글 조회 및 검색
import { publicApi } from '../../../../services/api/Axios'
export const getAllRecruitmentPosts = async (lastId, order) => {
  try {
    const response = await publicApi.get('/job-posting', {
      params: {
        last: lastId,
        order: order,
      },
    })
    return response.data.data
  } catch (error) {
    console.error('에러메세지: ', error)
    throw error
  }
}

// 구직 전체 글 조회 및 검색
export const getJobPosts = async (lastId, order) => {
  try {
    const response = await publicApi.get('/job-seeking', {
      params: {
        lastId: lastId,
        order: order,
      },
    })
    return response.data.data
  } catch (error) {
    console.log('에러메세지: ', error)
    throw error
  }
}

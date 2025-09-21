import { publicApi } from '../../../services/api/axios'

export const getFreeBest = async () => {
  try {
    const response = await publicApi.get('/boards/best')
    return response
  } catch (error) {
    console.error('자유 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}

export const getJobBest = async () => {
  try {
    const response = await publicApi.get('/job-posting/best')
    return response
  } catch (error) {
    console.error('구인 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}

export const getJobNewBest = async () => {
  try {
    const response = await publicApi.get('/job-posting', { params: { order: 'LATEST', size: 10 } })
    return response
  } catch (error) {
    console.error('구인 신규글 리스트 오류:', error)
    throw new Error(error)
  }
}

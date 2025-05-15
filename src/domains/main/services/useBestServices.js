import { authApi } from '../../../services/api/axios'

// 자유 베스트 리스트
export const getFreeBest = async () => {
  try {
    const response = await authApi.get('/boards/best', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('자유 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}
// 구인 베스트 리스트
export const getJobBest = async () => {
  try {
    const response = await authApi.get('/recruitments/bests', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('구인 베스트 리스트 오류:', error)
    throw new Error(error)
  }
}

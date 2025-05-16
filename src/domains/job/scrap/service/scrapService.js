import { authApi } from '../../../../services/api/axios'

//스크랩 생성
export const createScrap = async () => {
  const response = await authApi.post('/bookmarks')
  return response.data
}

//스크랩 취소
export const deleteScrap = async () => {
  const response = await authApi.delete(`bookmarks/${bookMarkId}`)
  return response.data
}

//스크랩 전체 조회
export const getAllScarp = async () => {
  const response = await authApi.get('/bookmarks')
  return response.data
}

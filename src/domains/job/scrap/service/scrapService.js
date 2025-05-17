import { authApi } from '../../../../services/api/axios'

//스크랩요청
export const createScrap = async ({ id, type }) => {
  const response = await authApi.post('/bookmarks', { relatedId: id, type })
  return response.data
}

//취소
export const deleteScrap = async (bookMarkId) => {
  const response = await authApi.delete(`/bookmarks/${bookMarkId}`)
  return response.data
}
//조회
export const getAllScrap = async () => {
  const response = await authApi.get('/bookmarks')
  return response.data.data.bookMarksResponses
}

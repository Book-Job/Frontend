import { authApi } from '../../../../services/api/axios'

export const createScrap = async ({ id, type }) => {
  const response = await authApi.post('/bookmarks', { relatedId: id, type })
  return response.data
}

export const deleteScrap = async (bookMarkId) => {
  const response = await authApi.delete(`/bookmarks/${bookMarkId}`)
  return response.data
}

export const getAllScrap = async () => {
  const response = await authApi.get('/bookmarks')
  return response.data.data.bookMarksResponses
}

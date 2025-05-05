import { authApi } from '../../../services/api/axios'

export const scrapJobPost = async ({ id, type }) => {
  const response = await authApi.post('/bookmarks', {
    id,
    type,
  })
  return response.data
} //북마크요청

export const deleteScrapJobPost = async (bookmarkId) => {
  const response = await authApi.delete(`/bookmarks/${bookmarkId}`)
  return response.data
} //북마크취소

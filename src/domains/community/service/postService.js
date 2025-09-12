import { publicApi, authApi } from '../../../services/api/axios'

export const getAllPosts = async ({
  last = null,
  size = 6,
  keyword = '',
  searchType = '',
} = {}) => {
  try {
    const params = { size }
    if (last !== null) params.last = last
    if (keyword.trim() !== '') params.keyword = keyword
    if (searchType) params.searchType = searchType

    const response = await publicApi.get('/boards', { params })
    return response.data.data
  } catch (error) {
    console.error('게시글 조회 실패', error)
    throw error
  }
}

export const createPost = async (postData) => {
  const response = await authApi.post('/boards', postData)
  return response.data
}

export const getDetailPost = async (id) => {
  const response = await authApi.get(`/boards/${id}`)
  return response.data.data
}

export const deletePost = async (id) => {
  const response = await authApi.delete(`/boards/${id}`)
  return response.data.data
}

export const editPost = async (id, data) => {
  try {
    const response = await authApi.patch(`boards/${id}`, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('게시글 수정 실패:', error)
    throw error
  }
}

export const toggleLike = async (boardId, active) => {
  try {
    const response = await authApi.put(`/boards/${boardId}/likes`, null, {
      params: { active },
    })
    return response.data
  } catch (error) {
    console.error('좋아요 토글 실패:', error)
    throw error
  }
}

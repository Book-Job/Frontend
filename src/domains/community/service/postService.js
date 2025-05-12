import { publicApi, authApi } from '../../../services/api/axios'

// 전체 글 조회
export const getAllPosts = async () => {
  const response = await publicApi.get('/boards')
  return response.data.data
}

// 글 작성
export const createPost = async (postData) => {
  const response = await authApi.post('/boards', postData)
  return response.data
}

// 글 상세 조회
export const getDetailPosts = async (id) => {
  const response = await publicApi.get(`/boards/${id}`)
  return response.data.data
}

// 글 검색
export const searchPosts = async ({ title, email }) => {
  const response = await publicApi.get('/boards', {
    params: { title, email },
  })
  return response.data
}

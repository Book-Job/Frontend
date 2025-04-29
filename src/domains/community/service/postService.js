import { publicApi } from '../../../services/api/Axios'

// 전체 글 조회
export const getAllPosts = async () => {
  const response = await publicApi.get('/boards')
  return response.data.data
}

// 글 작성(누구나 작성가능)
export const createPost = async (postData) => {
  const response = await publicApi.post('/boards', postData)
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

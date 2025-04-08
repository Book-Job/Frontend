import axios from 'axios'

//전체 글 조회
export const getAllPosts = async () => {
  const response = await axios.get('/api/v1/boards')
  return response.data.data
}

//글 작성
export const createPost = async (postData) => {
  const response = await axios.post('/api/v1/boards', postData)
  return response.data
}

//글 상세 조회
export const getDetailPosts = async (id) => {
  const response = await axios.get(`/api/v1/boards/${id}`)
  return response.data.data
}

// 글 검색(search-bar)
export const searchPosts = async ({ title, email }) => {
  const response = await axios.get('/api/v1/boards', {
    params: { title, email },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return response.data
}

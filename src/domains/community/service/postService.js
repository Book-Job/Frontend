import { publicApi, authApi } from '../../../services/api/axios'

// 전체 글 조회 & 검색
export const getAllPosts = async (keyword = '') => {
  try {
    const response = await publicApi.get('/boards', {
      params: { keyword },
    })
    return response.data.data
  } catch (error) {
    console.error('게시글 조회 실패', error)
    throw error
  }
}

// 글 작성
export const createPost = async (postData) => {
  const response = await authApi.post('/boards', postData)
  return response.data
}

// 글 상세 조회
export const getDetailPost = async (id) => {
  const response = await authApi.get(`/boards/${id}`)
  return response.data.data
}

//작성한 글 삭제
export const deletePost = async (id) => {
  const response = await authApi.delete(`/boards/${id}`)
  return response.data.data
}

//작성한 글 수정
export const editPost = async (id, text) => {
  try {
    const response = await authApi.patch(
      `boards/${id}`,
      {
        text,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('게시글 수정 실패:', error)
    throw error
  }
}

import { authApi } from '../../../services/api/axios'

export const postComment = async (boardId, { content, nickname }) => {
  const response = await authApi.post(`/boards/${boardId}/comments`, {
    content,
    nickname,
  })
  return response.data
}

export const getAllComment = async (boardId, lastComment = null) => {
  try {
    const url = lastComment
      ? `/boards/${boardId}/comments?lastComment=${lastComment}`
      : `/boards/${boardId}/comments`

    const response = await authApi.get(url)
    return response.data?.data || []
  } catch (error) {
    console.error('getAllComment 에러:', error)
    return []
  }
}

export const editCommentService = async (boardId, commentId, content) => {
  return authApi.patch(`/boards/${boardId}/comments/${commentId}`, {
    content,
  })
}

export const deleteCommentService = async (boardId, commentId) => {
  return authApi.delete(`/boards/${boardId}/comments/${commentId}`)
}

export const toggleCommentLike = async (boardId, commentId, active) => {
  try {
    const response = await authApi.put(`/boards/${boardId}/comments/${commentId}/likes`, null, {
      params: { active },
    })
    return response.data
  } catch (error) {
    console.error('댓글 좋아요 토글 실패:', error)
    throw error
  }
}

export const postReply = async (boardId, parentCommentId, { content, nickname }) => {
  const response = await authApi.post(`/boards/${boardId}/comments/${parentCommentId}`, {
    content,
    nickname,
  })
  return response.data
}

export const getReply = async (boardId, parentCommentId) => {
  const response = await authApi.get(`/boards/${boardId}/comments/${parentCommentId}`)
  console.log('대댓글 조회..', response.data)
  return response.data?.data || []
}

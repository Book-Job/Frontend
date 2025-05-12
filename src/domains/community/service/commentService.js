import { authApi } from '../../../services/api/axios'

//댓글 작성
export const postComment = async (boardId, { content, nickname }) => {
  const response = await authApi.post(`/boards/${boardId}/comments`, {
    content,
    nickname,
  })
  return response.data
}

// 댓글 목록 불러오기 서비스 함수
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

//댓글 수정

//댓글 삭제

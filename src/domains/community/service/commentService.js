import axios from 'axios'

export const postComment = async (boardId, { content, nickname, password }) => {
  const response = await axios.post(
    `/api/v1/boards/${boardId}/comment`,
    {
      content,
      nickname,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  // 응답은 { message, timestamp } 형태
  return response.data
}

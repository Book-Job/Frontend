import axios from 'axios'

export const createPost = async ({ title, text, nickname }) => {
  try {
    const response = await axios.post(
      '/api/v1/boards',
      {
        title,
        text,
        nickname,
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
    console.error('게시글 작성 실패:', error)
    throw error
  }
}

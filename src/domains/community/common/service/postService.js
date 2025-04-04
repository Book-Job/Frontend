import axios from 'axios'

export const getAllPosts = async (last, keyword) => {
  try {
    const response = await axios.get('/api/v1/boards', {
      params: {
        last,
        keyword,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    // boards와 lastBoardId 추출해서 리턴
    return {
      boards: response.data.data.boards,
      lastBoardId: response.data.data.lastBoardId,
    }
  } catch (error) {
    console.error('게시글 조회 실패:', error)
    throw error
  }
}

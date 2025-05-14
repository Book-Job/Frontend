import { authApi } from '../../../services/api/axios'

//내가 작성한 자유게시판 글글 불러오기
export const getMyFreeBoardData = async (token, page = 0, limit = 10) => {
  try {
    const response = await authApi.get('/boards/members', {
      params: {
        page, // 기본값 0
        limit, // 기본값 10
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data // API 응답 데이터만 반환
  } catch (error) {
    console.error('내가 작성한 자유게시판 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

//내가 작성한 구인 구직 게시판 글글 불러오기
export const getMyJobBoardData = async (token, page = 0, limit = 10) => {
  try {
    const response = await authApi.get('/recruitments/members', {
      params: {
        page, // 기본값 0
        limit, // 기본값 10
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data // API 응답 데이터만 반환
  } catch (error) {
    console.error('내가 작성한 자유게시판 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

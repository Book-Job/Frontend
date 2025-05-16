import { authApi } from '../../../services/api/axios'

//내가 작성한 자유게시판 글 불러오기
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
    return response.data
  } catch (error) {
    console.error('내가 작성한 자유게시판 오류 api:', error.response.data.message)
    throw new Error(
      error.response?.data?.message || '자유게시판 데이터를 불러오는 중 오류가 발생했습니다.',
    )
  }
}

//내가 작성한 구인 구직 게시판 글 불러오기
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
    return response.data
  } catch (error) {
    console.error('내가 작성한 구인구직 오류 api:', error.response.data.message)
    throw new Error(
      error.response?.data?.message || '구인구직 데이터를 불러오는 중 오류가 발생했습니다.',
    )
  }
}

//내가 작성한 자유게시판 글 삭제
export const deleteMyFreeBoardData = async (token, id) => {
  try {
    const response = await authApi.get(
      '/boards/members',
      {
        ids: { id },
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('자유글 삭제 오류 api:', error.response.data.message)
    throw new Error(error.response?.data?.message || '자유글 삭제 중 오류가 발생했습니다.')
  }
}
//내가 작성한 구인구직 게시판 글 삭제
export const deleteMyJobBoardData = async (token) => {
  try {
    const response = await authApi.get(
      '/recruitments/members',
      {
        deleteRequest: [
          {
            recruitmentId: 1,
            recruitmentCategory: 'JOB_POSTING',
          },
          {
            recruitmentId: 2,
            recruitmentCategory: 'JOB_SEEKING',
          },
        ],
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('구인구직글 삭제 오류 api:', error.response.data.message)
    throw new Error(error.response?.data?.message || '구인구직 삭제 중 오류가 발생했습니다.')
  }
}

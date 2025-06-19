import { authApi } from '../../../services/api/axios'

export const getMyFreeBoardData = async (page = 0, limit = 10) => {
  try {
    const response = await authApi.get('/boards/members', {
      params: {
        page,
        limit,
      },
    })
    return response.data
  } catch (error) {
    console.error('내가 작성한 자유게시판 오류 api:', error.response.data.message || error.message)
    throw new Error(
      error.response?.data?.message || '자유게시판 데이터를 불러오는 중 오류가 발생했습니다.',
    )
  }
}

export const getMyJobBoardData = async (page = 0, limit = 10) => {
  try {
    const response = await authApi.get('/recruitments/members', {
      params: {
        page,
        limit,
      },
    })
    return response.data
  } catch (error) {
    console.error('내가 작성한 구인구직 오류 api:', error.response.data.message || error.message)
    throw new Error(
      error.response?.data?.message || '구인구직 데이터를 불러오는 중 오류가 발생했습니다.',
    )
  }
}

export const deleteMyFreeBoardData = async (id) => {
  try {
    const response = await authApi.delete('/boards/members', {
      data: {
        ids: Array.isArray(id) ? id : [id],
      },
    })
    return response.data
  } catch (error) {
    console.error('자유글 삭제 오류 api:', error.response.data.message || error.message)
    throw new Error(error.response?.data?.message || '자유글 삭제 중 오류가 발생했습니다.')
  }
}

export const deleteMyJobBoardData = async (deleteRequest) => {
  try {
    const response = await authApi.delete('/recruitments/members', {
      data: {
        deleteRequest: Array.isArray(deleteRequest) ? deleteRequest : [deleteRequest],
      },
    })
    return response.data
  } catch (error) {
    console.error('구인구직글 삭제 오류 api:', error.response.data.message || error.message)
    throw new Error(error.response?.data?.message || '구인구직 삭제 중 오류가 발생했습니다.')
  }
}

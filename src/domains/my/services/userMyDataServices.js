import { authApi } from "../../../services/api/Axios"

//마이 데이터 불러오기 
export const getMyData = async (token) => {
  try {
    const response = await authApi.get('/members/mypage', {
      // params: { loginId: nowUserID },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('마이데이터 불러오기 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
import { authApi } from '../../../services/api/Axios'

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
//마이 프로필 데이터 불러오기
export const getMyProfileData = async (token) => {
  try {
    const response = await authApi.get('/members/detail', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('마이프로필 데이터 불러오기 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

//마이 프로필 닉네임 변경
export const patchNicknameCh = async (token, nickname) => {
  try {
    const response = await authApi.patch(
      '/members/nickname',
      { nickname: nickname }, //body
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('마이프로필 닉네임 변경경 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

import { authApi, publicApi } from '../../../services/api/axios'
// 로그인
export const postLoginData = async (data) => {
  try {
    const response = await authApi.post(
      '/auth/login',
      { loginId: data.userID, password: data.password },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('response:', response)
    return response
  } catch (error) {
    console.error('로그인 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
// 로그인 아웃
export const deleteLogout = async () => {
  try {
    const response = await publicApi.delete('/members/logout', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('response:', response)
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
// 카카오 로그인
export const postKakaoLogin = async (code) => {
  try {
    const response = await publicApi.post(
      '/oauth2/authorization/kakao',
      // {
      //   params: { code: code },
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      // },
      { code: code },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('카카오 로그인response:', response)
    return response
  } catch (error) {
    console.error('카카오 로그인 확인 중 오류:', error)
    throw new Error(error.response.data.message)
  }
}

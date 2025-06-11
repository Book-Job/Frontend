import { authApi } from '../../../services/api/axios'

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
    return response
  } catch (error) {
    console.error('로그인 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const postLogout = async () => {
  try {
    const response = await authApi.post('/auth/logout')
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    throw new Error(error)
  }
}

export const refreshAccessToken = async () => {
  try {
    const response = await authApi.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    console.log('refreshAccessToken 성공1')
    return response
  } catch (error) {
    console.error('11 토큰 갱신 오류:', error)
    throw error
  }
}

export const getSocialLogin = async () => {
  try {
    const response = await authApi.get('/auth/me')
    return response
  } catch (error) {
    console.error('소셜로그인 오류:', error)
    throw error
  }
}

import { authApi, publicApi } from '../../../services/api/axios'

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
    const response = await authApi.post(
      '/auth/logout',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    )
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const refreshAccessToken = async (accessToken) => {
  try {
    const response = await publicApi.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        withCredentials: true,
      },
    )
    const newAccessToken = response.headers['authorization']?.replace('Bearer ', '')
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken)

      return newAccessToken
    }
    throw new Error('새로운 액세스 토큰을 받지 못했습니다.')
  } catch (error) {
    console.error('토큰 갱신 오류:', error)
    throw error
  }
}

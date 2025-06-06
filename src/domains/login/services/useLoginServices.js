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
    console.log('로그아웃 성공1');
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
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

export const getSocialLogin = async () => {
  try {
    const response = await authApi.get('/auth/me')
    // if (response.data || response.data.message === 'success') {
    //   const { email, nickname, loginId } = response.data.data
    //   localStorage.setItem('email', email)
    //   localStorage.setItem('nickname', nickname)
    //   localStorage.setItem('loginId', loginId)
    // } else {
    //   throw new Error(response.data.error || '사용자 정보 요청 실패')
    // }
    console.log('소셜로그인 성공', response)
    return response
  } catch (error) {
    console.error('소셜로그인 오류:', error)
    throw error
  }
}

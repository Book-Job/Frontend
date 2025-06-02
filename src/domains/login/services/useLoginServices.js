import { authApi, publicApi } from '../../../services/api/Axios'

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
    return response
  } catch (error) {
    console.error('로그인 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
// 로그아웃
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
    console.log('로그아웃 response:', response)
    console.log('Request Config:', response.config) // 요청 설정 로깅
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    console.log('Error Config:', error.config) // 에러 발생 시 요청 설정 로깅
    throw new Error(error.response.data.message)
  }
}
//  토큰 갱신 API 호출
export const refreshAccessToken = async (accessToken) => {
  try {
    const response = await publicApi.post(
      '/auth/refresh',
      {}, // 본문이 필요하지 않으므로 빈 객체
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`, // 액세스 토큰 추가
        },
        withCredentials: true, // 쿠키(refresh_token) 전송
      },
    )
    const newAccessToken = response.headers['authorization']?.replace('Bearer ', '')
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken)
      console.log('새로운 accessToken 갱신')

      return newAccessToken
    }
    throw new Error('새로운 액세스 토큰을 받지 못했습니다.')
  } catch (error) {
    console.error('토큰 갱신 오류:', error)
    throw error
  }
}

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
    console.log('로그아웃 response:', response)
    return response
  } catch (error) {
    console.error('로그아웃 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
//  토큰 갱신 API 호출 
export const refreshAccessToken = async () => {
  try {
    const response = await publicApi.post('/auth/resfresh', {
      credentials: 'include', // 쿠키에 포함된 refreshToken을 자동으로 전송
    })
    if (!response.ok) throw new Error('토큰 갱신 실패')
    const data = await response.json()
    const newAccessToken = response.headers.get('Authorization')?.replace('Bearer ', '')
    if (newAccessToken) {
      localStorage.setItem('newAccessToken', newAccessToken)
      return newAccessToken
    }
    throw new Error('새로운 액세스 토큰을 받지 못했습니다.')
  } catch (error) {
    console.error('토큰 갱신 오류:', error)
    throw error
  }
}
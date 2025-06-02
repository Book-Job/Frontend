import { authApi } from '../../../services/api/axios'

export const getFindPW = async (ID) => {
  try {
    const response = await authApi.get('/auth/exist-id', {
      params: { loginId: ID },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('PW찾기 ID 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const postFindPWEmail = async (email) => {
  try {
    const response = await authApi.post(
      '/auth/email-verification/pw',
      { email: email },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('PW찾기 email인증 보냄 오류:', error)
    throw new Error(error.response.data.message)
  }
}

export const postTemPW = async ({ userEmail, code }) => {
  try {
    const response = await authApi.post(
      '/auth/email-verification/pw/temp',
      {
        email: userEmail,
        code: code,
        reason: '비밀번호 찾기',
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('PW찾기 email인증 보냄 오류:', error)
    throw new Error(error.response.data.message)
  }
}

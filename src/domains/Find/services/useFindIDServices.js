import { publicApi } from '../../../services/api/axios'

export const postFindIDEmail = async (fullEmail) => {
  if (!fullEmail || fullEmail.trim() === '') {
    throw new Error('이메일을 입력해주세요')
  }

  try {
    const response = await publicApi.post(
      '/auth/email-verification/id',
      { email: fullEmail },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error(
      '아이디 찾기 email 확인 중 오류 api:',
      error.response?.data?.message || error.message,
    )
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const postFindIDEmailCode = async ({ fullEmail, code }) => {
  try {
    const response = await publicApi.post(
      '/auth/email-verification/id/code',
      { email: fullEmail, code: code, reason: '아이디 찾기' },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('아이디 찾기 인증번호 확인 중 오류:', error)
    throw new Error(error)
  }
}

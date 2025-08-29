import { authApi } from '../../../services/api/axios'

export const getJoinCheckId = async (nowUserID) => {
  try {
    const response = await authApi.get('/auth/check-id', {
      params: { loginId: nowUserID },
    })
    return response
  } catch (error) {
    console.error('ID 중복 확인 중 오류 api:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const getJoinCheckNickname = async (nowUserNickname) => {
  try {
    const response = await authApi.get('/auth/check-nickname', {
      params: { nickname: nowUserNickname },
    })
    return response
  } catch (error) {
    console.error('Nickname 중복 확인 중 오류 api:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const postJoinCheckEmail = async (fullEmail) => {
  if (!fullEmail || fullEmail.trim() === '') {
    throw new Error('이메일을 입력해주세요')
  }

  try {
    const response = await authApi.post('/auth/emails', { email: fullEmail })
    return response
  } catch (error) {
    console.error('email 중복 확인 중 오류 api:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const postJoinCheckEmailNum = async ({ fullEmail, code }) => {
  try {
    const response = await authApi.post('/auth/emails/code', {
      email: fullEmail,
      code: code,
      reason: '회원가입',
    })
    return response
  } catch (error) {
    console.error('email 중복 확인 중 오류:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}

export const postJoinData = async (filteredData) => {
  try {
    const response = await authApi.post('/members/signup', {
      loginId: filteredData.userID,
      nickname: filteredData.Nickname,
      email: filteredData.email,
      password: filteredData.password,
    })

    return response
  } catch (error) {
    console.error('회원가입 중 오류:', error.message)
    throw new Error(
      error.response?.data?.message || error.message || '회원가입 중 오류가 발생했습니다.',
    )
  }
}

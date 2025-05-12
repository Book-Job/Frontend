import { authApi } from '../../../services/api/axios'

//가입 아이디 중복 확인인
export const getJoinCheckId = async (nowUserID) => {
  try {
    const response = await authApi.get('/auth/check-id', {
      params: { loginId: nowUserID },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('ID 중복 확인 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}
//가입 닉네임 중복 확인인
export const getJoinCheckNickname = async (nowUserNickname) => {
  try {
    const response = await authApi.get('/auth/check-nickname', {
      params: { nickname: nowUserNickname },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('Nickname 중복 확인 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

//가입 이메일 인증 요청
export const postJoinCheckEmail = async (fullEmail) => {
  if (!fullEmail || fullEmail.trim() === '') {
    throw new Error('이메일을 입력해주세요')
  }

  try {
    const response = await authApi.post(
      '/auth/emails',
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
    console.error('email 중복 확인 중 오류 api:', error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message) // 에러 메시지 전달
  }
}

//가입 이메일 인증 번호 확인
export const postJoinCheckEmailNum = async ({ fullEmail, code }) => {
  try {
    const response = await authApi.post(
      '/auth/emails/code',
      { email: fullEmail, code: code, reason: '회원가입' },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('email 중복 확인 중 오류:', error)
    throw new Error(error)
  }
}

//가입 데이터 확인
export const postJoinData = async (filteredData) => {
  console.error(
    'loginId:',
    filteredData.userID,
    'nickname:',
    filteredData.Nickname,
    'email:',
    filteredData.email,
    'password:',
    filteredData.password,
  )
  try {
    const response = await authApi.post(
      '/members/signup',
      {
        loginId: filteredData.userID,
        nickname: filteredData.Nickname,
        email: filteredData.email,
        password: filteredData.password,
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
    console.error('회원가입 중 오류:', error)
    throw new Error(error)
  }
}

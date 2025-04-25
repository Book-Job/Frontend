import { baseAip } from '../../../services/Axios'

//가입 아이디 중복 확인인
export const getJoinCheckId = async (nowUserID) => {
  try {
    const response = await baseAip.get('/auth/check-id', {
      params: { loginId: nowUserID },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('ID 중복 확인 중 오류:', error)
    throw new Error(error)
  }
}
//가입 닉네임 중복 확인인
export const getJoinCheckNickname = async (nowUserNickname) => {
  try {
    const response = await baseAip.get('/auth/check-nickname', {
      params: { nickname: nowUserNickname },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('Nickname 중복 확인 중 오류:', error)
    throw new Error(error)
  }
}
//가입 이메일 인증 요청
export const postJoinCheckEmail = async (fullEmail) => {
  try {
    const response = await baseAip.post('/auth/emails', {
      params: { email: fullEmail },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('email 중복 확인 중 오류:', error.response.data.message)
    throw new Error(error)
  }
}
//가입 이메일 인증 번호 확인
export const postJoinCheckEmailNum = async ({ nowUseremail, code, reason }) => {
  try {
    const response = await baseAip.post('/auth/emails', {
      params: { email: nowUseremail, code: code, reason: reason },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('email 중복 확인 중 오류:', error)
    throw new Error(error)
  }
}

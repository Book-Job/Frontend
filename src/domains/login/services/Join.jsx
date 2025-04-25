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

import { authApi } from '../../../services/api/Axios'

//비밀번호 찾기 아이디 존재여부 확인
export const getFindPW = async (ID) => {
  try {
    const response = await authApi.get('/auth/exist-id', {
      params: { loginId: ID },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log('PW찾기 ID 확인 중 응답:', response)
    return response
  } catch (error) {
    console.error('PW찾기 ID 확인 중 오류:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

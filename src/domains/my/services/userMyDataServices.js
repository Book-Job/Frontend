import { authApi, publicApi } from '../../../services/api/axios'

export const getMyData = async () => {
  try {
    const response = await authApi.get('/members/mypage', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('마이데이터 불러오기 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const getMyProfileData = async () => {
  try {
    const response = await authApi.get('/members/detail', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error('마이프로필 데이터 불러오기 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const patchNicknameCh = async (nickname) => {
  try {
    const response = await authApi.patch(
      '/members/nickname',
      { nickname: nickname },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('마이프로필 닉네임 변경 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const postPWCheck = async (PW) => {
  try {
    const response = await authApi.post(
      '/members/password',
      { password: PW },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('회원 PW 확인 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const deleteMember = async (PW) => {
  try {
    const response = await authApi.delete(
      '/members',

      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: { password: PW },
      },
    )
    return response
  } catch (error) {
    console.error('회원 탈퇴중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

export const postNewPW = async (PW, resetToken) => {
  try {
    const response = await publicApi.post(
      '/members/password/change',
      { password: PW, resetToken: resetToken },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  } catch (error) {
    console.error('회원 pw변경 중 오류 api:', error.response.data.message)
    throw new Error(error.response.data.message)
  }
}

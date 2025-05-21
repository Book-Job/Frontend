import { create } from 'zustand'
import ROUTER_PATHS from '../../routes/RouterPath'
import { deleteLogout, postLoginData } from './../../domains/login/services/useLoginServices'

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('JWT 파싱 오류:', error)
    return null
  }
}

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  resetToken: null,

  initialize: () => {
    const token = localStorage.getItem('accessToken')
    const resetToken = sessionStorage.getItem('resetToken')
    if (token) {
      const decoded = parseJwt(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        set({ user: decoded, isAuthenticated: true, accessToken: token, resetToken })
      } else {
        set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
        localStorage.removeItem('accessToken')
        sessionStorage.removeItem('resetToken')
      }
    } else {
      set({ resetToken }) // accessToken 없어도 resetToken 유지
    }
  },

  // resetToken 설정
  setResetToken: (token) => {
    sessionStorage.setItem('resetToken', token) // sessionStorage 동기화
    set({ resetToken: token })
  },

  // resetToken 제거
  clearResetToken: () => {
    sessionStorage.removeItem('resetToken')
    set({ resetToken: null })
  },

  // resetToken 필요 여부 확인
  requireResetToken: async (navigate) => {
    const state = useAuthStore.getState()
    const resetToken = state.resetToken
    if (!resetToken) {
      alert('비밀번호 확인이 필요합니다.')
      navigate(ROUTER_PATHS.MY_EDIT_PW)
      return false
    }
  },

  //로그인을 해야지 접근 가능하게 하는 로직
  requireLogin: (navigate) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인 후 이용 가능합니다.')
      navigate(ROUTER_PATHS.LOGIN_MAIN)
    }
  },

  // 로그인 액션
  login: async (loginData) => {
    try {
      const response = await postLoginData(loginData)
      if (response.data && response.data.message === 'success') {
        console.log('response22:', response.data.data.nickname)
        const accessToken = response.headers['authorization']?.replace('Bearer ', '')
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          set({
            user: { nickname: response.data.data.nickname },
            isAuthenticated: true,
          })
        } else {
          throw new Error('액세스 토큰을 받지 못했습니다.')
        }
      } else {
        throw new Error(response.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('로그인 실패:', error)
      throw error
    }
  },

  updateNickname: (nickname, newAccessToken = null) => {
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken)
    }
    set((state) => ({
      user: { ...state.user, nickname },
      accessToken: newAccessToken || state.accessToken,
    }))
  },

  logout: async () => {
    localStorage.removeItem('accessToken')
    sessionStorage.removeItem('resetToken')
    set({ user: null, isAuthenticated: false, accessToken: null })
    window.location.href = ROUTER_PATHS.MAIN_PAGE
    // try {
    //   const response = await deleteLogout()
    //   response.data && response.data.message === 'success'
    //   localStorage.removeItem('accessToken')
    //   sessionStorage.removeItem('resetToken')
    //   set({ user: null, isAuthenticated: false, accessToken: null })
    //   window.location.href = ROUTER_PATHS.MAIN_PAGE
    // } catch (error) {
    //   console.error('로그아웃 실패:', error)
    //   throw error
    // }
  },
}))

export default useAuthStore

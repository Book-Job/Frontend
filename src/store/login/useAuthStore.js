import { create } from 'zustand'
import ROUTER_PATHS from '../../routes/RouterPath'
import {
  getSocialLogin,
  postLoginData,
  postLogout,
  refreshAccessToken,
} from './../../domains/login/services/useLoginServices'

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  accessToken: null,
  resetToken: null,
  justSignedUp: false,
  setJustSignedUp: (value) => set({ justSignedUp: value }),

  initialize: async () => {
    const token = localStorage.getItem('Authorization')
    const resetToken = sessionStorage.getItem('resetToken')
    if (token) {
      try {
        const response = await refreshAccessToken()
        if (response.data?.message === 'success') {
          const userResponse = await getSocialLogin()
          if (userResponse.data?.message === 'success') {
            set({
              user: {
                nickname: userResponse.data.data.nickname,
                email: userResponse.data.data.email,
                loginId: userResponse.data.data.loginId,
                provider: userResponse.data.data.provider,
              },
              isAuthenticated: true,
              accessToken: token,
              resetToken,
              justSignedUp: true,
            })
          } else {
            throw new Error('사용자 정보 가져오기 실패')
          }
        } else {
          throw new Error('토큰 검증 실패')
        }
      } catch (error) {
        console.error('initialize 토큰 검증 오류:', error)
        localStorage.removeItem('Authorization')
        sessionStorage.removeItem('resetToken')
        set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
      }
    } else {
      set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
    }
  },

  setResetToken: (token) => {
    sessionStorage.setItem('resetToken', token)
    set({ resetToken: token })
  },

  clearResetToken: () => {
    sessionStorage.removeItem('resetToken')
    set({ resetToken: null })
  },

  requireResetToken: async (navigate) => {
    const state = useAuthStore.getState()
    const resetToken = state.resetToken
    const accessToken = localStorage.getItem('Authorization')
    if (!resetToken && !accessToken) {
      navigate(ROUTER_PATHS.LOGIN_MAIN)
      return false
    } else if (!resetToken && accessToken) {
      navigate(ROUTER_PATHS.MY_EDIT_PW)
      return false
    }
    return true
  },

  requireLogin: async (navigate) => {
    const token = localStorage.getItem('Authorization')
    if (!token) {
      navigate(ROUTER_PATHS.LOGIN_MAIN)
      return false
    }
    try {
      const newAccessToken = await refreshAccessToken()
      set({ isAuthenticated: true, accessToken: newAccessToken })
      return true
    } catch (error) {
      localStorage.removeItem('Authorization')
      sessionStorage.removeItem('resetToken')
      console.error('requireLogin 로그인 확인 오류 :', error)
      set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
      navigate(ROUTER_PATHS.LOGIN_MAIN)
      return false
    }
  },

  login: async (loginData) => {
    try {
      const response = await postLoginData(loginData)
      if (response.data && response.data.message === 'success') {
        const accessToken = response.headers['authorization']
        if (accessToken) {
          localStorage.setItem('Authorization', accessToken)
          set({
            user: {
              nickname: response.data.data.nickname,
              email: response.data.data.email,
              loginId: response.data.data.loginId,
              provider: response.data.data.provider,
            },
            isAuthenticated: true,
            accessToken,
          })
        } else {
          throw new Error('액세스 토큰을 받지 못했습니다.')
        }
      } else {
        throw new Error(response.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.')
      }
    } catch (error) {
      console.error('일반 로그인 실패 :', error)
      throw error
    }
  },

  socialLogin: async () => {
    try {
      const response = await getSocialLogin()
      if (response.data && response.data.message === 'success') {
        const accessToken = response.headers['authorization']
        if (accessToken) {
          localStorage.setItem('Authorization', accessToken)
          set({
            user: {
              nickname: response.data.data.nickname,
              email: response.data.data.email,
              loginId: response.data.data.loginId,
              provider: response.data.data.provider,
            },
            isAuthenticated: true,
            accessToken,
          })
        } else {
          throw new Error('액세스 토큰을 받지 못했습니다.1')
        }
      } else {
        throw new Error(response.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.')
      }
      return response
    } catch (error) {
      console.error('소셜 로그인 실패:', error)
      throw error
    }
  },

  updateNickname: (nickname, newAccessToken = null) => {
    if (newAccessToken) {
      localStorage.setItem('Authorization', newAccessToken)
    }
    set((state) => ({
      user: { ...state.user, nickname },
      accessToken: newAccessToken || state.accessToken,
    }))
  },

  logout: async () => {
    try {
      const response = await postLogout()
      response.data && response.data.message === 'success'
      localStorage.removeItem('Authorization')
      sessionStorage.removeItem('resetToken')
      set({ user: null, isAuthenticated: false, accessToken: null })
      window.location.href = ROUTER_PATHS.MAIN_PAGE
    } catch (error) {
      console.error('로그아웃 실패:', error)
      throw error
    }
  },
}))

export default useAuthStore

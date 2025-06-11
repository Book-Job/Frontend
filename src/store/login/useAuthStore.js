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

  initialize: async () => {
    const token = localStorage.getItem('Authorization')
    const resetToken = sessionStorage.getItem('resetToken')
    console.log('ggg1', token)
    if (token) {
      try {
        const response = await refreshAccessToken()
        console.log('ggg2', response)
        if (response.data?.message === 'success') {
          set({
            user: { nickname: response.data.data.nickname,
              email: response.data.data.email,
              loginId: response.data.data.loginId,},
            isAuthenticated: true,
            accessToken: token,
            resetToken,
          })
        } else {
          throw new Error('토큰 검증 실패')
        }
      } catch (error) {
        console.log('ggg3', error)
        console.error('initialize 토큰 검증 오류:', error)
        localStorage.removeItem('Authorization')
        sessionStorage.removeItem('resetToken')
        set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
      }
    } else {
      console.log('ggg4', '토큰이 없습니다. 초기 상태로 설정합니다.')
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
      console.error('로그인 실패:', error)
      throw error
    }
  },
  //엑세스 토큰을 받는 api에서 만료되면 401을 반환 그때 리프레시 기능 넣기
  socialLogin: async () => {
    try {
      const response = await getSocialLogin()
      console.log('소셜 로그인 정보', response)
      if (response.data || response.data.message === 'success') {
        const accessToken = response.headers['Authorization']
        if (accessToken) {
          localStorage.setItem('Authorization', accessToken)
          set({
            user: {
              nickname: response.data.data.nickname,
              email: response.data.data.email,
              loginId: response.data.data.loginId,
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
      return response
    } catch (error) {
      console.error('로그인 실패:', error)
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

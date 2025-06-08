import { create } from 'zustand'
import ROUTER_PATHS from '../../routes/RouterPath'
import {
  getSocialLogin,
  postLoginData,
  postLogout,
  refreshAccessToken,
} from './../../domains/login/services/useLoginServices'

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

  initialize: async () => {
    const token = localStorage.getItem('accessToken')
    const resetToken = sessionStorage.getItem('resetToken')
    if (token) {
      const decoded = parseJwt(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        set({ user: decoded, isAuthenticated: true, accessToken: token, resetToken })
      } else {
        try {
          const newAccessToken = await refreshAccessToken()
          const newDecoded = parseJwt(newAccessToken)
          set({ user: newDecoded, isAuthenticated: true, accessToken: newAccessToken, resetToken })
        } catch (error) {
          localStorage.removeItem('accessToken')
          sessionStorage.removeItem('resetToken')
          console.error('initialize 토큰 확인 오류 :', error)
          set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
        }
      }
    } else {
      set({ resetToken })
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
    const accessToken = localStorage.getItem('accessToken')
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
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate(ROUTER_PATHS.LOGIN_MAIN)
      return false
    }
    const decoded = parseJwt(token)
    if (decoded && decoded.exp * 1000 < Date.now()) {
      try {
        const newAccessToken = await refreshAccessToken(token)
        const newDecoded = parseJwt(newAccessToken)
        set({ user: newDecoded, isAuthenticated: true, accessToken: newAccessToken })
        return true
      } catch (error) {
        localStorage.removeItem('accessToken')
        sessionStorage.removeItem('resetToken')
        console.error('requireLogin 로그인 확인 오류 :', error)
        set({ user: null, isAuthenticated: false, accessToken: null, resetToken: null })
        navigate(ROUTER_PATHS.LOGIN_MAIN)
        return false
      }
    }
    return true
  },

  login: async (loginData) => {
    try {
      const response = await postLoginData(loginData)
      console.log('로그인 정보', response)
      if (response.data && response.data.message === 'success') {
        const accessToken = response.headers['authorization']?.replace('Bearer ', '')
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          set({
            user: { nickname: response.data.data.nickname },
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

  socialLogin: async () => {
    try {
      const response = await getSocialLogin()
      console.log('소셜 로그인 정보', response)
      if (response.data && response.data.message === 'success') {
        const accessToken = response.headers['authorization']?.replace('Bearer ', '')
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          set({
            user: { nickname: response.data.data.nickname },
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
    try {
      const response = await postLogout()
      response.data && response.data.message === 'success'
      console.log('로그아웃 성공:', response)
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('resetToken')
      set({ user: null, isAuthenticated: false, accessToken: null })
      window.location.href = ROUTER_PATHS.MAIN_PAGE
    } catch (error) {
      console.error('로그아웃 실패:', error)
      // localStorage.removeItem('accessToken')
      // sessionStorage.removeItem('resetToken')
      // set({ user: null, isAuthenticated: false, accessToken: null })
      // window.location.href = ROUTER_PATHS.MAIN_PAGE
      throw error
    }
  },
}))

export default useAuthStore

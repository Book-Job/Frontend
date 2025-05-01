import { create } from 'zustand'
import ROUTER_PATHS from '../../routes/RouterPath'

const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
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

  initialize: () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decoded = parseJwt(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        set({ user: decoded, isAuthenticated: true, accessToken: token })
      } else {
        set({ user: null, isAuthenticated: false, accessToken: null })
        localStorage.removeItem('accessToken')
        localStorage.removeItem('saveLoginID')
      }
    }
  },

  login: (accessToken) => {
    const decoded = parseJwt(accessToken)
    if (decoded) {
      localStorage.setItem('accessToken', accessToken)
      set({ user: decoded, isAuthenticated: true, accessToken })
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('saveLoginID')
    set({ user: null, isAuthenticated: false, accessToken: null })
    window.location.href = ROUTER_PATHS.LOGIN
  },
}))

export default useAuthStore

import { create } from 'zustand'
import ROUTER_PATHS from '../../routes/RouterPath'
import { postLoginData } from '../../domains/login/services/userLoginServices'

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

  initialize: () => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decoded = parseJwt(token)
      if (decoded && decoded.exp * 1000 > Date.now()) {
        set({ user: decoded, isAuthenticated: true, accessToken: token })
      } else {
        set({ user: null, isAuthenticated: false, accessToken: null })
        localStorage.removeItem('accessToken')
        // localStorage.removeItem('saveLoginID')
      }
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
        const accessToken = response.headers['authorization']?.replace('Bearer ', '')
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
          // 사용자 정보와 인증 상태 업데이트
          set({
            user: { sub: loginData.userID }, // 서버에서 반환된 사용자 정보를 사용하거나 userID로 임시 설정
            isAuthenticated: true,
          })
        }
      }
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken')
    set({ user: null, isAuthenticated: false, accessToken: null })
    window.location.href = ROUTER_PATHS.LOGIN
  },
}))

export default useAuthStore

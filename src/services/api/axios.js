import axios from 'axios'
import { refreshAccessToken } from '../../domains/login/services/useLoginServices'

export const authApi = axios.create({
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: true,
})

// authApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('Authorization')
//     if (token) {
//       config.headers['Authorization'] = `${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

export const publicApi = axios.create({
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: false,
})


// 리프레시 토큰 요청 중인지 추적
let isRefreshing = false
// 대기 중인 요청들을 저장하는 큐
let failedQueue = []

// 큐에 있는 요청들을 처리하는 함수
const processQueue = (error, token = null) => {
  console.log('토큰 갱신 있음 1');
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

// 요청 인터셉터: 모든 요청에 Authorization 헤더 추가
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터: 401 에러 처리 및 리프레시 토큰 로직
authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
console.log('토큰 갱신 시작');

    if (
      error.response &&
      error.response.status === 401 &&
      (error.response.data.code === 'TOKEN_EXPIRED' || error.response.data.message === '만료된 토큰입니다.') &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `${token}`
            return authApi(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const newAccessToken = await refreshAccessToken()
        console.log('토큰 갱신 성공 2',newAccessToken.headers['Authorization']);
        console.log('토큰 갱신 성공 3',newAccessToken);
        // newAccessToken.headers['Authorization'] = 
        authApi.defaults.headers['Authorization'] = `${newAccessToken}`
        localStorage.setItem('Authorization', newAccessToken)
        originalRequest.headers['Authorization'] = `${newAccessToken}`
        processQueue(null, newAccessToken)
        return authApi(originalRequest)
      } catch (refreshError) {
        console.error('토큰 갱신 실패');
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)
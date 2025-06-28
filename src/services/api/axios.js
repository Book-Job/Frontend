import axios from 'axios'
import { refreshAccessToken } from '../../domains/login/services/useLoginServices'

export const authApi = axios.create({
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: true,
})

export const publicApi = axios.create({
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: false,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Authorization')
    if (token) {
      config.headers['Authorization'] = token
    }
    // console.log('Sending request:', config.url)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === '만료된 토큰입니다.' &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = token
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
        const token = newAccessToken.headers['authorization']
        localStorage.setItem('Authorization', token)
        authApi.defaults.headers['Authorization'] = token
        originalRequest.headers['Authorization'] = token
        console.log('Queue length:', failedQueue.length)
        processQueue(null, token)
        console.log('Retrying request:', originalRequest.url)
        return authApi(originalRequest)
      } catch (refreshError) {
        console.error('토큰 갱신 실패')
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

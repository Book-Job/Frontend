import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'http://43.200.107.80:8080/api/v1',
  withCredentials: true,
})

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export const publicApi = axios.create({
  baseURL: 'http://43.200.107.80:8080/api/v1',
  withCredentials: false,
})

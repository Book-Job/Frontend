import axios from 'axios'

export const authApi = axios.create({
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: true,
})
// export const authApi = axios.create({
//   baseURL: 'https://api.bookjob.co.kr/api/v1',
//   withCredentials: false, // JSESSIONID 포함
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });
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
  baseURL: 'https://api.bookjob.co.kr/api/v1',
  withCredentials: false,
})

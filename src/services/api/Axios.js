import axios from 'axios'

//axiosInstance 설정
//auth랑 public이랑 따로 만들었어요 !

// withCredentials true용
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

// withCredentials false용
export const publicApi = axios.create({
  baseURL: 'http://43.200.107.80:8080/api/v1',
  withCredentials: false,
})

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../../../services/api/axios'
import ToastService from '../../../utils/toastService'

const NaverSuccess = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      console.log('네이버 실행 0')
      try {
        const response = await authApi.get('/auth/me')
        console.log('네이버 성공1')
        if (response.data.success) {
          const { email, nickname, loginId } = response.data
          localStorage.setItem('email', email)
          localStorage.setItem('nickname', nickname)
          localStorage.setItem('loginId', loginId)
          ToastService.success('네이버 로그인 성공!')
          console.log('네이버 성공2')
          navigate('/')
        } else {
          console.log('네이버 성공3')
          throw new Error(response.data.error || '사용자 정보 요청 실패')
        }
      } catch (error) {
        console.error('네이버 요청 오류:', error)
      }
    }

    fetchUserData()
  }, [])

  return <div>네이버 로그인 처리 중...</div>
}

export default NaverSuccess

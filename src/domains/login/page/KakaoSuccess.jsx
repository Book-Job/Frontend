import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ToastService from '../../../utils/toastService'

const KakaoSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)

    const message = queryParams.get('message')
    const dataParam = queryParams.get('data')

    if (message === 'success' && dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam))

        const { email, nickname, loginId } = data
        localStorage.setItem('loginId', loginId)
        localStorage.setItem('email', email)
        localStorage.setItem('nickname', nickname)

        ToastService.success('카카오 로그인 성공!')
        navigate('/')
      } catch (error) {
        console.error('데이터 파싱 오류:', error)
        ToastService.error('로그인 데이터 처리 중 오류가 발생했습니다.')
        navigate('/login-main')
      }
    } else if (message === 'error' || !message) {
      const errorMsg = queryParams.get('error') || '알 수 없는 오류'
      console.error('로그인 실패:', errorMsg)
      ToastService.error(`로그인 실패: ${errorMsg}`)
      navigate('/login-main')
    }
  }, [location, navigate])

  return <div>카카오 로그인 처리 중...</div>
}

export default KakaoSuccess

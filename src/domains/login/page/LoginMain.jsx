import LoginForm from './../common/components/LoginForm'
import SnsLogin from './../common/components/SnsLogin'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { postKakaoLogin } from '../services/useLoginServices'
import ROUTER_PATHS from '../../../routes/RouterPath'
import ToastService from '../../../utils/toastService'
const LoginMain = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      const handleAuth = async () => {
        try {
          const response = await postKakaoLogin(code)
          if (response) {
            console.log('카카오 로그인 성공:', response)
            // localStorage.setItem('token', response.data.token)
            // 토큰 유효성 검증
            if (response.data?.token && typeof response.data.token === 'string') {
              localStorage.setItem('token', response.data.token)
              // 사용자 정보도 함께 저장 (필요한 경우)
              if (response.data.user) {
                localStorage.setItem('user', JSON.stringify(response.data.user))
              }
            } else {
              throw new Error('유효하지 않은 토큰입니다.')
            }
          }
        } catch (error) {
          console.error('카카오 로그인 에러:', error)
          ToastService.error('로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.')
          navigate(ROUTER_PATHS.LOGIN_MAIN)
        }
        navigate(ROUTER_PATHS.MAIN_PAGE)
      }
      handleAuth()
    }
  }, [navigate])
  return (
    <div className='items-center h-full '>
      <LoginForm />
      <SnsLogin />
    </div>
  )
}

export default LoginMain

import LoginForm from './../common/components/LoginForm'
import SnsLogin from './../common/components/SnsLogin'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { postKakaoLogin } from '../services/useLoginServices'
import ROUTER_PATHS from '../../../routes/RouterPath'
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
            console.log('카카오 로그인 성공공:', response)
            localStorage.setItem('token', response.data.token)
          }
        } catch (error) {
          console.error('카카오 로그인 에러:', error)
        }
        navigate(ROUTER_PATHS.LOGIN_MAIN)
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

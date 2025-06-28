import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastService from '../../../services/toast/ToastService'
import ROUTER_PATHS from '../../../routes/RouterPath'
import Spinner from '../../../components/web/Spinner'
import useAuthStore from '../../../store/login/useAuthStore'
import confetti from 'canvas-confetti'

const KakaoSuccess = () => {
  const { socialLogin } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await socialLogin()
        if (response.data && response.data.message === 'success') {
          ToastService.success('카카오 계정으로 로그인되었습니다.')
          confetti({
            particleCount: 200,
            spread: 360,
            origin: { x: 0.2, y: 0.7 },
          })
          navigate(ROUTER_PATHS.MAIN_PAGE)
        } else {
          throw new Error(response.data.error || '사용자 정보 요청 실패')
        }
      } catch (error) {
        console.error('카카오 요청 오류:', error)
      }
    }
    fetchUserData()
  }, [])

  return (
    <div className='flex flex-col'>
      카카오 로그인 처리 중...
      <Spinner size={48} color='main-pink' />
    </div>
  )
}

export default KakaoSuccess

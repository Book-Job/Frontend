import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ToastService from '../../../services/toast/ToastService'
import ROUTER_PATHS from '../../../routes/RouterPath'
import Spinner from '../../../components/web/Spinner'
import useAuthStore from '../../../store/login/useAuthStore'
import { fireCelebrationConfetti } from '../../../constants/animations'

const KakaoSuccess = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { socialLogin, justSignedUp, setJustSignedUp } = useAuthStore()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('isNew') === 'true') {
      setJustSignedUp(true)
    }

    const fetchUserData = async () => {
      try {
        const response = await socialLogin()
        if (response.data && response.data.message === 'success') {
          ToastService.success('카카오 계정으로 로그인되었습니다.')

          if (justSignedUp) {
            fireCelebrationConfetti()
            setJustSignedUp(false)
          }

          navigate(ROUTER_PATHS.MAIN_PAGE)
        } else {
          throw new Error(response.data.error || '사용자 정보 요청 실패')
        }
      } catch (error) {
        console.error('카카오 요청 오류:', error)
      }
    }
    fetchUserData()
  }, [location, justSignedUp, navigate, socialLogin, setJustSignedUp])

  return (
    <div className='flex flex-col'>
      <p className='text-lg text-dark-gray'>카카오 계정으로 로그인 중입니다...</p>
      <div className='flex justify-center w-full mt-10'>
        <Spinner size={48} color='main-pink' />
      </div>
    </div>
  )
}

export default KakaoSuccess

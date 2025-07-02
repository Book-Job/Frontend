import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastService from '../../../services/toast/ToastService'
import Spinner from '../../../components/web/Spinner'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useAuthStore from '../../../store/login/useAuthStore'
import { fireCelebrationConfetti } from '../../../constants/animations'

const NaverSuccess = () => {
  const { socialLogin, justSignedUp, setJustSignedUp } = useAuthStore()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await socialLogin()
        if (response.data && response.data.message === 'success') {
          ToastService.success('네이버 계정으로 로그인되었습니다.')
          if (justSignedUp) {
            fireCelebrationConfetti()
            setJustSignedUp(false)
          }
          navigate(ROUTER_PATHS.MAIN_PAGE)
        } else {
          throw new Error(response.data.error || '사용자 정보 요청 실패')
        }
      } catch (error) {
        console.error('네이버 요청 오류:', error)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className='flex flex-col'>
      <p className='text-lg text-dark-gray'>네이버 계정으로 로그인 중입니다...</p>
      <div className='flex justify-center w-full mt-10'>
        <Spinner size={48} color='main-pink' />
      </div>
    </div>
  )
}

export default NaverSuccess

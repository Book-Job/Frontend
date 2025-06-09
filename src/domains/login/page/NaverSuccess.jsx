import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ToastService from '../../../utils/toastService'
import Spinner from '../../../components/web/Spinner'
import { getSocialLogin } from '../services/useLoginServices'
import ROUTER_PATHS from '../../../routes/RouterPath'

const NaverSuccess = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getSocialLogin()
        if (response.data && response.data.message === 'success') {
          ToastService.success('네이버 로그인 성공!')
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
      <span>네이버 로그인 처리 중...</span>
      <Spinner size={48} color='main-pink' />
    </div>
  )
}

export default NaverSuccess

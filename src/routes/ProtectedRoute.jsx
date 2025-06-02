import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/login/useAuthStore'
import ROUTER_PATHS from './RouterPath'
import useModalStore from '../store/modal/useModalStore'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const { openModal, closeModal } = useModalStore()

  useEffect(() => {
    if (!isAuthenticated) {
      openModal({
        title: '로그인이 필요합니다',
        description: '로그인이 필요한 페이지입니다.\n로그인 페이지로 이동하시겠습니까?',
        buttonLabel: '로그인하기',
        onButtonClick: () => {
          navigate(ROUTER_PATHS.LOGIN_MAIN, { replace: true })
        },
      })
    } else {
      closeModal()
    }
  }, [isAuthenticated, navigate, openModal, closeModal])

  return isAuthenticated ? children : null
}

export default ProtectedRoute

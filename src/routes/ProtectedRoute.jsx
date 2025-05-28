import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/login/useAuthStore'
import ROUTER_PATHS from './RouterPath'
import Alert from '../components/web/Alert'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [showAlert, setShowAlert] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAlert(true)
    } else {
      setChecked(true)
    }
  }, [isAuthenticated])

  const handleAlertClose = () => {
    setShowAlert(false)
    setChecked(true)
  }

  const handleAlertAction = () => {
    navigate(ROUTER_PATHS.LOGIN_MAIN, { replace: true })
  }

  if (!checked && !showAlert) return null

  return (
    <>
      {isAuthenticated ? children : null}
      <Alert
        isOpen={showAlert}
        onClose={handleAlertClose}
        title='로그인이 필요합니다'
        description='로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?'
        buttonLabel='로그인하기'
        onButtonClick={handleAlertAction}
      />
    </>
  )
}

export default ProtectedRoute

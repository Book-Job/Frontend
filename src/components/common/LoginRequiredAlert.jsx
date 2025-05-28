import { useNavigate } from 'react-router-dom'
import Alert from '../web/Alert'
import ROUTER_PATHS from '../../routes/RouterPath'

const LoginRequiredAlert = ({ isOpen, onClose }) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    onClose()
    navigate(ROUTER_PATHS.LOGIN_MAIN, { replace: true })
  }

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      title='로그인이 필요합니다'
      description='로그인이 필요한 기능입니다. 로그인 페이지로 이동하시겠습니까?'
      buttonLabel='로그인하기'
      onButtonClick={handleLogin}
    />
  )
}

export default LoginRequiredAlert

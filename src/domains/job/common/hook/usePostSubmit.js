import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import ToastService from '../../../../utils/toastService'

export const usePostSubmit = (createPostFn) => {
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    try {
      await createPostFn(formData)
      ToastService.success('등록이 완료되었습니다!')
      navigate(ROUTER_PATHS.JOB_MAIN)
    } catch (error) {
      ToastService.error('등록 중 오류가 발생했습니다.')
      console.error(error)
    }
  }

  return handleSubmit
}

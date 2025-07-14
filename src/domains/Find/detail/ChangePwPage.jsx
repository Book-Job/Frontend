import { useForm } from 'react-hook-form'
import PageBox from '../common/components/PageBox'
import PageTitle from '../common/components/PageTitle'
import Button from '../../../components/web/Button'
import NewPasswordInput from '../common/components/NewPasswordInput'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useAuthStore from '../../../store/login/useAuthStore'
import { postNewPW } from '../../my/services/userMyDataServices'
import ToastService from '../../../services/toast/ToastService'
import useIsMobile from '../../../hooks/header/useIsMobile'

const ChangePwPage = () => {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { resetToken, requireResetToken, clearResetToken } = useAuthStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const newPassword = watch('newPassword')
  const passwordCheck = watch('passwordCheck')

  useEffect(() => {
    const validatePasswords = async () => {
      if (newPassword && passwordCheck) {
        const isValid =
          newPassword === passwordCheck && !errors.newPassword && !errors.passwordCheck
        setIsSuccess(isValid)
      } else {
        setIsSuccess(false)
      }
    }
    validatePasswords()
  }, [newPassword, passwordCheck, errors.newPassword, errors.passwordCheck])

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await requireResetToken(navigate)
      if (!isValid) {
        ToastService.info('비밀번호 확인이 필요합니다.')
      }
    }
    checkToken()
  }, [requireResetToken, navigate])

  const onSubmit = async (data) => {
    setIsLoading(true)
    const { ...filteredData } = data
    const newPW = filteredData.newPassword
    try {
      const response = await postNewPW(newPW, resetToken)
      if (response.data && response.data.message === 'success') {
        navigate(ROUTER_PATHS.MAIN_PAGE)
        ToastService.success('비밀번호 변경이 완료되었습니다.')
        clearResetToken()
      } else {
        ToastService.error('비밀번호 변경 중 오류')
      }
    } catch (error) {
      console.error('PW 변경 확인 오류:', error)
      ToastService.error('비밀번호 변경 중 오류')
    } finally {
      setIsLoading(false)
    }
  }
  const formContent = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='flex justify-start text-3xl font-bold mb-9'>
          {isMobile ? null : '비밀번호 변경'}
        </div>
        <NewPasswordInput register={register} errors={errors} watch={watch} />
        <div className='mt-8'>
          <Button
            label='완료'
            size='biggest'
            bgColor={isSuccess && !isLoading ? 'main-pink' : 'light-gray'}
            disabled={!isSuccess || isLoading}
            type='submit'
          />
        </div>
      </form>
    </>
  )
  return (
    <div>
      {isMobile ? null : <PageTitle title={'비밀번호 변경'} />}
      <div className='flex justify-center w-full'>
        {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
      </div>
    </div>
  )
}

export default ChangePwPage

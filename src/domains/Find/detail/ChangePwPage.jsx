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
import ToastService from '../../../utils/toastService'

const ChangePwPage = () => {
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const { resetToken, requireResetToken, clearResetToken } = useAuthStore()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // 비밀번호와 비밀번호 확인 실시간 감지
  const newPassword = watch('newPassword')
  const passwordCheck = watch('passwordCheck')

  // 비밀번호 유효성 검사 및 isSuccess 업데이트
  useEffect(() => {
    const validatePasswords = async () => {
      // newPassword와 passwordCheck가 모두 입력되었는지 확인
      if (newPassword && passwordCheck) {
        // react-hook-form의 유효성 검사 트리거
        const isValid =
          newPassword === passwordCheck && !errors.newPassword && !errors.passwordCheck
        setIsSuccess(isValid)
      } else {
        setIsSuccess(false)
      }
    }
    validatePasswords()
  }, [newPassword, passwordCheck, errors])

  // resetToken 확인
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await requireResetToken(navigate)
      if (!isValid) {
        console.log('비밀번호 확인이 필요합니다.2')
        ToastService.info('비밀번호 확인이 필요합니다.')
      }
    }
    checkToken()
  }, [requireResetToken, navigate])

  const onSubmit = async (data) => {
    const { passwordCheck, ...filteredData } = data
    console.log('새 비밀번호:', filteredData)
    const newPW = filteredData.newPassword
    console.log('PW 변경 정보 확인:', newPW, resetToken)
    try {
      const response = await postNewPW(newPW, resetToken)
      if (response.data && response.data.message === 'success') {
        console.log('PW 변경 성공:', response.data)
        navigate(ROUTER_PATHS.MY_PROFILE)
        ToastService.success('비밀번호 변경이 완료되었습니다.')
        clearResetToken()
      } else {
        console.log('PW 변경 오류:', response)
        ToastService.error('비밀번호 변경 중 오류')
      }
    } catch (error) {
      console.error('PW 변경 확인 오류:', error)
      ToastService.error('비밀번호 변경 중 오류')
    }
  }


  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center w-full'>
        <PageBox>
          <div className='flex justify-start text-3xl font-bold mb-9'>비밀번호 변경</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <NewPasswordInput register={register} errors={errors} watch={watch} />
            <div className='mt-8'>
              <Button
                label='완료'
                size='biggest'
                bgColor={isSuccess ? 'main-pink' : 'light-gray'}
                disabled={!isSuccess}
                type='submit'
              />
            </div>
          </form>
        </PageBox>
      </div>
    </div>
  )
}

export default ChangePwPage

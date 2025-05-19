import { useForm } from 'react-hook-form'
import PageBox from '../common/components/PageBox'
import PageTitle from '../common/components/PageTitle'
import Button from '../../../components/web/Button'
import NewPasswordInput from '../common/components/NewPasswordInput'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useAuthStore from '../../../store/login/useAuthStore'

const ChangePwPage = () => {
  const navigate = useNavigate()
  const { resetToken, requireResetToken, clearResetToken } = useAuthStore()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // resetToken 확인
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await requireResetToken(navigate)
      if (!isValid) {
        // requireResetToken 내에서 이미 리다이렉트 처리
      }
    }
    checkToken()
  }, [requireResetToken, navigate])

  const onSubmit = (data) => {
    const { passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('새 비밀번호:', filteredData)
    // TODO: 비밀번호 변경 API 호출
    alert('비밀번호 변경이 완료되었습니다.')
    clearResetToken()
    navigate(ROUTER_PATHS.MY_PROFILE)
    alert
  }

  // resetToken 없음
  if (!resetToken) {
    return <Navigate to={ROUTER_PATHS.MY_EDIT_PW} replace />
  }

  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center w-full'>
        <PageBox>
          <div className='flex justify-start text-3xl font-bold mb-9'>비밀번호 변경</div>
          <NewPasswordInput register={register} errors={errors} watch={watch} />
          <div className='mt-8'>
            <Button
              label='완료'
              size='biggest'
              bgColor='light-gray'
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </PageBox>
      </div>
    </div>
  )
}

export default ChangePwPage

import { useForm } from 'react-hook-form'
import PageTitle from '../../Find/common/components/PageTitle'
import PageBox from './../../Find/common/components/PageBox'
import ROUTER_PATHS from '../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/web/Button'
import { postPWCheck } from '../services/userMyDataServices'
import { useEffect, useState } from 'react'
import useAuthStore from '../../../store/login/useAuthStore'
import PwInputBox from '../../../components/web/PwInputBox'
import ToastService from '../../../utils/toastService'
import useIsMobile from '../../../hooks/header/useIsMobile'

const EditPassword = () => {
  const navigate = useNavigate()
  const [serverMessage, setServerMessage] = useState({ message: null, isSuccess: false })
  const [isLoading, setIsLoading] = useState(false)
  const { setResetToken, requireLogin } = useAuthStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    const checkLogin = async () => {
      const isLogin = await requireLogin(navigate)
      if (!isLogin) {
        ToastService.info('로그인 후 이용 가능합니다.')
      }
    }
    checkLogin()
  }, [requireLogin, navigate])

  const onSubmit = async (data) => {
    if (isLoading) return
    setIsLoading(true)
    const PW = data.userPW
    try {
      const response = await postPWCheck(PW)
      if (response.data && response.data.message === 'success') {
        setServerMessage({
          message: '비밀번호가 일치합니다.',
          isSuccess: true,
        })
        const { resetToken } = response.data.data || {}
        if (!resetToken) {
          ToastService.error('서버로부터 resetToken을 받지 못했습니다. 다시 시도해 주세요.')
          return
        }
        setResetToken(resetToken)
      } else {
        setServerMessage({
          message: response.data?.message || '비밀번호가 일치하지 않습니다.',
          isSuccess: false,
        })
      }
    } catch (error) {
      console.error('기존 비밀번호 확인 오류:', error)
      setServerMessage({
        message: error.message || '비밀번호 확인 중 오류가 발생했습니다.',
        isSuccess: false,
      })
    } finally {
      setIsLoading(false)
    }
  }
  const handleButtonClick = () => {
    if (isLoading) return
    if (serverMessage.isSuccess) {
      navigate(ROUTER_PATHS.FIND_PW_CHANGE_PW)
    } else {
      handleSubmit(onSubmit)()
    }
  }
  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
      <div className='flex justify-start text-3xl font-bold'>비밀번호 입력</div>
      <div className='flex-auto mt-8'>
        <div className='mb-[11px] sm:text-[20px] text-base font-bold text-start'>비밀번호</div>
        <PwInputBox
          label='비밀번호'
          placeholder='현재 비밀번호를 입력해주세요'
          size='biggest'
          {...register('userPW', { required: '현재 사용중인 비밀번호를 입력해 주세요.' })}
        />
      </div>
      <div className='flex items-start'>
        {errors.userPW && <p className='text-red-500 text-[14px]'>{errors.userPW.message}</p>}
        {serverMessage.message && (
          <p
            className={`${serverMessage.isSuccess ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
          >
            {serverMessage.message}
          </p>
        )}
      </div>
      <div className='flex items-end mt-6'>
        <Button
          size='biggest'
          label={isLoading ? '처리 중...' : serverMessage.isSuccess ? '다음' : '확인'}
          bgColor={serverMessage.isSuccess ? 'main-pink' : 'light-gray'}
          onClick={handleButtonClick}
          disabled={isLoading}
        />
      </div>
    </form>
  )
  return (
    <div>
      {isMobile ? null : <PageTitle title={'비밀번호 변경'} />}
      <div className='flex justify-center'>
        {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
      </div>
    </div>
  )
}

export default EditPassword

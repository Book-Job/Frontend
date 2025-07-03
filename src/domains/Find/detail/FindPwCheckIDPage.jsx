import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import { useForm } from 'react-hook-form'
import InputBox from '../../../components/web/InputBox'
import Button from '../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import useFindPWStore from '../../../store/find/useFindPWStore'
import OTPInput from '../common/components/OTPInput'
import { useEffect, useState } from 'react'
import { postFindPWEmail, postTemPW } from '../services/useFindPWServices'
import ToastService from '../../../services/toast/ToastService'
import useAuthStore from '../../../store/login/useAuthStore'
import useIsMobile from '../../../hooks/header/useIsMobile'

const FindPwCheckIDPage = () => {
  const [startTimer, setStartTimer] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const { findPWMaskEmail } = useFindPWStore()
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [emailCheckMessage, setEmailCheckMessage] = useState('')
  const [emailCodeMessage, setEmailCodeMessage] = useState('')
  const [validationStatusTemPW, setValidationStatusTemPW] = useState(null)
  const { setResetToken } = useAuthStore()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm()

  const emailValue = watch('userEmail')

  useEffect(() => {
    if (findPWMaskEmail === '') {
      ToastService.info('잘못된 접근입니다.')
      navigate(ROUTER_PATHS.FIND_PW)
    }
    const validateEmail = async () => {
      const isValid = await trigger('userEmail')
      setIsEmailValid(isValid)
    }
    if (emailValue) {
      validateEmail()
    } else {
      setIsEmailValid(false)
    }
  }, [emailValue, trigger, navigate, findPWMaskEmail])

  const handleEmailAuth = async () => {
    if (isCheckingEmail) {
      return
    }
    const isValid = await trigger('userEmail')
    if (!isValid) {
      return
    }

    setIsCheckingEmail(true)
    const email = getValues('userEmail')
    setUserEmail(email)

    try {
      const response = await postFindPWEmail(email)
      if (response.data && response.data.message === 'success') {
        setEmailCodeMessage('임시 비밀번호가 전송되었습니다.')
        setValidationStatusTemPW('pending')
        setStartTimer(true)
        ToastService.success('임시 비밀번호가 전송되었습니다. 이메일을 확인하세요.')
      } else {
        setEmailCheckMessage(response.data?.message || '이메일이 일치하지 않습니다.')
        setValidationStatusTemPW('error')
        ToastService.error(response.data?.message || '이메일이 일치하지 않습니다.')
        setIsCheckingEmail(false)
      }
    } catch (error) {
      console.error('임시 비밀번호 전송 중 오류:', error)
      setEmailCheckMessage(error?.message || '임시 비밀번호 전송 중 오류가 발생했습니다.')
      setValidationStatusTemPW('error')
      ToastService.error(error?.message || '임시 비밀번호 전송 중 오류가 발생했습니다.')
      setIsCheckingEmail(false)
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleTemporaryPW = async (code) => {
    try {
      const response = await postTemPW({ userEmail, code })
      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('유효한 이메일입니다.')
        setEmailCodeMessage('임시 비밀번호가 일치 되었습니다.')
        setValidationStatusTemPW('success')
        setStartTimer(false)
        ToastService.success('이메일 인증이 완료되었습니다.')
        const { resetToken } = response.data.data || {}
        if (!resetToken) {
          ToastService.error('서버로부터 resetToken을 받지 못했습니다. 다시 시도해 주세요.')
          return
        }
        setResetToken(resetToken)
      } else {
        setEmailCodeMessage(response.data?.message || '임시 비밀번호가 일치하지 않습니다.')
        setValidationStatusTemPW('error')
        ToastService.error(response.data?.message || '임시 비밀번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('PW찾기 임시 비밀번호 확인 중 오류:', error.name)
      setEmailCodeMessage(error === 'Error' ? '서버오류 입니다.' : '인증번호가 일치하지 않습니다.')
      setValidationStatusTemPW('error')
      ToastService.error(
        error.name === 'Error' ? '서버오류 입니다.' : '인증번호가 일치하지 않습니다.',
      )
    }
  }
  const buttonLabel = isCheckingEmail
    ? '전송 중...'
    : validationStatusTemPW === 'success'
      ? '비밀번호 발급 완료'
      : '임시 비밀번호 받기'

  const handleInputChange = () => {
    if (emailCheckMessage) setEmailCheckMessage('')
    if (emailCodeMessage) setEmailCodeMessage('')
    if (validationStatusTemPW) setValidationStatusTemPW(null)
    setStartTimer(false)
  }

  const onSubmit = () => {
    if (validationStatusTemPW === 'success') {
      navigate(ROUTER_PATHS.FIND_PW_CHANGE_PW)
    } else {
      setEmailCodeMessage('임시 비밀번호 인증을 해주세요.')
    }
  }
  const formContent = (
    <div className='w-full'>
      <div className='flex text-3xl font-bold'>임시 비밀번호 발급</div>
      <div className='flex my-5 text-xl'>
        {isMobile ? (
          <div className='flex flex-col'>
            <span className='flex justify-start'>본인확인 이메일로 인증</span>
            <span className='text-main-pink'>
              {'( '}
              {findPWMaskEmail}
              {' )'}
            </span>
          </div>
        ) : (
          <div>
            <span>본인확인 이메일로 인증</span>
            <span className='text-main-pink'>
              {'( '}
              {findPWMaskEmail}
              {' )'}
            </span>
          </div>
        )}
      </div>
      <div className='flex flex-col text-dark-gray'>
        <p className='flex'>본인확인 이메일 주소와 이력한 이메일 주소가 같아야,</p>
        <p className='flex'>임시비밀번호를 받을 수 있습니다.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 sm:gap-5'>
        <div className='flex flex-row gap-2 mt-7'>
          <div className='w-full'>
            <InputBox
              type='email'
              placeholder='이메일 주소를 입려해주세요'
              size='medium'
              {...register('userEmail', {
                required: '이메일 주소를 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '유효한 이메일 주소를 입력해주세요',
                },
                onChange: handleInputChange,
              })}
            />
            {errors.userEmail && (
              <p className='flex text-[14px] items-start text-red-500'>
                {errors.userEmail.message}
              </p>
            )}
            {emailCheckMessage && (
              <p
                className={`${validationStatusTemPW === 'success' ? 'text-blue-500' : 'text-red-500'} flex items-start text-[14px]`}
                aria-live='polite'
              >
                {emailCheckMessage}
              </p>
            )}
          </div>
          <Button
            type='button'
            label={buttonLabel}
            size='semiMedium'
            bgColor={isEmailValid && !isCheckingEmail ? 'main-pink' : 'light-gray'}
            disabled={!isEmailValid || isCheckingEmail}
            onClick={handleEmailAuth}
          />
        </div>
        <div>
          <OTPInput
            size='biggest'
            placeholder='임시비밀번호를 입력해주세요'
            startTimer={startTimer}
            onVerify={(code) => handleTemporaryPW(code)}
          />
          <div className='flex items-start'>
            {emailCodeMessage && (
              <p
                className={`${validationStatusTemPW === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
                aria-live='polite'
              >
                {emailCodeMessage}
              </p>
            )}
          </div>
        </div>
        <div>
          <Button
            type='submit'
            label='새로운 비밀번호 생성'
            size='biggest'
            disabled={validationStatusTemPW !== 'success'}
            bgColor={validationStatusTemPW === 'success' ? 'main-pink' : 'light-gray'}
          />
        </div>
      </form>
    </div>
  )
  return (
    <div>
      {isMobile ? (
        <PageTitle subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
      ) : (
        <PageTitle
          title={'비밀번호 찾기'}
          subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'}
        />
      )}
      <div className='flex justify-center w-full'>
        {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
      </div>
    </div>
  )
}

export default FindPwCheckIDPage

import { useForm } from 'react-hook-form'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import Button from '../../../components/web/Button'
import { useState } from 'react'
import useIsMobile from '../../../hooks/header/useIsMobile'
import EmailInput from '../../login/common/components/EmailInput'
import { postFindIDEmail, postFindIDEmailCode } from '../services/useFindIDServices'
import useFindIDStore from '../../../store/find/useFindIDStore'
import ToastService from '../../../services/toast/ToastService'

const FindIDPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm()
  const [validationStatus, setValidationStatus] = useState(null)
  const navigate = useNavigate()
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const { setFindID } = useFindIDStore()

  const onSubmit = (data) => {
    if (validationStatus === 'success') {
      navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)
    }
  }

  const isMobile = useIsMobile()

  const handleCheckEmail = async (
    email,
    setEmailCheckMessage,
    setEmailCodeMessage,
    setEmailCheckStatus,
    setStartTimer,
    setValidation,
    trigger,
  ) => {
    try {
      setIsCheckingEmail(true)
      const response = await postFindIDEmail(email)
      if (response.data && response.data.message === 'success') {
        setEmailCodeMessage('인증번호가 전송되었습니다.')
        setEmailCheckStatus('pending')
        setStartTimer(true)
        ToastService.success('인증번호가 전송되었습니다. 이메일을 확인하세요.')
      } else {
        setEmailCheckMessage(response.data?.message || '등록되지 않은 이메일입니다.')
        setEmailCheckStatus('error')
        setValidation('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '등록되지 않은 이메일입니다.')
      }
    } catch (error) {
      console.error('Email 중복 확인 중 오류:', error)
      setEmailCheckMessage(error?.message || '이메일 확인 중 오류가 발생했습니다.')
      setEmailCheckStatus('error')
      setValidation('error')
      trigger('emailId')
      ToastService.error(error?.message || '이메일 확인 중 오류가 발생했습니다.')
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleVerifyEmail = async (
    email,
    code,
    setEmailCheckMessage,
    setEmailCodeMessage,
    setEmailCheckStatus,
    setStartTimer,
    setValidation,
    trigger,
  ) => {
    try {
      const response = await postFindIDEmailCode({ fullEmail: email, code })
      if (response.data && response.data.message === 'success') {
        setFindID(response.data.data)
        setEmailCheckMessage('가입한 이메일입니다.')
        setEmailCodeMessage('이메일 인증이 완료되었습니다.')
        setEmailCheckStatus('success')
        setValidation('success')
        setStartTimer(false)
        trigger('emailId')
        ToastService.success('이메일 인증이 완료되었습니다.')
      } else {
        setEmailCodeMessage(response.data?.message || '인증번호가 일치하지 않습니다.')
        setEmailCheckStatus('error')
        setValidation('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '인증번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('ID 찾기 인증번호 확인 중 오류:', error)
      setEmailCodeMessage(error.message || '인증번호가 일치하지 않습니다.')
      setEmailCheckStatus('error')
      setValidation('error')
      trigger('emailId')
      ToastService.error(error.message || '인증번호가 일치하지 않습니다.')
    }
  }

  const formContent = (
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmailInput
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          setValidationStatus={setValidationStatus}
          onCheckEmail={handleCheckEmail}
          onVerifyEmail={handleVerifyEmail}
          buttonLabel={isCheckingEmail ? '확인 중...' : undefined}
          isCheckingEmail={isCheckingEmail}
        />
        <div className='flex mt-6'>
          <Button
            type='submit'
            size='biggest'
            label='확인'
            bgColor={validationStatus === 'success' ? 'main-pink' : 'light-gray'}
            disabled={validationStatus !== 'success'}
          />
        </div>
      </form>
    </div>
  )

  return (
    <div className='flex flex-col items-center'>
      {isMobile ? (
        <PageTitle title='' subTitle='북잡에서는 이메일로 본인인증을 진행합니다.' />
      ) : (
        <PageTitle title='아이디 찾기' subTitle='북잡에서는 이메일로 본인인증을 진행합니다.' />
      )}
      <div className='flex w-full justify-evenly'>
        {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
      </div>
    </div>
  )
}

export default FindIDPage

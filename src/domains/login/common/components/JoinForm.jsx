import Button from '../../../../components/web/Button'
import { useForm } from 'react-hook-form'
import IDInput from './IDInput'
import NicknameInput from './NicknameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import PageTitle from './../../../Find/common/components/PageTitle'
import useModalStore from '../../../../store/modal/useModalStore'
import { useState } from 'react'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import {
  postJoinData,
  postJoinCheckEmail,
  postJoinCheckEmailNum,
} from '../../services/useJoinServices'
import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import ToastService from '../../../../services/toast/ToastService'
import confetti from 'canvas-confetti'
import { CELEBRATION_CONFETTI } from '../../../../constants/animations'

const JoinForm = () => {
  const navigate = useNavigate()
  const { openModal } = useModalStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const [validationStatus, setValidationStatus] = useState({
    idCheck: null,
    nicknameCheck: null,
    emailCheck: null,
  })

  const updateValidationStatus = (field, status) => {
    setValidationStatus((prev) => ({ ...prev, [field]: status }))
  }

  const isAllValid = () =>
    isValid &&
    validationStatus.idCheck === 'success' &&
    validationStatus.nicknameCheck === 'success' &&
    validationStatus.emailCheck === 'success'

  const onSubmit = (data) => {
    if (!isAllValid()) {
      openModal({
        title: '검증 미완료',
        description: '아이디, 닉네임 중복 확인과 이메일 인증을 모두 완료해주세요.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
      return
    }

    const { emailId, passwordCheck, ...filteredData } = data
    handleJoinData(filteredData)
  }

  const handleJoinData = async (filteredData) => {
    try {
      const response = await postJoinData(filteredData)

      if (response.data && response.data.message === 'success') {
        confetti(CELEBRATION_CONFETTI)
        ToastService.success('회원가입을 축하합니다!')
        navigate(ROUTER_PATHS.MAIN_PAGE)
      } else {
        openModal({
          title: '회원가입 실패',
          description: '아이디 또는 비밀번호를 확인해주세요.',
          buttonLabel: '확인',
          onButtonClick: null,
        })
      }
    } catch (error) {
      console.error('가입중 오류:', error)
      openModal({
        title: '회원가입 오류',
        description: '서버 오류가 발생했습니다. 다시 시도해주세요.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
    }
  }

  const [isCheckingEmail, setIsCheckingEmail] = useState(false)

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
      const response = await postJoinCheckEmail(email)
      if (response.data && response.data.message === 'success') {
        setEmailCodeMessage('인증번호가 전송되었습니다.')
        setEmailCheckStatus('pending')
        setStartTimer(true)
        ToastService.success('인증번호가 전송되었습니다. 이메일을 확인하세요.')
      } else {
        setEmailCheckMessage(response.data?.message || '이미 사용 중인 이메일입니다.')
        setEmailCheckStatus('error')
        setValidation('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '이미 사용 중인 이메일입니다.')
      }
    } catch (error) {
      console.error('Email 중복 확인 중 오류:', error)
      setEmailCheckMessage(error?.message || '이메일 확인 중 오류가 발생했습니다.')
      setEmailCheckStatus('error')
      setValidation('error')
      trigger('emailId')
      ToastService.error(error?.message || '인증번호 전송 중 오류가 발생했습니다.')
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
      const response = await postJoinCheckEmailNum({ fullEmail: email, code })
      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('사용 가능한 이메일입니다.')
        setEmailCodeMessage('이메일 인증이 완료되었습니다.')
        setEmailCheckStatus('success')
        setValidation('success')
        setStartTimer(false)
        trigger('emailId')
        ToastService.success('이메일 인증이 완료되었습니다.')
      } else {
        setEmailCheckMessage(response.data?.message || '인증번호가 일치하지 않습니다.')
        setEmailCheckStatus('error')
        setValidation('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '인증번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('인증번호 확인 중 오류:', error)
      setEmailCheckMessage('인증번호가 일치하지 않습니다.')
      setEmailCheckStatus('error')
      setValidation('error')
      trigger('emailId')
    }
  }

  return (
    <div className='flex flex-col items-center w-full'>
      {isMobile ? null : <PageTitle title={'회원정보 입력'} />}
      <div className='flex flex-col w-full max-w-[575px] gap-4'>
        <IDInput
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          watch={watch}
          setValidationStatus={(status) => updateValidationStatus('idCheck', status)}
        />
        <NicknameInput
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          watch={watch}
          setValidationStatus={(status) => updateValidationStatus('nicknameCheck', status)}
        />
        <EmailInput
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          setValidationStatus={(status) => updateValidationStatus('emailCheck', status)}
          onCheckEmail={handleCheckEmail}
          onVerifyEmail={handleVerifyEmail}
          buttonLabel={isCheckingEmail ? '확인 중...' : undefined}
          isCheckingEmail={isCheckingEmail}
        />
        <div className='flex flex-col gap-8'>
          <PasswordInput register={register} errors={errors} watch={watch} />
          <Button
            label='회원가입'
            size='biggest'
            bgColor={isAllValid() ? 'main-pink' : 'light-gray'}
            disabled={!isAllValid()}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  )
}

export default JoinForm

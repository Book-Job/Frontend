import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import DomainSelector from '../../../login/common/components/DomainSelector'
import Button from './../../../../components/web/Button'
import { postFindIDEmail, postFindIDEmailCode } from '../../services/useFindIDServices'
import OTPInput from './OTPInput'
import useFindIDStore from '../../../../store/find/useFindIDStore'
import ToastService from '../../../../utils/toastService'
const InputEmail = ({ register, errors, watch, setValue, trigger, setValidationStatus }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [fullEmail, setFullEmail] = useState()
  const [startTimer, setStartTimer] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailCheckMessage, setEmailCheckMessage] = useState('')
  const [emailCodeMessage, setEmailCodeMessage] = useState('')
  const [emailCheckStatus, setEmailCheckStatus] = useState(null)
  const { findID, setFindID } = useFindIDStore()

  const emailId = watch('emailId') || ''
  const domainValue = isCustom ? customDomain : domain

  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
    setFullEmail(emailFull)
  }, [emailId, domainValue, setValue])

  // 중복 확인 버튼 클릭 핸들러
  const handleCheckEmail = async () => {
    if (isCheckingEmail) {
      ToastService.info('잠시 기다려주세요. 요청이 진행 중입니다.')
      return
    }

    setEmailCheckMessage('')
    setEmailCheckStatus(null)
    setIsCheckingEmail(true)

    const isValEmail = await trigger('emailId')
    if (!isValEmail) {
      setIsCheckingEmail(false)
      return
    }
    try {
      const response = await postFindIDEmail(fullEmail)
      if (response.data && response.data.message === 'success') {
        setEmailCodeMessage('인증번호가 전송되었습니다.')
        setEmailCheckStatus('pending')
        setStartTimer(true)
        ToastService.success('인증번호가 전송되었습니다. 이메일을 확인하세요.')
      } else {
        setEmailCheckMessage(response.data?.message || '이미 사용 중인 이메일입니다.')
        setEmailCheckStatus('error')
        setValidationStatus('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '이미 사용 중인 이메일입니다.')
        setIsCheckingEmail(false)
      }
    } catch (error) {
      console.error('Email 중복 확인 중 오류:', error)
      setEmailCheckMessage(error?.message || '이메일 확인 중 오류가 발생했습니다.')
      setEmailCheckStatus('error')
      setValidationStatus('error')
      trigger('emailId')
      ToastService.error(error?.message || '이메일 확인 중 오류가 발생했습니다.')
      setIsCheckingEmail(false)
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleIsExpiredEmail = async (code) => {
    try {
      const response = await postFindIDEmailCode({ fullEmail, code })
      if (response.data && response.data.message === 'success') {
        setFindID(response.data.data)
        setEmailCheckMessage('가입한 이메일입니다.')
        setEmailCodeMessage('이메일 인증이 완료되었습니다.')
        setEmailCheckStatus('success')
        setValidationStatus('success')
        setStartTimer(false)
        trigger('emailId')
        ToastService.success('이메일 인증이 완료되었습니다.')
      } else {
        setEmailCodeMessage(response.data?.message || '인증번호가 일치하지 않습니다다.')
        setEmailCheckStatus('error')
        setValidationStatus('error')
        trigger('emailId')
        ToastService.error(response.data?.message || '인증번호가 일치하지 않습니다.')
      }
    } catch (error) {
      console.error('ID 찾기 인증번호 확인 중 오류:', error.name)
      setEmailCodeMessage(error === 'Error' ? '서버오류 입니다.' : '인증번호가 일치하지 않습니다.')
      setEmailCheckStatus('error')
      setValidationStatus('error')
      trigger('emailId')
      ToastService.error(
        error.name === 'Error' ? '서버오류 입니다.' : '인증번호가 일치하지 않습니다.',
      )
    }
  }
  const buttonLabel = isCheckingEmail
    ? '확인 중...'
    : emailCheckStatus === 'success'
      ? '사용가능'
      : '인증확인'
  const handleInputChange = (e) => {
    if (emailCheckMessage) setEmailCheckMessage('')
    if (emailCodeMessage) setEmailCodeMessage('')
    if (emailCheckStatus) setEmailCheckStatus(null)
    setStartTimer(false)
  }

  return (
    <div className='w-full max-w-[575px]'>
      <div className='flex gap-2'>
        <div className='flex-auto'>
          <LabelWithInput
            label='이메일'
            type='text'
            placeholder='ex) bookjob'
            size='medium'
            {...register('emailId', {
              required: '이메일을 입력하세요',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+$/,
                message: '유효한 이메일 형식을 입력하세요',
              },
              onChange: handleInputChange,
            })}
          />
        </div>
        <span className='flex items-end text-2xl'>@</span>
        <DomainSelector
          domain={domain}
          customDomain={customDomain}
          isCustom={isCustom}
          setDomain={setDomain}
          setCustomDomain={setCustomDomain}
          setIsCustom={setIsCustom}
        />
      </div>
      <div className='flex items-start'>
        {errors.emailId && <p className='text-red-500 text-[14px]'>{errors.emailId.message}</p>}
        {emailCheckMessage && (
          <p
            className={`${emailCheckStatus === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
            aria-live='polite'
          >
            {emailCheckMessage}
          </p>
        )}
      </div>
      <div className='flex items-end mt-6'>
        <Button
          size='biggest'
          label={buttonLabel}
          bgColor={emailId && !isCheckingEmail ? 'main-pink' : 'light-gray'}
          onClick={handleCheckEmail}
          disabled={!emailId || isCheckingEmail}
        />
      </div>
      <div className='mt-3'>
        <div className='mt-3'>
          <OTPInput
            size='biggest'
            placeholder='이메일로 전송된 인증코드를 입력해주세요'
            startTimer={startTimer}
            onVerify={handleIsExpiredEmail}
          />
        </div>
        <div className='flex items-start'>
          {emailCodeMessage && (
            <p
              className={`${emailCheckStatus === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
              aria-live='polite'
            >
              {emailCodeMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default InputEmail

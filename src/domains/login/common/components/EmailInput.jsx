import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'
import DomainSelector from './DomainSelector'
import OTPInput from '../../../Find/common/components/OTPInput'
import { postJoinCheckEmail, postJoinCheckEmailNum } from '../../services/useJoinServices'
import ToastService from '../../../../utils/toastService'

const EmailInput = ({ register, errors, watch, setValue, trigger, setValidationStatus }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [fullEmail, setFullEmail] = useState()
  const [startTimer, setStartTimer] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailCheckMessage, setEmailCheckMessage] = useState('')
  const [emailCheckStatus, setEmailCheckStatus] = useState(null)

  const emailId = watch('emailId') || ''
  const domainValue = isCustom ? customDomain : domain

  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
    setFullEmail(emailFull)
  }, [emailId, domainValue, setValue])

  const handleCheckEmail = async () => {
    if (isCheckingEmail) {
      return
    }

    const isValEmail = await trigger('emailId')
    if (!isValEmail) {
      setIsCheckingEmail(false)
      return
    }

    setEmailCheckMessage('')
    setEmailCheckStatus(null)
    setIsCheckingEmail(true)

    try {
      const response = await postJoinCheckEmail(fullEmail)
      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('인증번호가 전송되었습니다.')
        setEmailCheckStatus('pending')
        setStartTimer(true)
        ToastService.success('인증번호가 전송되었습니다. 이메일을 확인하세요.')
      } else {
        setEmailCheckMessage(response.data?.message || '이미 사용 중인 이메일입니다.')
        setEmailCheckStatus('error')
        setValidationStatus('error')
        trigger('emailId')
      }
    } catch (error) {
      console.error('Email 중복 확인 중 오류:', error)
      setEmailCheckMessage(error?.message || '이메일 확인 중 오류가 발생했습니다.')
      setEmailCheckStatus('error')
      setValidationStatus('error')
      trigger('emailId')
      ToastService.error(error?.message || '인증번호 전송 중 오류가 발생했습니다.')
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleIsExpiredEmail = async (code) => {
    try {
      const response = await postJoinCheckEmailNum({ fullEmail, code })

      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('사용 가능한 이메일일입니다.')
        setEmailCheckStatus('success')
        setValidationStatus('success')
        setStartTimer(false)
        trigger('emailId')
      } else {
        setEmailCheckMessage(response.data?.message || '인증번호가 일치하지 않습니다다.')
        setEmailCheckStatus('error')
        setValidationStatus('error')
        trigger('emailId')
      }
    } catch (error) {
      console.error('인증번호 확인 중 오류:', error)
      setEmailCheckMessage('인증번호가 일치하지 않습니다.')
      setEmailCheckStatus('error')
      setValidationStatus('error')
      trigger('emailId')
    }
  }

  const buttonLabel = isCheckingEmail
    ? '확인 중...'
    : emailCheckStatus === 'success'
      ? '사용가능'
      : '인증확인'

  const handleInputChange = (e) => {
    if (emailCheckMessage) setEmailCheckMessage('')
    if (emailCheckStatus) setEmailCheckStatus(null)
    setStartTimer(false)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full gap-2 sm:flex-row'>
        <div className='flex flex-row justify-between w-full gap-2'>
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
          <div className='flex w-auto'>
            <DomainSelector
              domain={domain}
              customDomain={customDomain}
              isCustom={isCustom}
              setDomain={setDomain}
              setCustomDomain={setCustomDomain}
              setIsCustom={setIsCustom}
            />
          </div>
        </div>
        <div className='flex items-end sm:min-w-[148px] '>
          <Button
            size='biggest'
            label={buttonLabel}
            bgColor={emailId && !isCheckingEmail ? 'main-pink' : 'light-gray'}
            onClick={handleCheckEmail}
            disabled={!emailId || isCheckingEmail}
          />
        </div>
      </div>
      <div className='mt-3'>
        <div className='mt-3'>
          <OTPInput
            size='biggest'
            placeholder='이메일로 전송된 인증코드를 입력해주세요'
            startTimer={startTimer}
            onVerify={(code) => handleIsExpiredEmail(code)}
          />
        </div>
        <div className='flex items-start'>
          {errors.emailId && <p className='text-red-500 text-[14px]'>{errors.emailId.message}</p>}
          {emailCheckMessage && (
            <p
              className={`${emailCheckStatus === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
            >
              {emailCheckMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailInput

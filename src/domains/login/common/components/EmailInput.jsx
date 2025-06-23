import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'
import DomainSelector from './DomainSelector'
import OTPInput from '../../../Find/common/components/OTPInput'
import CustomDomain from './CustomDomain'

const EmailInput = ({
  register,
  errors,
  watch,
  setValue,
  trigger,
  setValidationStatus,
  onCheckEmail,
  onVerifyEmail,
  buttonLabel: externalButtonLabel,
  isCheckingEmail: externalIsCheckingEmail,
}) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [fullEmail, setFullEmail] = useState()
  const [startTimer, setStartTimer] = useState(false)
  const [emailCheckMessage, setEmailCheckMessage] = useState('')
  const [emailCodeMessage, setEmailCodeMessage] = useState('')
  const [emailCheckStatus, setEmailCheckStatus] = useState(null)

  const emailId = watch('emailId') || ''
  const domainValue = isCustom ? customDomain : domain

  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
    setFullEmail(emailFull)
  }, [emailId, domainValue, setValue])

  const handleCheckEmail = async () => {
    if (
      externalIsCheckingEmail ||
      emailCheckStatus === 'success' ||
      (isCustom && !customDomain.trim()) 
    ) {
      return
    }

    const isValEmail = await trigger('emailId')
    if (!isValEmail) {
      return
    }

    setEmailCheckMessage('')
    setEmailCheckStatus(null)
    setEmailCodeMessage('')
    if (onCheckEmail) {
      await onCheckEmail(
        fullEmail,
        setEmailCheckMessage,
        setEmailCodeMessage,
        setEmailCheckStatus,
        setStartTimer,
        setValidationStatus,
        trigger,
      )
    }
  }

  const handleIsExpiredEmail = async (code) => {
    if (onVerifyEmail) {
      await onVerifyEmail(
        fullEmail,
        code,
        setEmailCheckMessage,
        setEmailCodeMessage,
        setEmailCheckStatus,
        setStartTimer,
        setValidationStatus,
        trigger,
      )
    }
  }

  const buttonLabel =
    externalButtonLabel ||
    (externalIsCheckingEmail
      ? '확인 중...'
      : emailCheckStatus === 'success'
        ? '사용가능'
        : '인증확인')

  const handleInputChange = (e) => {
    if (emailCheckMessage) setEmailCheckMessage('')
    if (emailCodeMessage) setEmailCodeMessage('')
    if (emailCheckStatus) setEmailCheckStatus(null)
    setStartTimer(false)
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col w-full gap-2 sm:flex-row'>
        <div className='flex flex-row w-full gap-2'>
          <div className='flex-1'>
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
          <span className='flex items-center pt-8 text-2xl'>@</span>
          <div className='flex w-[148px]'>
            <DomainSelector
              domain={isCustom ? customDomain : domain}
              isCustom={isCustom}
              setDomain={setDomain}
              setIsCustom={setIsCustom}
              setCustomDomain={setCustomDomain}
            />
          </div>
          <div className='flex w-[148px]'>
            <CustomDomain
              customDomain={customDomain}
              setCustomDomain={setCustomDomain}
              disabled={!isCustom}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col w-full gap-2 sm:flex-row'>
        <div className='flex flex-col w-full'>
          <div className='w-full'>
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

        <div className='flex min-w-[148px]'>
          <Button
            size='biggest'
            label={buttonLabel}
            bgColor={
              emailId &&
              !externalIsCheckingEmail &&
              !(isCustom && !customDomain.trim()) &&
              emailCheckStatus !== 'success' 
              
                ? 'main-pink'
                : 'light-gray'
            }
            onClick={handleCheckEmail}
            disabled={
              !emailId ||
              externalIsCheckingEmail ||
              (isCustom && !customDomain.trim()) ||
              emailCheckStatus === 'success'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default EmailInput

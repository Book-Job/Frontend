import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'
import DomainSelector from './DomainSelector'
import OTPInput from '../../../Find/common/components/OTPInput'
import { postJoinCheckEmail, postJoinCheckEmailNum } from '../../services/useJoinServices'

const EmailInput = ({ register, errors, watch, setValue, trigger, setValidationStatus }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [fullEmail, setFullEmail] = useState()
  const [startTimer, setStartTimer] = useState(false) // 타이머 시작 상태
  const [isCheckingEmail, setIsCheckingEmail] = useState(false) // 중복 확인 중 로딩 상태
  const [emailCheckMessage, setEmailCheckMessage] = useState('') // 중복 확인 결과 메시지
  const [emailCheckStatus, setEmailCheckStatus] = useState(null) // 'success' or 'error'
  // 이메일 입력 값
  const emailId = watch('emailId') || ''

  // 도메인 값 결정 (직접 입력 vs 선택)
  const domainValue = isCustom ? customDomain : domain

  // emailFull 값 자동 업데이트
  useEffect(() => {
    const emailFull = `${emailId}@${domainValue}`
    setValue('email', emailFull)
    setFullEmail(emailFull)
  }, [emailId, domainValue, setValue])

  // 중복 확인 버튼 클릭 핸들러
  const handleCheckEmail = async () => {
    setEmailCheckMessage('')
    setEmailCheckStatus(null)
    setIsCheckingEmail(true)

    const isValEmail = await trigger('emailId')
    if (!isValEmail) {
      setIsCheckingEmail(false)
      return
    }

    try {
      console.log('Email :', fullEmail)
      const response = await postJoinCheckEmail(fullEmail)
      console.log('Email API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('인증번호가 전송되었습니다.')
        setEmailCheckStatus('pending') // 인증 대기 상태
        setStartTimer(true) // 타이머 시작
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
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleIsExpiredEmail = async (code) => {
    try {
      console.log('Email :', fullEmail)
      console.log('code :', code)
      const response = await postJoinCheckEmailNum({ fullEmail, code })
      console.log('인증번호 확인 API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setEmailCheckMessage('사용 가능한 이메일일입니다.')
        setEmailCheckStatus('success')
        setValidationStatus('success')
        setStartTimer(false) // 인증 성공 시 타이머 중지
        trigger('emailId') // 유효성 검사 갱신
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
            bgColor={emailId ? 'main-pink' : 'light-gray'}
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

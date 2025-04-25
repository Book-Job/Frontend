import { useEffect, useState } from 'react'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Button from '../../../../components/web/Button'
import DomainSelector from './DomainSelector'
import { postJoinCheckEmail } from '../../services/Join'

const EmailInput = ({ register, errors, watch, setValue, trigger }) => {
  const [domain, setDomain] = useState('naver.com')
  const [customDomain, setCustomDomain] = useState('')
  const [isCustom, setIsCustom] = useState(false)
  const [fullEmail, setFullEmail] = useState()

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

  /////////////
  const [isCheckingEmail, setIsCheckingEmail] = useState(false) // 중복 확인 중 로딩 상태
  const [idCheckMessage, setIdCheckMessage] = useState('') // 중복 확인 결과 메시지
  const [idCheckStatus, setIdCheckStatus] = useState(null) // 'success' or 'error'

  // const nowUserEmailValue = watch('emailId')
  // 중복 확인 버튼 클릭 핸들러
  const handleCheckNickname = async () => {
    setIdCheckMessage('') // 이전 메시지 초기화
    setIdCheckStatus(null)
    setIsCheckingEmail(true) // 로딩 시작

    // 1. 'userID' 필드만 유효성 검사 실행
    const isValEmail = await trigger('emailId') // true 또는 false 반환

    // 2. 유효성 검사 실패 시 함수 종료 (오류 메시지는 react-hook-form이 표시)
    if (!isValEmail) {
      setIsCheckingEmail(false)
      return
    }

    // 3. 유효성 검사 통과 시 현재 아이디 값 가져오기

    // 4. 백엔드 API 호출
    try {
      console.log('Email :', fullEmail)
      const response = await postJoinCheckEmail(fullEmail)
      console.log('Email API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setIdCheckMessage('사용 가능한 이메일일입니다.')
        setIdCheckStatus('success')
      } else {
        setIdCheckMessage(response.data?.message || '이미 사용 중인 이메일일입니다.')
        setIdCheckStatus('error')
      }
    } catch (error) {
      console.error('Email 중복 확인 중 오류:', error)
    } finally {
      setIsCheckingEmail(false)
    }
  }

  // 버튼 라벨 결정 로직
  const buttonLabel = isCheckingEmail
    ? '확인 중...'
    : idCheckStatus === 'success'
      ? '사용가능'
      : '중복확인'
  // onChange 핸들러
  const handleInputChange = (e) => {
    if (idCheckMessage) setIdCheckMessage('')
    if (idCheckStatus) setIdCheckStatus(null)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col w-full gap-2 sm:flex-row'>
        <div className='flex flex-row justify-between gap-2'>
          <div className='flex-auto'>
            <LabelWithInput
              label='이메일'
              type='email'
              placeholder='ex) bookjob'
              size='medium'
              {...register('emailId', {
                required: '이메일을 입력하세요',
                pattern: {
                  // value: /^[a-zA-Z0-9가-힣]{2,8}$/,
                  message: '이메일을 입력하세요요',
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
        <div className='flex items-end sm:w-[148px] '>
          <Button
            size='biggest'
            label={buttonLabel}
            bgColor={emailId ? 'main-pink' : 'light-gray'}
            onClick={handleCheckNickname}
            disabled={!emailId || isCheckingEmail}
          />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.emailId && <p className='text-red-500 text-[14px]'>{errors.emailId.message}</p>}
        {idCheckMessage && (
          <p
            className={`${idCheckStatus === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
          >
            {idCheckMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default EmailInput

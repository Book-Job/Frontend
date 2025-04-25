import { useState } from 'react'
import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import { getJoinCheckId } from '../../services/Join'

const IDInput = ({ register, errors, trigger, getValues, watch }) => {
  const [isCheckingId, setIsCheckingId] = useState(false) // 중복 확인 중 로딩 상태
  const [idCheckMessage, setIdCheckMessage] = useState('') // 중복 확인 결과 메시지
  const [idCheckStatus, setIdCheckStatus] = useState(null) // 'success' or 'error'

  const nowUserIDValue = watch('userID')

  // 중복 확인 버튼 클릭 핸들러
  const handleCheckId = async () => {
    setIdCheckMessage('') // 이전 메시지 초기화
    setIdCheckStatus(null)
    setIsCheckingId(true) // 로딩 시작

    // 1. 'userID' 필드만 유효성 검사 실행
    const isValid = await trigger('userID') // true 또는 false 반환

    // 2. 유효성 검사 실패 시 함수 종료 (오류 메시지는 react-hook-form이 표시)
    if (!isValid) {
      setIsCheckingId(false)
      return
    }

    // 3. 유효성 검사 통과 시 현재 아이디 값 가져오기
    const nowUserID = getValues('userID')

    // 4. 백엔드 API 호출
    try {
      const response = await getJoinCheckId(nowUserID)
      console.log('ID API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setIdCheckMessage('사용 가능한 아이디입니다.')
        setIdCheckStatus('success')
      } else {
        setIdCheckMessage(response.data?.message || '이미 사용 중인 아이디입니다.')
        setIdCheckStatus('error')
      }
    } catch (error) {
      console.error('ID 중복 확인 중 오류:', error)
    } finally {
      setIsCheckingId(false)
    }
  }

  // 버튼 라벨 결정 로직
  const buttonLabel = isCheckingId
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
        <div className='flex-auto'>
          <LabelWithInput
            label='아이디'
            placeholder='영문,숫자만 사용이 가능합니다. 최소4~12자까지'
            size='biggest'
            {...register('userID', {
              required: '아이디를 입력하세요',
              pattern: {
                value: /^[a-zA-Z0-9]{4,12}$/,
                message: '아이디는 영문, 숫자로 4~12자만 가능합니다.',
              },
              onChange: handleInputChange,
            })}
          />
        </div>
        <div className='flex items-end sm:w-[148px]'>
          <Button
            size='biggest'
            label={buttonLabel}
            bgColor={nowUserIDValue ? 'main-pink' : 'light-gray'}
            onClick={handleCheckId}
            disabled={!nowUserIDValue || isCheckingId}
          />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.userID && <p className='text-red-500 text-[14px]'>{errors.userID.message}</p>}
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

export default IDInput

import { useState } from 'react'
import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import { getJoinCheckId } from '../../services/userJoinServices'

const IDInput = ({ register, errors, trigger, getValues, watch, setValidationStatus }) => {
  const [isCheckingId, setIsCheckingId] = useState(false) // 중복 확인 중 로딩 상태
  const [idCheckMessage, setIdCheckMessage] = useState('') // 중복 확인 결과 메시지
  const [idCheckStatus, setIdCheckStatus] = useState(null) // 'success' or 'error'

  const nowUserIDValue = watch('userID')

  // 중복 확인 버튼 클릭 핸들러
  const handleCheckId = async () => {
    setIdCheckMessage('')
    setIdCheckStatus(null)
    setIsCheckingId(true)

    const isValid = await trigger('userID')

    if (!isValid) {
      setIsCheckingId(false)
      return
    }

    const nowUserID = getValues('userID')

    try {
      const response = await getJoinCheckId(nowUserID)
      console.log('ID API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setIdCheckMessage('사용 가능한 아이디입니다.')
        setIdCheckStatus('success')
        setValidationStatus('success')
        trigger('userID') // 유효성 검사 갱신
      } else {
        setIdCheckMessage(response.data?.message || '이미 사용 중인 아이디입니다.')
        setIdCheckStatus('error')
        setValidationStatus('error')
        trigger('userID') // 유효성 검사 갱신
      }
    } catch (error) {
      console.error('ID 중복 확인 중 오류:', error)
      setIdCheckMessage(error?.message || '아이디 확인 중 오류가 발생했습니다.')
      setIdCheckStatus('error')
      setValidationStatus('error')
      trigger('userID')
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

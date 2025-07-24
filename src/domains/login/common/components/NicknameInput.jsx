import { useState } from 'react'
import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import Spinner from '../../../../components/web/Spinner'
import { getJoinCheckNickname } from '../../services/useJoinServices'

const NicknameInput = ({ register, errors, trigger, getValues, watch, setValidationStatus }) => {
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('')
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState(null)

  const nowUserNicknameValue = watch('Nickname')
  const handleCheckNickname = async () => {
    setNicknameCheckMessage('')
    setNicknameCheckStatus(null)
    setIsCheckingNickname(true)

    const isValNickname = await trigger('Nickname')
    if (!isValNickname) {
      setIsCheckingNickname(false)
      return
    }

    const nowUserNickname = getValues('Nickname')

    try {
      const response = await getJoinCheckNickname(nowUserNickname)
      if (response.data && response.data.message === 'success') {
        setNicknameCheckMessage('사용 가능한 닉네임입니다.')
        setNicknameCheckStatus('success')
        setValidationStatus('success')
        trigger('Nickname')
      } else {
        setNicknameCheckMessage(response.data?.message || '이미 사용 중인 닉네임입니다.')
        setNicknameCheckStatus('error')
        setValidationStatus('error')
        trigger('Nickname')
      }
    } catch (error) {
      console.error('Nickname 중복 확인 중 오류:', error.message)
      setNicknameCheckMessage(error?.message || '닉네임 확인 중 오류가 발생했습니다.')
      setNicknameCheckStatus('error')
      setValidationStatus('error')
      trigger('Nickname')
    } finally {
      setIsCheckingNickname(false)
    }
  }

  const buttonLabel = isCheckingNickname
    ? '확인 중...'
    : nicknameCheckStatus === 'success'
      ? '사용가능'
      : '중복확인'

  const handleInputChange = (e) => {
    if (nicknameCheckMessage) setNicknameCheckMessage('')
    if (nicknameCheckStatus) {
      setNicknameCheckStatus(null)
      setValidationStatus(null)
    }
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col w-full gap-2 sm:flex-row'>
        <div className='flex-auto'>
          <LabelWithInput
            label='닉네임'
            placeholder='특수문자를 제외하고 최소2~ 8자까지 입력'
            size='biggest'
            {...register('Nickname', {
              required: '닉네임을 입력하세요',
              pattern: {
                value: /^[a-zA-Z0-9가-힣]{2,8}$/,
                message: '아이디는 문자,숫자로 2~8자만 가능합니다.',
              },
              onChange: handleInputChange,
            })}
          />
        </div>
        <div className='flex items-end  sm:w-[148px]'>
          <Button
            size='biggest'
            label={buttonLabel}
            bgColor={nowUserNicknameValue ? 'main-pink' : 'light-gray'}
            onClick={handleCheckNickname}
            disabled={!nowUserNicknameValue || isCheckingNickname}
          />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.Nickname && <p className='text-sm text-error-red'>{errors.Nickname.message}</p>}
        {nicknameCheckMessage && (
          <p
            className={`${nicknameCheckStatus === 'success' ? 'text-blue-500' : 'text-error-red'} text-sm`}
          >
            {nicknameCheckMessage}
          </p>
        )}
      </div>
    </div>
  )
}

export default NicknameInput

import { useState } from 'react'
import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'
import { getJoinCheckNickname } from '../../services/Join'

const NicknameInput = ({ register, errors, trigger, getValues, watch }) => {
  const [isCheckingNickname, setIsCheckingNickname] = useState(false) // 중복 확인 중 로딩 상태
  const [idCheckMessage, setIdCheckMessage] = useState('') // 중복 확인 결과 메시지
  const [idCheckStatus, setIdCheckStatus] = useState(null) // 'success' or 'error'

  const nowUserNicknameValue = watch('Nickname')

  // 중복 확인 버튼 클릭 핸들러
  const handleCheckNickname = async () => {
    setIdCheckMessage('') // 이전 메시지 초기화
    setIdCheckStatus(null)
    setIsCheckingNickname(true) // 로딩 시작

    // 1. 'userID' 필드만 유효성 검사 실행
    const isValNickname = await trigger('Nickname') // true 또는 false 반환

    // 2. 유효성 검사 실패 시 함수 종료 (오류 메시지는 react-hook-form이 표시)
    if (!isValNickname) {
      setIsCheckingNickname(false)
      return
    }

    // 3. 유효성 검사 통과 시 현재 아이디 값 가져오기
    const nowUserNickname = getValues('Nickname')

    // 4. 백엔드 API 호출
    try {
      const response = await getJoinCheckNickname(nowUserNickname)
      console.log('닉네임 API 응답 데이터:', response.data)

      if (response.data && response.data.message === 'success') {
        setIdCheckMessage('사용 가능한 닉네임임입니다.')
        setIdCheckStatus('success')
      } else {
        setIdCheckMessage(response.data?.message || '이미 사용 중인 닉네임입니다.')
        setIdCheckStatus('error')
      }
    } catch (error) {
      console.error('Nickname 중복 확인 중 오류:', error)
    } finally {
      setIsCheckingNickname(false)
    }
  }

  // 버튼 라벨 결정 로직
  const buttonLabel = isCheckingNickname
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
        {errors.Nickname && <p className='text-red-500 text-[14px]'>{errors.Nickname.message}</p>}
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

export default NicknameInput

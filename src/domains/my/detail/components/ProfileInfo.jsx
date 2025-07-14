import { useState } from 'react'
import Spinner from '../../../../components/web/Spinner'
import { useForm } from 'react-hook-form'

const ProfileInfo = ({ title, content, edit, text, onSave, serverError, onCheckNickname }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isCheckingNickname, setIsCheckingNickname] = useState(false)
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('')
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError,
    clearErrors,
    getValues,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: content,
    },
  })

  const nowNickname = watch('nickname')
  const hasNicknameChanged = nowNickname !== content
  const isSaveButtonDisabled = !isValid || !hasNicknameChanged || nicknameCheckStatus !== 'success'

  const onSubmit = (data) => {
    if (onSave && nicknameCheckStatus === 'success') {
      onSave(data.nickname)
      setIsEditing(false)
      reset({ nickname: data.nickname })
      setNicknameCheckMessage('')
      setNicknameCheckStatus(null)
    }
  }

  const handleDisabledSaveClick = () => {
    clearErrors('nickname')
    if (!hasNicknameChanged) {
      setError('nickname', {
        type: 'custom',
        message: '변경 사항이 없습니다.',
      })
    } else if (nicknameCheckStatus !== 'success') {
      setError('nickname', {
        type: 'custom',
        message: '닉네임 중복 확인을 먼저 완료해주세요.',
      })
    } else if (!isValid) {
      setError('nickname', {
        type: 'custom',
        message: '닉네임 양식을 확인해주세요. (2~8자, 특수문자 제외)',
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    reset({ nickname: content })
    setNicknameCheckMessage('')
    setNicknameCheckStatus(null)
  }

  const handleCheckNickname = async () => {
    setNicknameCheckMessage('')
    setNicknameCheckStatus(null)
    setIsCheckingNickname(true)

    const isValidNickname = await trigger('nickname')
    if (!isValidNickname) {
      setIsCheckingNickname(false)
      return
    }

    const nickname = getValues('nickname')
    try {
      const response = await onCheckNickname(nickname)
      if (response.data && response.data.message === 'success') {
        setNicknameCheckMessage('사용 가능한 닉네임입니다.')
        setNicknameCheckStatus('success')
      } else {
        setNicknameCheckMessage(response.data?.message || '이미 사용 중인 닉네임입니다.')
        setNicknameCheckStatus('error')
      }
    } catch (error) {
      setNicknameCheckMessage(error.message || '닉네임 확인 중 오류가 발생했습니다.')
      setNicknameCheckStatus('error')
    } finally {
      setIsCheckingNickname(false)
      trigger('nickname')
    }
  }

  const handleInputChange = () => {
    if (nicknameCheckMessage) setNicknameCheckMessage('')
    if (nicknameCheckStatus) setNicknameCheckStatus(null)
    // 사용자가 다시 입력을 시작하면, '변경 사항 없음' 에러를 포함한 모든 에러를 지웁니다.
    if (errors.nickname) {
      clearErrors('nickname')
    }
  }

  return (
    <div>
      <div className='text-[22px] font-semibold flex mb-5'>{title}</div>
      <div className='flex justify-between py-2 text-lg border-b border-dark-gray'>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className='flex items-center w-full gap-2'>
            <div className='flex-1'>
              <input
                type='text'
                {...register('nickname', {
                  required: '닉네임은 필수입니다.',
                  minLength: {
                    value: 2,
                    message: '닉네임은 최소 2자 이상이어야 합니다.',
                  },
                  maxLength: {
                    value: 8,
                    message: '닉네임은 최대 8자까지 가능합니다.',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9가-힣]+$/,
                    message: '닉네임은 영문, 숫자, 한글만 사용 가능합니다.',
                  },
                  onChange: handleInputChange,
                })}
                className='w-full bg-transparent border-none outline-none focus:ring-0'
                placeholder='새 닉네임을 입력하세요'
              />
            </div>
            <div className='flex'>
              <button
                onClick={handleCheckNickname}
                disabled={!nowNickname || isCheckingNickname}
                className={`text-${nowNickname ? 'main-pink hover:bg-main-pink/10 ' : 'light-gray'} font-bold px-2 rounded-[5px] transition`}
              >
                {isCheckingNickname ? (
                  <Spinner size={20} color='light-gray' />
                ) : nicknameCheckStatus === 'success' ? (
                  '사용가능'
                ) : (
                  '중복확인'
                )}
              </button>
              <span
                onClick={() => isSaveButtonDisabled && handleDisabledSaveClick()}
                className='relative'
              >
                <button
                  type='submit'
                  disabled={isSaveButtonDisabled}
                  className={`font-bold cursor-pointer text-${!isSaveButtonDisabled ? 'main-pink' : 'dark-gray'} px-2 rounded-[5px] transition disabled:pointer-events-none `}
                >
                  저장
                </button>
              </span>
              <button
                type='button'
                onClick={handleCancel}
                className='font-bold text-dark-gray px-2 rounded-[5px] hover:bg-main-pink/10 transition'
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <span className='flex items-center '>{content}</span>
            {edit ? (
              <button
                onClick={() => setIsEditing(true)}
                className='font-bold text-main-pink px-2 rounded-[5px] hover:bg-main-pink/10 transition'
              >
                {edit}
              </button>
            ) : (
              <span className='flex flex-wrap px-2 font-bold cursor-default text-end text-main-pink break-keep overflow-wrap-break-word'>
                {text || ''}
              </span>
            )}
          </>
        )}
      </div>
      {(errors.nickname || serverError || nicknameCheckMessage) && (
        <div className='flex items-start mt-1'>
          {errors.nickname && (
            <p className='text-sm text-error-red' aria-live='polite'>
              {errors.nickname.message}
            </p>
          )}
          {serverError && (
            <p className='text-sm text-error-red' aria-live='polite'>
              {serverError}
            </p>
          )}
        </div>
      )}
      {nicknameCheckMessage && (
        <p
          className={`text-sm flex justify-start ${
            nicknameCheckStatus === 'success' ? 'text-blue-500' : 'text-error-red'
          }`}
          aria-live='polite'
        >
          {nicknameCheckMessage}
        </p>
      )}
    </div>
  )
}

export default ProfileInfo

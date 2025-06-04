import { useForm } from 'react-hook-form'
import InputBox from '../../../../components/web/InputBox'
import PwInputBox from '../../../../components/web/PwInputBox'
import Button from '../../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import PageTitle from '../../../Find/common/components/PageTitle'
import { useEffect, useState } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import DOMPurify from 'dompurify'
import useModalStore from '../../../../store/modal/useModalStore'
import useIsMobile from '../../../../hooks/header/useIsMobile'
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      userID: '',
      password: '',
    },
  })

  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { openModal } = useModalStore()
  const [saveLoginID, setSaveLoginID] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const savedID = localStorage.getItem('saveLoginID')
    if (typeof savedID === 'string' && savedID.length > 0) {
      const sanitizedID = DOMPurify.sanitize(savedID, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
      })
      setValue('userID', sanitizedID)
      setSaveLoginID(true)
    }
  }, [setValue])

  const onSubmit = async (data) => {
    try {
      await login(data)
      if (saveLoginID) {
        localStorage.setItem('saveLoginID', data.userID)
      } else {
        localStorage.removeItem('saveLoginID')
      }
      openModal({
        title: '로그인 성공',
        description: '메인 페이지로 이동합니다.',
        buttonLabel: '메인 페이지로',
        onButtonClick: () => navigate(ROUTER_PATHS.MAIN_PAGE),
      })
    } catch (error) {
      console.error('로그인 오류:', error)
      openModal({
        title: '로그인 실패',
        description:
          error.message === '인증 과정 중 오류 발생'
            ? '아이디 또는 비밀번호가 올바르지 않습니다.'
            : error.message,
        buttonLabel: '확인',
        onButtonClick: null,
      })
    }
  }

  const handleSaveLoginID = (e) => {
    setSaveLoginID(e.target.checked)
  }

  return (
    <div className='flex flex-col items-center'>
      {isMobile ? null : <PageTitle title='로그인' />}
      <form className='w-full max-w-[532px]' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex w-full mt-11'>
          <InputBox
            placeholder='아이디'
            size='big'
            {...register('userID', { required: '아이디를 입력하세요' })}
            aria-label='아이디 입력'
          />
        </div>
        {errors.userID && (
          <p className='flex items-start ml-4 text-red-500'>{errors.userID.message}</p>
        )}
        <div className='flex w-full mt-7'>
          <PwInputBox
            placeholder='비밀번호'
            size='big'
            {...register('password', { required: '비밀번호를 입력하세요' })}
            aria-label='비밀번호 입력'
          />
        </div>
        {errors.password && (
          <p className='flex items-start ml-4 text-red-500'>{errors.password.message}</p>
        )}
        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center gap-2 text-base sm:text-xl'>
            <input
              type='checkbox'
              name='SaveLoginID'
              checked={saveLoginID}
              onChange={handleSaveLoginID}
              className='flex w-6 h-6 cursor-pointer'
            />
            아이디 저장
          </div>
          <div className='flex gap-3 text-base font-medium sm:text-xl'>
            <button type='button' onClick={() => navigate(ROUTER_PATHS.FIND_ID)}>
              아이디 찾기
            </button>
            <span>|</span>
            <button type='button' onClick={() => navigate(ROUTER_PATHS.FIND_PW)}>
              비밀번호 찾기
            </button>
          </div>
        </div>
        <div className='mt-6'>
          <Button
            label='로그인'
            size='big'
            bgColor={isValid ? 'main-pink' : 'light-gray'}
            disabled={!isValid}
            type='submit'
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm

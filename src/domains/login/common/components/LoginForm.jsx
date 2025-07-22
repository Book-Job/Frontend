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
import ToastService from '../../../../services/toast/ToastService'
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

  const saveUserID = (userID) => {
    const encoded = btoa(encodeURIComponent(userID))
    localStorage.setItem('saveLoginID', encoded)
  }

  const loadUserID = () => {
    const encoded = localStorage.getItem('saveLoginID')
    if (encoded) {
      try {
        const decoded = decodeURIComponent(atob(encoded))
        const sanitizedID = DOMPurify.sanitize(decoded, {
          ALLOWED_TAGS: [],
          ALLOWED_ATTR: [],
        })
        return sanitizedID
      } catch (error) {
        console.error('복호화 오류:', error)
        localStorage.removeItem('saveLoginID')
        return null
      }
    }
    return null
  }

  useEffect(() => {
    const savedID = loadUserID()
    if (savedID) {
      setValue('userID', savedID)
      setSaveLoginID(true)
    }
  }, [setValue])

  const onSubmit = async (data) => {
    try {
      const sanitizedData = {
        userID: DOMPurify.sanitize(data.userID, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
        password: DOMPurify.sanitize(data.password, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }),
      }
      await login(sanitizedData)
      if (saveLoginID) {
        saveUserID(sanitizedData.userID)
      } else {
        localStorage.removeItem('saveLoginID')
      }
      ToastService.success('북잡에 오신 걸 환영해요!')
      navigate(ROUTER_PATHS.MAIN_PAGE)
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
      <form
        className='w-full max-w-[532px] sm:gap-4 gap-4 flex flex-col'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col w-full'>
          <InputBox
            placeholder='아이디'
            size='big'
            {...register('userID', { required: '아이디를 입력하세요' })}
            aria-label='아이디 입력'
          />
          {errors.userID && (
            <p className='flex items-start text-sm text-error-red'>{errors.userID.message}</p>
          )}
        </div>
        <div className='flex flex-col w-full'>
          <PwInputBox
            placeholder='비밀번호'
            size='big'
            {...register('password', { required: '비밀번호를 입력하세요' })}
            aria-label='비밀번호 입력'
          />
          {errors.password && (
            <p className='flex items-start text-sm text-error-red'>{errors.password.message}</p>
          )}
        </div>
        <div className='flex items-center justify-between '>
          <label className='flex items-center gap-2 text-sm cursor-pointer sm:text-base'>
            <input
              type='checkbox'
              name='SaveLoginID'
              checked={saveLoginID}
              onChange={handleSaveLoginID}
              className='flex w-5 h-5 cursor-pointer'
            />
            아이디 저장
          </label>
          <div className='flex gap-3 text-sm font-medium sm:text-base'>
            <button type='button' onClick={() => navigate(ROUTER_PATHS.FIND_ID)}>
              아이디 찾기
            </button>
            <span>|</span>
            <button type='button' onClick={() => navigate(ROUTER_PATHS.FIND_PW)}>
              비밀번호 찾기
            </button>
          </div>
        </div>
        <div className='mt-2'>
          <Button
            label='로그인'
            size='big'
            bgColor={isValid ? 'main-pink' : 'light-gray'}
            disabled={!isValid}
            className={isValid ? `hover:bg-dark-pink` : `hover:none`}
            type='submit'
          />
        </div>
      </form>
    </div>
  )
}

export default LoginForm

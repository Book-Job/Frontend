import { useForm } from 'react-hook-form'
import InputBox from '../../../../components/web/InputBox'
import PwInputBox from '../../../../components/web/PwInputBox'
import Button from '../../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import PageTitle from '../../../Find/common/components/PageTitle'
import Alert from '../../../../components/web/Alert'
import { useEffect, useState } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import DOMPurify from 'dompurify'
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue, // useForm에서 setValue 가져오기
  } = useForm({
    defaultValues: {
      userID: '', 
      password: '',
    },
  })

  const navigate = useNavigate()
  const { login } = useAuthStore() 
  const [saveLoginID, setSaveLoginID] = useState(false)
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    description: '',
    buttonLabel: '',
    onButtonClick: null,
  })

  // 페이지 로드 시 localStorage에서 saveLoginID 가져오기
  useEffect(() => {
    const savedID = localStorage.getItem('saveLoginID')
    if (typeof savedID === 'string' && savedID.length > 0) {
      const sanitizedID = DOMPurify.sanitize(savedID, {
        ALLOWED_TAGS: [], // 모든 HTML 태그 제거
        ALLOWED_ATTR: [], // 모든 속성 제거
      })
      setValue('userID', sanitizedID)
      setSaveLoginID(true)
    }
  }, [setValue])

  const onSubmit = async (data) => {
    console.log('로그인 데이터:', data)
    try {
      await login(data) // useAuthStore의 login 액션 호출
      if (saveLoginID) {
        localStorage.setItem('saveLoginID', data.userID)
      } else {
        localStorage.removeItem('saveLoginID')
      }
      setAlertState({
        isOpen: true,
        title: '로그인 성공',
        description: '메인 페이지로 이동합니다.',
        buttonLabel: '메인 페이지로',
        onButtonClick: () => navigate(ROUTER_PATHS.MAIN_PAGE),
      })
    } catch (error) {
      console.error('로그인 오류:', error)
      setAlertState({
        isOpen: true,
        title: '로그인 실패',
        description: error.message,
        buttonLabel: '확인',
        onButtonClick: null,
      })
    }
  }

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
  }
  const handleSaveLoginID = (e) => {
    setSaveLoginID(e.target.checked)
  }

  return (
    <div className='flex flex-col items-center'>
      <PageTitle title={'로그인'} />
      <form className='w-full max-w-[532px]'>
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
          <div className='flex gap-2 text-lg sm:text-2xl'>
            <input
              type='checkbox'
              name='SaveLoginID'
              checked={saveLoginID}
              onChange={handleSaveLoginID}
              className='flex w-6 h-6 mt-[5px]'
            />
            아이디 저장
          </div>
          <div className='flex gap-3 text-base font-medium sm:text-xl'>
            <button onClick={() => navigate(ROUTER_PATHS.FIND_ID)}>아이디 찾기</button>
            <span>|</span>
            <button onClick={() => navigate(ROUTER_PATHS.FIND_PW)}>비밀번호 찾기</button>
          </div>
        </div>
        <div className='mt-6'>
          <Button
            label='로그인'
            size='big'
            bgColor={isValid ? 'main-pink' : 'light-gray'}
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
            type='submit'
          />
        </div>
      </form>
      <Alert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        description={alertState.description}
        buttonLabel={alertState.buttonLabel}
        onButtonClick={alertState.onButtonClick}
      />
    </div>
  )
}

export default LoginForm

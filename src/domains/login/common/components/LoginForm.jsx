import { useForm } from 'react-hook-form'
import InputBox from '../../../../components/web/InputBox'
import PwInputBox from '../../../../components/web/PwInputBox'
import Button from '../../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import PageTitle from '../../../Find/common/components/PageTitle'
import Alert from '../../../../components/web/Alert'
import { postLoginData } from '../../services/userLoginServices'
import { useState } from 'react'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const navigate = useNavigate()

  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    description: '',
    buttonLabel: '',
    onButtonClick: null,
  })

  const onSubmit = async (data) => {
    console.log('로그인 데이터:', data)
    try {
      const response = await postLoginData(data)
      console.log('로그인 데이터 확인:', response.data)

      if (response.data && response.data.message === 'success') {
        console.log('로그인 성공:', response.data)
        setAlertState({
          isOpen: true,
          title: '로그인 성공',
          description: '메인 페이지로 이동합니다.',
          buttonLabel: '메인 페이지로',
          onButtonClick: (navigate) => navigate(ROUTER_PATHS.MAIN_PAGE),
        })
      } else {
        console.log('로그인 오류:', response.data)
        setAlertState({
          isOpen: true,
          title: '로그인 실패',
          description: '아이디 또는 비밀번호를 확인해주세요.',
          buttonLabel: '확인',
          onButtonClick: null, // 모달만 닫기
        })
      }
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

  return (
    <div className='flex flex-col items-center'>
      <PageTitle title={'로그인'} />
      <form className='w-full max-w-[532px]'>
        <div className='flex w-full mt-11'>
          <InputBox
            placeholder='아이디'
            size='big'
            {...register('userID', { required: '아이디를 입력하세요' })}
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
          />
        </div>
        {errors.password && (
          <p className='flex items-start ml-4 text-red-500'>{errors.password.message}</p>
        )}
        <div className='flex items-center justify-between mt-6'>
          <div className='flex gap-2 text-lg sm:text-2xl'>
            <input
              type='checkbox'
              name='SaveEmail'
              value='SaveEmail'
              className='flex w-6 h-6 mt-[5px]'
            />
            이메일 저장
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

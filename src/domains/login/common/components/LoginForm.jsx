import { useForm } from 'react-hook-form'
import InputBox from '../../../../components/web/InputBox'
import PwInputBox from '../../../../components/web/PwInputBox'
import Button from '../../../../components/web/Button'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('폼 데이터:', data)
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex text-[38px] font-bold'>로그인</div>
      <form>
        <div className='flex mt-11'>
          <InputBox
            placeholder='아이디'
            width={532}
            {...register('userID', { required: '아이디를 입력하세요' })}
          />
        </div>
        {errors.userID && (
          <p className='flex items-start ml-4 text-red-500'>{errors.userID.message}</p>
        )}
        <div className='flex mt-7'>
          <PwInputBox
            placeholder='비밀번호'
            width={532}
            {...register('password', { required: '비밀번호를 입력하세요' })}
          />
        </div>
        {errors.password && (
          <p className='flex items-start ml-4 text-red-500'>{errors.password.message}</p>
        )}
        <div className='flex items-center justify-between mt-6'>
          <div className='flex gap-2 text-2xl'>
            <input
              type='checkbox'
              name='SaveEmail'
              value='SaveEmail'
              className='flex w-6 h-6 mt-[5px]'
            />
            이메일 저장
          </div>
          <div className='flex gap-3 text-xl font-medium'>
            <button>아이디 찾기</button>
            <span>|</span>
            <button>비밀번호 찾기</button>
          </div>
        </div>
        <div className='mt-6'>
          <Button label='로그인' size='big' bgColor='light-gray' onClick={handleSubmit(onSubmit)} />
        </div>
      </form>
    </div>
  )
}

export default LoginForm

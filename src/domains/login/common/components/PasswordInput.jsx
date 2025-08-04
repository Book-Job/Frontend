import PwInputBox from '../../../../components/web/PwInputBox'

const PasswordInput = ({ register, errors, watch }) => {
  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <div className='mb-[11px] sm:text-[20px] text-base font-bold items-start'>비밀번호</div>
      <div className='flex flex-col w-full gap-3'>
        <div>
          <PwInputBox
            placeholder='영문 숫자 포함 최소 8자 이상을 입력해주세요'
            size='biggest'
            {...register('password', {
              required: '비밀번호를 입력하세요',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^()_-]{8,}$/,
                message: '비밀번호는 영문, 숫자 포함 8자 이상이어야 합니다.',
              },
            })}
          />
          <div className='flex items-start'>
            {errors.password && <p className='text-sm text-error-red'>{errors.password.message}</p>}
          </div>
        </div>
        <div>
          <PwInputBox
            placeholder='비밀번호 재입력'
            size='biggest'
            {...register('passwordCheck', {
              required: '비밀번호를 재입력하세요',
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <div className='flex items-start'>
            {errors.passwordCheck && (
              <p className='text-sm text-error-red'>{errors.passwordCheck.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordInput

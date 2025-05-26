import PwInputBox from '../../../../components/web/PwInputBox'

const NewPasswordInput = ({ register, errors, watch }) => {
  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <div className='mb-[11px] text-[20px] font-bold items-start'>새 비밀번호</div>
      <div className='flex flex-col w-full gap-3'>
        <div>
          <PwInputBox
            placeholder='비밀번호는 영문 숫자 포함 최소 8자 이상을 입력해주세요'
            size='biggest'
            {...register('newPassword', {
              required: '새로 사용할 비밀번호를 입력하세요',
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: '비밀번호는 영문과 숫자를 포함하여 최소 8자 이상이어야 합니다.',
              },
            })}
          />
          <div className='flex items-start'>
            {errors.newPassword && (
              <p className='text-red-500 text-[14px]'>{errors.newPassword.message}</p>
            )}
          </div>
        </div>
        <div>
          <PwInputBox
            placeholder='비밀번호 확인'
            size='biggest'
            {...register('passwordCheck', {
              required: '비밀번호를 재입력하세요',
              validate: (value) =>
                value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
            })}
          />
          <div className='flex items-start'>
            {errors.passwordCheck && (
              <p className='text-red-500 text-[14px]'>{errors.passwordCheck.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewPasswordInput

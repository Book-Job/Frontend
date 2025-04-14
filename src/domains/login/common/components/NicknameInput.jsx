import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'

const NicknameInput = ({ register, errors }) => {
  return (
    <div className='w-full'>
      <div className='flex w-full gap-2'>
        <div className='flex-auto'>
          <LabelWithInput
            label='닉네임'
            placeholder='특수문자를 제외하고 최소2~ 8자까지 입력'
            size='medium'
            {...register('Nickname', { required: '닉네임을 입력하세요' })}
          />
        </div>
        <div className='flex items-end  w-[148px]'>
          <Button size='small' label='중복확인' bgColor='light-gray' />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.Nickname && <p className='text-red-500 text-[14px]'>{errors.Nickname.message}</p>}
      </div>
    </div>
  )
}

export default NicknameInput

import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'

const IDInput = ({ register, errors }) => {
  return (
    <div className='w-full'>
      <div className='flex w-full gap-2'>
        <div className='flex-auto'>
          <LabelWithInput
            label='아이디'
            placeholder='영문,숫자만 사용이 가능합니다. 최소4~12자까지'
            size='medium'
            {...register('userID', { required: '아이디를 입력하세요' })}
          />
        </div>
        <div className='flex items-end w-[148px]'>
          <Button size='small' label='중복확인' bgColor='light-gray' onClick={()=>{}} />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.userID && <p className='text-red-500 text-[14px]'>{errors.userID.message}</p>}
      </div>
    </div>
  )
}

export default IDInput

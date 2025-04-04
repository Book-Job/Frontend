import Button from '../../../../components/web/Button'
import LabelWithInput from '../../../../components/web/LabelWithInput'

const IDInput = ({ register, errors }) => {
  return (
    <div>
      <div className='flex gap-2'>
        <LabelWithInput
          label='아이디'
          placeholder='영문,숫자만 사용이 가능합니다. 최소4~12자까지'
          width={324}
          {...register('userID', { required: '아이디를 입력하세요' })}
        />
        <div className='flex items-end'>
          <Button size='small' label='중복확인' bgColor='light-gray' />
        </div>
      </div>
      <div className='flex items-start'>
        {errors.userID && <p className='text-red-500'>{errors.userID.message}</p>}
      </div>
    </div>
  )
}

export default IDInput

import FormItem from '../FormItem'
import { employmentTypes } from '../../utils/employmentTypes'
const EmploymentType = ({ register, errors }) => {
  return (
    <FormItem label='근무형태' dot={true} name='employmentType'>
      <select
        className='w-full h-[56px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
        {...register('employmentType', { required: '근무형태는 필수입니다' })}
      >
        <option value=''>선택하세요</option>
        {employmentTypes.map((type) => (
          <option value={type.value} key={type.value}>
            {type.label}
          </option>
        ))}
      </select>
      <div className='flex items-start'>
        {errors.employmentType && (
          <span className='text-error-red text-sm mt-1'>근무형태 선택은 필수입니다.</span>
        )}
      </div>
    </FormItem>
  )
}

export default EmploymentType

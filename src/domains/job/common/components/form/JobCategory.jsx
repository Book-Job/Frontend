import FormItem from '../FormItem'
import { jobCategories } from '../../utils/jobCategories'
const JobCategory = ({ register, errors, setValue, watch }) => {
  const jobCategory = watch('jobCategory')

  return (
    <div className='my-[30px]'>
      <FormItem label='직군' dot={true} register={register} name='jobCategory' required={true}>
        <select
          className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
          {...register('jobCategory', { required: '직군은 필수입니다' })}
        >
          <option value=''>직군을 선택하세요</option>
          {jobCategories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <div className='flex items-start'>
          {errors.jobCategory && (
            <span className='text-red-500 text-[14px] mt-1'>직군 선택은 필수입니다.</span>
          )}
        </div>
      </FormItem>

      {jobCategory === 'ETC' && (
        <FormItem
          label='직군 입력'
          dot={true}
          register={register}
          name='customJobCategory'
          required={true}
        >
          <input
            type='text'
            placeholder='직군을 직접 입력하세요'
            {...register('customJobCategory', { required: '직군을 입력해야 합니다' })}
            className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:outline-none focus:border-main-pink'
          />
        </FormItem>
      )}
    </div>
  )
}

export default JobCategory

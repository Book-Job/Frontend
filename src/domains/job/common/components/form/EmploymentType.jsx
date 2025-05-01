import FormItem from '../FormItem'

const EmploymentType = ({ register, errors }) => {
  return (
    <FormItem label='근무형태' dot={true} register={register} name='employmentType' required={true}>
      <select
        className='w-full h-[58px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none cursor-pointer'
        {...register('employmentType', { required: '근무형태는 필수입니다' })}
      >
        <option value=''>선택하세요</option>
        <option value='FULL_TIME'>정규직</option>
        <option value='TEMPORARY'>계약직</option>
        <option value='FREELANCE'>프리랜서</option>
        <option value='INTERN'>인턴</option>
      </select>
      <div className='flex items-start'>
        {errors.employmentType && (
          <span className='text-red-500 text-[14px] mt-1'>근무형태 선택은 필수입니다.</span>
        )}
      </div>
    </FormItem>
  )
}

export default EmploymentType

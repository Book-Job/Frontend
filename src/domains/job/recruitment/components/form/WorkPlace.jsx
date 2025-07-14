import FormItem from '../../../common/components/FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'
const WorkPlace = ({ register, errors }) => {
  return (
    <div className='my-[30px]'>
      <FormItem label='근무지역' dot={true} register={register} name='location' required={true}>
        <JobInputBox
          placeholder='ex) 서울시 마포구'
          {...register('location', { required: '근무지역은 필수입니다' })}
        />
        <div className='flex items-start'>
          {errors.location && (
            <span className='text-error-red text-sm mt-1'>근무지역은 필수입니다.</span>
          )}
        </div>
      </FormItem>
    </div>
  )
}
export default WorkPlace

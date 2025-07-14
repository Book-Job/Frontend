import FormItem from '../../../common/components/FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'

const WorkExperience = ({ register, errors }) => {
  return (
    <FormItem label='경력' dot={false}>
      <JobInputBox
        placeholder='ex) 신입 / 경력 3~5 년'
        {...register('experience', { required: '경력을 입력하세요' })}
      />

      <div className='flex items-start'>
        {errors.experience && (
          <span className='text-error-red text-sm mt-1'>{errors.experience.message}</span>
        )}
      </div>
    </FormItem>
  )
}

export default WorkExperience

import FormItem from '../../../common/components/FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'
const ContactEmail = ({ register, errors }) => {
  return (
    <FormItem label='연락 가능한 이메일' dot={false}>
      <JobInputBox placeholder='연락 가능한 이메일을 적어주세요' {...register('contactEmail')} />
      <div className='flex items-start'>
        {errors.contactEmail && (
          <span className='text-red-500 text-[14px] mt-1'>{errors.contactEmail.message}</span>
        )}
      </div>
    </FormItem>
  )
}
export default ContactEmail

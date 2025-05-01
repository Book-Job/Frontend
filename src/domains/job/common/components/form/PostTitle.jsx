import FormItem from '../FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'

const PostTitle = ({ register, errors }) => {
  return (
    <FormItem label='글 제목' dot={true} register={register} name='title' required={true}>
      <JobInputBox
        placeholder='글 제목을 입력해주세요'
        {...register('title', { required: '글 제목은 필수입니다' })}
      />
      <div className='flex items-start'>
        {errors.title && <span className='text-red-500 text-[14px] mt-1'>제목은 필수입니다.</span>}
      </div>
    </FormItem>
  )
}

export default PostTitle

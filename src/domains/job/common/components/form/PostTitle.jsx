import FormItem from '../FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'
import useTitleValidation from '../../../../../hooks/writePost/useTitleValidation'

const PostTitle = ({ register, errors }) => {
  const titleValidation = useTitleValidation()
  return (
    <FormItem label='글 제목' dot={true}>
      <JobInputBox
        {...register('title', titleValidation)}
        placeholder='글 제목을 입력하세요'
        className='w-full '
      />
      {errors.title && (
        <div className='self-start mt-1 text-sm text-error-red text-left'>
          {errors.title.message}
        </div>
      )}
    </FormItem>
  )
}

export default PostTitle

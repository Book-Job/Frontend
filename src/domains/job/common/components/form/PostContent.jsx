import FormItem from '../FormItem'
import { Controller } from 'react-hook-form'
import WriteEditor from '../../../../../components/common/WriteEditor'

const PostContent = ({ control, errors }) => {
  return (
    <FormItem label='내용' dot={true}>
      <Controller
        name='text'
        control={control}
        rules={{
          required: '내용은 필수입니다',
          validate: (value) => {
            const content = value.getCurrentContent?.()
            return (content && content.hasText()) || '내용은 필수입니다'
          },
        }}
        render={({ field }) => (
          <WriteEditor
            editorState={field.value}
            onEditorStateChange={field.onChange}
            placeholder='내용을 입력하세요'
          />
        )}
      />
      <div className='flex items-start'>
        {errors.text && (
          <span className='text-red-500 text-[14px] mt-1'>{errors.text.message}</span>
        )}
      </div>
    </FormItem>
  )
}
export default PostContent

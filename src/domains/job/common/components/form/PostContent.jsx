import FormItem from '../FormItem'
import { Controller } from 'react-hook-form'
import WriteEditor from '../../../../../components/common/editor/WriteEditor'

const PostContent = ({ control, errors }) => {
  return (
    <FormItem label='내용' dot={true}>
      <Controller
        name='text'
        control={control}
        rules={{
          required: '내용은 필수입니다',
          validate: (value) => {
            if (!value) return '내용은 필수입니다'
            const plain = value.replace(/<[^>]*>/g, '').trim()
            if (plain.length > 0) return true
            const hasImage = /<img\s+[^>]*src=['"][^'"]+['"][^>]*>/i.test(value)
            if (hasImage) return true
            return '내용은 필수입니다'
          },
        }}
        render={({ field }) => (
          <div className='w-full'>
            <WriteEditor value={field.value ?? ''} onChange={field.onChange} />
            {errors.text && (
              <span className='text-red-500 text-[14px] mt-1 block'>{errors.text.message}</span>
            )}
          </div>
        )}
      />
    </FormItem>
  )
}

export default PostContent

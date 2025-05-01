import FormItem from '../FormItem'
const PostContent = ({ register, errors }) => {
  return (
    <FormItem label='내용' dot={true} register={register} name='text' required={true}>
      <textarea
        placeholder='내용을 입력하세요'
        {...register('text', { required: '내용은 필수입니다' })}
        className='w-full  h-[360px] border border-dark-gray rounded-md px-4 py-4 focus:outline-none focus:border-main-pink'
      />
      <div className='flex items-start'>
        {errors.text && <span className='text-red-500 text-[14px] mt-1'>내용은 필수입니다.</span>}
      </div>
    </FormItem>
  )
}
export default PostContent

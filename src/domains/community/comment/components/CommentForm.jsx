import { useForm } from 'react-hook-form'

const CommentForm = ({ boardId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log('댓글 데이터:', data)
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <input
        {...register('nickname', { required: '닉네임은 필수입니다.' })}
        placeholder='닉네임을 입력하세요'
        className='border border-dark-gray rounded-md px-3 py-2 w-[171px] h-[58px] focus:outline-none focus:border-main-pink'
      />
      {errors.nickname && <p className='text-red-500 text-sm'>{errors.nickname.message}</p>}

      <textarea
        {...register('content', { required: '내용을 입력하세요.' })}
        placeholder='자유게시판에서는 닉네임 수정이 가능합니다.'
        className='border border-dark-gray rounded-md px-3 py-2 w-[754px] h-[58px] focus:outline-none focus:border-main-pink'
      />
      {errors.content && <p className='text-red-500 text-sm'>{errors.content.message}</p>}

      <button type='submit' className='bg-main-pink text-white px-4 py-2 rounded-md'>
        등록
      </button>
    </form>
  )
}

export default CommentForm

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { createPost } from '../../service/postService'
import FormItem from '../../../job/common/components/FormItem'
import JobInputBox from '../../../../components/web/JobInputBox'
import JobFormLine from '../../../job/common/components/JobFormLine'
import useAuthStore from '../../../../store/login/useAuthStore'

const WriteCommunityPostForm = () => {
  const { user } = useAuthStore()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (user?.nickname) {
      setValue('nickname', user.nickname)
    }
  }, [user, setValue])

  const onSubmit = async (data) => {
    try {
      await createPost(data)
      console.log('게시글 작성 성공')
      reset()
    } catch (err) {
      console.error('게시글 작성 실패', err)
    }
  }

  return (
    <form id='community-post-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={true}>
          <div className='flex flex-col w-full'>
            <JobInputBox
              {...register('nickname', { required: true })}
              placeholder='닉네임을 입력하세요'
              className='w-full sm:w-[171px]'
            />
            {errors.nickname && (
              <span className='self-start text-red-500 text-xs mt-1'>닉네임은 필수입니다</span>
            )}
          </div>
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='글 제목' dot={true}>
          <div className='flex flex-col w-full'>
            <JobInputBox
              {...register('title', { required: true })}
              placeholder='글 제목을 입력하세요'
              className='w-full'
            />
            {errors.title && (
              <span className='self-start text-red-500 text-xs mt-1'>제목은 필수입니다</span>
            )}
          </div>
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='내용' dot={true}>
          <div className='flex flex-col w-full'>
            <textarea
              {...register('text', { required: true })}
              placeholder='내용을 입력하세요'
              className='w-full mx-auto h-[360px] border border-dark-gray rounded-md px-4 py-4 focus:outline-none focus:border-main-pink resize-none'
            />

            {errors.text && (
              <span className='self-start text-red-500 text-xs mt-1'>내용은 필수입니다</span>
            )}
          </div>
        </FormItem>
      </div>
    </form>
  )
}

export default WriteCommunityPostForm

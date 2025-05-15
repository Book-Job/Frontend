import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../service/postService'
import FormItem from '../../../job/common/components/FormItem'
import JobInputBox from '../../../../components/web/JobInputBox'
import JobFormLine from '../../../job/common/components/JobFormLine'
import useAuthStore from '../../../../store/login/useAuthStore'
import TiptapEditor from '../../../../components/common/TiptapEditor'
const WriteCommunityPostForm = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    setValue: setFormValue,
    watch,
  } = useForm()

  useEffect(() => {
    if (user?.nickname) {
      setValue('nickname', user.nickname)
    }
  }, [user, setValue])

  const onSubmit = async (data) => {
    try {
      await createPost(data)
      alert('게시글이 등록되었습니다.')
      reset()
      navigate(ROUTER_PATHS.COMMUNITY)
    } catch (err) {
      console.error('게시글 작성 실패', err)
    }
  }

  const textValue = watch('text')

  return (
    <form id='community-post-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={true}>
          <div className='flex flex-col w-full'>
            <JobInputBox
              {...register('nickname', { required: true })}
              placeholder='닉네임을 입력하세요'
              className='self-start w-full'
            />
            {errors.nickname && (
              <span className='self-start text-red-500 text-[14px] mt-1'>닉네임은 필수입니다</span>
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
          <TiptapEditor
            value={textValue}
            onChange={(value) => setFormValue('text', value)}
            placeholder='내용을 입력하세요'
          />
          {errors.text && (
            <span className='self-start text-red-500 text-xs mt-1'>내용은 필수입니다</span>
          )}
        </FormItem>
      </div>
    </form>
  )
}

export default WriteCommunityPostForm

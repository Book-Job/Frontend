import React, { useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { createPost } from '../../service/postService'
import ToastService from '../../../../utils/toastService'
import FormItem from '../../../job/common/components/FormItem'
import JobInputBox from '../../../../components/web/JobInputBox'
import JobFormLine from '../../../job/common/components/JobFormLine'
import useAuthStore from '../../../../store/login/useAuthStore'
import WriteEditor from '../../../../components/common/WriteEditor'

const WriteCommunityPostForm = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const isMounted = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      title: '',
      text: EditorState.createEmpty(),
    },
  })

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (user?.nickname) {
      setValue('nickname', user.nickname)
    }
  }, [user, setValue])

  const onSubmit = async (data) => {
    const htmlText = draftToHtml(convertToRaw(data.text.getCurrentContent()))
    const postData = {
      nickname: data.nickname,
      title: data.title,
      text: htmlText,
    }
    try {
      await createPost(postData)
      if (isMounted.current) {
        ToastService.success('게시글이 등록되었습니다.')
        reset()
        navigate(ROUTER_PATHS.COMMUNITY)
      }
    } catch (err) {
      if (isMounted.current) {
        console.error('게시글 작성 실패', err)
        ToastService.error('게시글 작성에 실패했습니다.')
      }
    }
  }

  return (
    <form id='community-post-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='my-[30px]'>
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
          <div className='flex flex-col w-full'>
            <Controller
              name='text'
              control={control}
              rules={{
                required: '내용은 필수입니다',
                validate: (value) => {
                  const content = value.getCurrentContent()
                  return content.hasText() || '내용은 필수입니다'
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
            {errors.text && (
              <span className='self-start text-red-500 text-xs mt-1'>{errors.text.message}</span>
            )}
          </div>
        </FormItem>
      </div>
    </form>
  )
}

export default WriteCommunityPostForm

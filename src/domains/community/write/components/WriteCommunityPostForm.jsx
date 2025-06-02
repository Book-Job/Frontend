import React, { useEffect } from 'react'
import DOMPurify from 'dompurify'
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
import useDraftStore from '../../../../store/mypage/useDraftStore'
const WriteCommunityPostForm = ({ onSaveDraft }) => {
  const { user } = useAuthStore()
  const { selectedDraft, deleteDraft, clearSelectedDraft } = useDraftStore()
  const navigate = useNavigate()

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
  //원본
  // useEffect(() => {
  //   if (user?.nickname) {
  //     setValue('nickname', user.nickname)
  //   }
  // }, [user, setValue])

  // 선택된 임시저장 복원
  useEffect(() => {
    if (selectedDraft) {
      try {
        setValue('nickname', selectedDraft.nickname || user?.nickname || '')
        setValue('title', selectedDraft.title || '')
        setValue('text', useDraftStore.getState().getDraftEditorState(selectedDraft))
      } catch (error) {
        console.error('드래프트 복원 오류:', error)
        ToastService.error('임시 저장 데이터를 불러오지 못했습니다.')
      }
    } else if (user?.nickname) {
      setValue('nickname', user.nickname)
    }
  }, [selectedDraft, user, setValue])

  const onSubmit = async (data) => {
    const rawHtml = draftToHtml(convertToRaw(data.text.getCurrentContent()))
    const htmlText = DOMPurify.sanitize(rawHtml)
    const postData = {
      nickname: data.nickname,
      title: data.title,
      text: htmlText,
    }
    try {
      await createPost(postData)
      ToastService.success('게시글이 등록되었습니다.')
      if (selectedDraft) {
        // 추가
        deleteDraft(selectedDraft.id) // 선택된 드래프트 삭제
        clearSelectedDraft()
      } //여기까지
      reset()
      navigate(ROUTER_PATHS.COMMUNITY)
    } catch (err) {
      console.error('게시글 작성 실패', err)
      ToastService.error('게시글 작성에 실패했습니다.')
    }
  }
  // 임시 저장
  const handleSaveDraft = () => {
    const formData = {
      nickname: control._formValues.nickname || '',
      title: control._formValues.title || '',
      text: control._formValues.text,
    }
    try {
      const draftId = useDraftStore.getState().saveDraft(formData)
      ToastService.success('게시글이 임시 저장되었습니다.')
      onSaveDraft(draftId)
    } catch (error) {
      console.error('임시 저장 실패:', error)
      ToastService.error('임시 저장에 실패했습니다.')
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
              <span className='self-start mt-1 text-xs text-red-500'>제목은 필수입니다</span>
            )}
          </div>
        </FormItem>
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <FormItem label='내용' dot={true}>
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
            <span className='self-start mt-1 text-xs text-red-500'>{errors.text.message}</span>
          )}
        </FormItem>
      </div>
      <button type='button' onClick={handleSaveDraft} hidden />
    </form>
  )
}

export default WriteCommunityPostForm

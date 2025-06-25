import { useEffect, useRef, useState } from 'react'
import useCommunityPostForm from '../hook/useCommunityPostForm'
import DOMPurify from 'dompurify'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { createPost } from '../../service/postService'
import ToastService from '../../../../utils/toastService'
import FormItem from '../../../job/common/components/FormItem'
import JobInputBox from '../../../../components/web/JobInputBox'
import JobFormLine from '../../../job/common/components/JobFormLine'
import useAuthStore from '../../../../store/login/useAuthStore'
import WriteEditor from '../../../../components/common/editor/WriteEditor'
import useSaveDraft from '../../../../hooks/writePost/useSaveDraft'
import useFreeDraftStore from '../../../../store/mypage/useFreeDraftStore'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const WriteCommunityPostForm = ({ onSaveDraft }) => {
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  const { selectedFreeDraft, deleteFreeDraft, clearSelectedFreeDraft } = useFreeDraftStore()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const { register, handleSubmit, reset, setValue, getValues, errors } = useCommunityPostForm()
  const { handleSaveDraft } = useSaveDraft()
  const editorRef = useRef(null)
  const handleChange = (value) => {
    setContent(value)
  }

  useEffect(() => {
    if (selectedFreeDraft) {
      try {
        const nickname = selectedFreeDraft.nickname || user?.nickname || ''
        const title = selectedFreeDraft.title || ''
        const text = useFreeDraftStore.getState().getDraftEditorState(selectedFreeDraft) || ''
        setValue('nickname', nickname)
        setValue('title', title)
        setValue('text', text)
        setContent(text)
        if (editorRef.current) {
          editorRef.current.commands.setContent(text || '', false)
        }
      } catch (error) {
        console.error('임시저장 복원 오류:', error)
        ToastService.error('임시 저장 데이터를 불러오지 못했습니다.')
      }
    } else {
      setValue('nickname', user?.nickname || '')
      setValue('title', '')
      setValue('text', '')
      setContent('')
      if (editorRef.current) {
        editorRef.current.commands.setContent('', false)
      }
    }
  }, [selectedFreeDraft, user, setValue])

  const onSubmit = async (data) => {
    if (!content || content.trim() === '') {
      ToastService.error('내용은 필수입니다')
      return
    }
    const htmlText = DOMPurify.sanitize(content)
    const postData = {
      nickname: data.nickname,
      title: data.title,
      text: htmlText,
    }

    try {
      await createPost(postData)
      ToastService.success('게시글이 등록되었습니다.')
      if (selectedFreeDraft) {
        deleteFreeDraft(selectedFreeDraft.id)
        clearSelectedFreeDraft()
      }
      reset()
      setContent('')
      navigate(ROUTER_PATHS.COMMUNITY)
    } catch (err) {
      console.error('게시글 작성 실패', err)
      ToastService.error('게시글 작성에 실패했습니다.')
    }
  }

  const onSave = () => {
    const formValues = getValues()
    const editorHTML = editorRef.current?.getHTML() || content
    const formData = {
      nickname: formValues.nickname || '',
      title: formValues.title || '',
      text: editorHTML || '',
    }
    handleSaveDraft({
      formData,
      draftType: 'community',
    })
      .then((draftId) => {
        if (draftId) {
          navigate(ROUTER_PATHS.MY_DRAFTS)
        }
      })
      .catch((error) => {
        console.error('Save draft error:', error)
      })
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
      {!isMobile && <JobFormLine />}

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
      {!isMobile && <JobFormLine />}

      <div className='my-[30px]'>
        <FormItem label='내용' dot={true}>
          <WriteEditor
            initialContent={content}
            onChange={handleChange}
            value={content}
            ref={editorRef}
            placeholder='내용을 입력하세요'
          />
          {!content || content.trim() === '' ? (
            <span className='self-start block mt-1 text-xs text-left text-red-500'>
              내용은 필수입니다
            </span>
          ) : null}
        </FormItem>
      </div>
      <button type='button' onClick={onSave} hidden />
    </form>
  )
}

export default WriteCommunityPostForm

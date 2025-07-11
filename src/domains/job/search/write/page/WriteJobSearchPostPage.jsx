import WriteFormLine from '../../../../../components/web/WriteFormLine'
import WriteJobSearchPostingForm from '../../components/WriteJobSearchPostingForm'
import LastFormLine from '../../../common/components/LastFormLine'
import Button from '../../../../../components/web/Button'
import PinkButton from '../../../../../components/web/PinkButton'
import { createJobSeekPost } from '../../../common/service/postService'
import { usePostSubmit } from '../../../common/hook/usePostSubmit'
import useSaveDraft from '../../../../../hooks/writePost/useSaveDraft'
import { useEffect, useRef } from 'react'
import useFreeDraftStore from '../../../../../store/mypage/useFreeDraftStore'
import { useNavigate } from 'react-router-dom'
import ToastService from '../../../../../services/toast/ToastService'
import ROUTER_PATHS from '../../../../../routes/RouterPath'

const WriteJobSearchPostPage = () => {
  const { selectedFreeDraft } = useFreeDraftStore()
  const handleSubmitForm = usePostSubmit(createJobSeekPost)
  const { handleSaveDraft } = useSaveDraft()
  const navigate = useNavigate()
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && !editorRef.current.getHTML) {
      console.error('구직 Editor ref is not properly initialized')
    }
  }, [])

  const handleSaveDraftClick = () => {
    const form = document.getElementById('job-search-post-form')
    if (!form) {
      console.error('Form not found')
      ToastService.error('저장할 내용이 없습니다.')
      return
    }
    const contentElement = form.querySelector('[name="text"]')
    const content = editorRef.current ? editorRef.current.getHTML() : contentElement?.value || ''

    const formValues = {
      writer: form.querySelector('[name="writer"]').value,
      title: form.querySelector('[name="title"]').value,
      employmentType: form.querySelector('[name="employmentType"]').value,
      jobCategory: form.querySelector('[name="jobCategory"]').value,
      experience: form.querySelector('[name="experience"]').value,
      contactEmail: form.querySelector('[name="contactEmail"]').value,
      text: content,
    }
    if (selectedFreeDraft) {
      useFreeDraftStore.getState().updateFreeDraft(selectedFreeDraft.id, formValues)
      navigate(ROUTER_PATHS.MY_DRAFTS)
    } else {
      handleSaveDraft({
        formData: formValues,
        draftType: 'jobSeekings',
      }).catch((error) => {
        console.error('Save draft error:', error)
        ToastService.error('임시 저장에 실패했습니다.')
      })
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
        <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px]'>구직 글 등록</h1>
        <div className='text-[12px] sm:text-[14px] font-bold text-error-red self-end'>
          닉네임과 이메일은 회원가입 시 입력한 정보로 자동 설정됩니다.
        </div>
        <WriteFormLine />
        <WriteJobSearchPostingForm onSubmit={handleSubmitForm} editorRef={editorRef} />
        <LastFormLine />
        <div className='flex justify-end mb-[131px]'>
          <Button
            size='small'
            label='임시저장'
            className='mr-[14px]'
            onClick={handleSaveDraftClick}
          />
          <PinkButton label='저장' type='submit' form='job-search-post-form' />
        </div>
      </div>
    </>
  )
}
export default WriteJobSearchPostPage

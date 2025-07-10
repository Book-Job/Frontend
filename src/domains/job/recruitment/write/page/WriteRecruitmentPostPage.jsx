import WriteFormLine from '../../../../../components/web/WriteFormLine'
import LastFormLine from '../../../common/components/LastFormLine'
import Button from '../../../../../components/web/Button'
import PinkButton from '../../../../../components/web/PinkButton'
import { createRecruitmentPost } from '../../../common/service/postService'
import { usePostSubmit } from '../../../common/hook/usePostSubmit'
import WriteRecruitmentPostingForm from './../../components/form/WriteRecruitmentPostingForm'
import useSaveDraft from '../../../../../hooks/writePost/useSaveDraft'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useFreeDraftStore from '../../../../../store/mypage/useFreeDraftStore'
import ROUTER_PATHS from '../../../../../routes/RouterPath'
import ToastService from '../../../../../services/toast/ToastService'
const WriteRecruitmentPostPage = () => {
  const { selectedFreeDraft } = useFreeDraftStore()
  const handleSubmitForm = usePostSubmit(createRecruitmentPost)
  const { handleSaveDraft } = useSaveDraft()
  const navigate = useNavigate()
  const editorRef = useRef(null)

  useEffect(() => {
    if (editorRef.current && !editorRef.current.getHTML) {
      console.error('구인 Editor ref is not properly initialized')
    }
  }, [])

  const handleSaveDraftClick = () => {
    const form = document.getElementById('recruitment-post-form')
    if (!form) {
      console.error('Form not found')
      ToastService.error('저장할 내용이 없습니다.')
      return
    }
    const contentElement = form.querySelector('[name="text"]')
    const content = editorRef.current ? editorRef.current.getHTML() : contentElement?.value || ''

    const formValues = {
      writer: form.querySelector('[name="writer"]')?.value || '',
      title: form.querySelector('[name="title"]')?.value || '',
      closingDate: form.querySelector('[name="closingDate"]')?.value || '',
      websiteUrl: form.querySelector('[name="websiteUrl"]')?.value || '',
      location: form.querySelector('[name="location"]')?.value || '',
      jobCategory: form.querySelector('[name="jobCategory"]')?.value || '',
      employmentType: form.querySelector('[name="employmentType"]')?.value || '',
      experienceMin: form.querySelector('[name="experienceMin"]')?.value || '',
      experienceMax: form.querySelector('[name="experienceMax"]')?.value || '',
      text: content,
    }
    if (selectedFreeDraft) {
      useFreeDraftStore.getState().updateFreeDraft(selectedFreeDraft.id, formValues)
      navigate(ROUTER_PATHS.MY_DRAFTS)
    } else {
      handleSaveDraft({
        formData: formValues,
        draftType: 'jobPostings',
      }).catch((error) => {
        console.error('Save draft error:', error)
        ToastService.error('임시 저장에 실패했습니다.')
      })
    }
  }

  return (
    <>
      <div className='flex flex-col gap-4 max-w-[1440px] w-full px-4 sm:px-10 lg:px-[250px] mx-auto'>
        <h1 className='hidden sm:block text-3xl font-bold self-start mt-[50px]'>구인 글 등록</h1>
        <div className='text-[12px] sm:text-[14px] font-bold text-red-500 self-end'>
          닉네임과 이메일은 회원가입 시 입력한 정보로 자동 설정됩니다.
        </div>
        <WriteFormLine />
        <WriteRecruitmentPostingForm onSubmit={handleSubmitForm} editorRef={editorRef} />
        <LastFormLine />
        <div className='flex justify-end mb-[131px]'>
          <Button
            size='small'
            label='임시저장'
            className='mr-[14px]'
            onClick={handleSaveDraftClick}
          />
          <PinkButton label='등록' type='submit' form='recruitment-post-form' />
        </div>
      </div>
    </>
  )
}

export default WriteRecruitmentPostPage

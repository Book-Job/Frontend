import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import JobFormLine from '../../../common/components/JobFormLine'
import PersonalInfo from '../../../common/components/form/PersonalInfo'
import PostTitle from '../../../common/components/form/PostTitle'
import PostContent from '../../../common/components/form/PostContent'
import EmploymentType from '../../../common/components/form/EmploymentType'
import JobCategory from '../../../common/components/form/JobCategory'
import ClosingDate from './ClosingDate'
import CompanyWebsite from './CompanyWebsite'
import WorkPlace from './WorkPlace'
import Experience from './Experience'
import useAuthStore from '../../../../../store/login/useAuthStore'
import useIsMobile from '../../../../../hooks/header/useIsMobile.js'
import useFreeDraftStore from '../../../../../store/mypage/useFreeDraftStore.js'

const WriteRecruitmentPostingForm = ({ onSubmit, editorRef }) => {
  const { selectedFreeDraft, deleteFreeDraft, clearSelectedFreeDraft } = useFreeDraftStore()
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    selectedFreeDraft: {
      writer: user?.nickname || '',
      ...selectedFreeDraft,
    },
  })

  useEffect(() => {
    if (selectedFreeDraft && user?.nickname) {
      const writerToSet = selectedFreeDraft.writer || user.nickname
      reset({
        ...selectedFreeDraft,
        writer: writerToSet,
      })
    }
  }, [selectedFreeDraft, user, reset, editorRef])

  const handleFormSubmit = (formData) => {
    if (formData.closingDate && !formData.closingDate.includes('T')) {
      formData.closingDate = `${formData.closingDate}T00:00:00`
    }
    onSubmit(formData)
    if (selectedFreeDraft) {
      deleteFreeDraft(selectedFreeDraft.id)
      clearSelectedFreeDraft()
    }
  }

  return (
    <form id='recruitment-post-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <PersonalInfo register={register} />
      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <ClosingDate control={control} />
      </div>
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <CompanyWebsite register={register} />
      </div>
      {!isMobile && <JobFormLine />}
      <WorkPlace register={register} errors={errors} />
      {!isMobile && <JobFormLine />}
      <JobCategory register={register} errors={errors} watch={watch} setValue={setValue} />
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <EmploymentType register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <Experience register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <PostContent control={control} errors={errors} name='text' editorRef={editorRef} />
      </div>
    </form>
  )
}

export default WriteRecruitmentPostingForm

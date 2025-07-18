import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import JobFormLine from '../../common/components/JobFormLine'
import PersonalInfo from '../../common/components/form/PersonalInfo'
import PostTitle from '../../common/components/form/PostTitle'
import PostContent from '../../common/components/form/PostContent'
import EmploymentType from '../../common/components/form/EmploymentType'
import JobCategory from '../../common/components/form/JobCategory'
import WorkExperience from './form/WorkExperience'
import ContactEmail from './form/ContactEmail'
import useAuthStore from '../../../../store/login/useAuthStore'
import useIsMobile from '../../../../hooks/header/useIsMobile'
import useFreeDraftStore from '../../../../store/mypage/useFreeDraftStore'
import PropTypes from 'prop-types'

const WriteJobSearchPostingForm = ({ onSubmit, editorRef, defaultValues }) => {
  const { selectedFreeDraft, deleteFreeDraft, clearSelectedFreeDraft } = useFreeDraftStore()
  const { user } = useAuthStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      writer: user?.nickname || '',
      title: '',
      employmentType: '',
      jobCategory: '',
      workExperience: '',
      contactEmail: '',
      text: '',
      ...defaultValues,
    },
  })

  useEffect(() => {
    if (defaultValues && user?.nickname) {
      const writerToSet = defaultValues.writer || user.nickname
      reset({
        ...defaultValues,
        writer: writerToSet,
      })
    }
  }, [defaultValues, user, reset, editorRef])

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
    <form id='job-search-post-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <PersonalInfo register={register} />

      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>

      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <EmploymentType register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}
      <div className='my-[30px]'>
        <JobCategory register={register} errors={errors} watch={watch} />
      </div>
      {!isMobile && <JobFormLine />}

      <div className='my-[30px]'>
        <WorkExperience register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}

      <div className='my-[30px]'>
        <ContactEmail register={register} errors={errors} />
      </div>
      {!isMobile && <JobFormLine />}

      <div className='my-[30px]'>
        <PostContent control={control} errors={errors} name='text' editorRef={editorRef} />
      </div>
    </form>
  )
}

WriteJobSearchPostingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  editorRef: PropTypes.object.isRequired,
  defaultValues: PropTypes.object,
}
export default WriteJobSearchPostingForm

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

const WriteJobSearchPostingForm = ({ defaultValues, onSubmit }) => {
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
  }, [defaultValues, user, reset])

  const handleFormSubmit = (formData) => {
    onSubmit(formData)
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
        <PostContent control={control} errors={errors} />
      </div>
    </form>
  )
}

export default WriteJobSearchPostingForm

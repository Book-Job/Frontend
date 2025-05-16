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
const WriteJobSearchPostingForm = ({ defaultValues, onSubmit }) => {
  const { user } = useAuthStore()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  return (
    <form id='job-search-post-form' onSubmit={handleSubmit(onSubmit)}>
      <PersonalInfo register={register} />

      <JobFormLine />
      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>

      <JobFormLine />
      <div className='my-[30px]'>
        <EmploymentType register={register} errors={errors} />
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <JobCategory register={register} errors={errors} watch={watch} />
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <WorkExperience register={register} errors={errors} />
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <ContactEmail register={register} errors={errors} />
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <PostContent register={register} errors={errors} />
      </div>
    </form>
  )
}

export default WriteJobSearchPostingForm

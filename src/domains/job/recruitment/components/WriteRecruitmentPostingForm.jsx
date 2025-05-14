import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import JobFormLine from '../../common/components/JobFormLine'
import PersonalInfo from '../../common/components/form/PersonalInfo'
import PostTitle from '../../common/components/form/PostTitle'
import PostContent from '../../common/components/form/PostContent'
import EmploymentType from '../../common/components/form/EmploymentType'
import JobCategory from '../../common/components/form/JobCategory'
import ClosingDate from './form/ClosingDate'
import CompanyWebsite from './form/CompanyWebsite'
import WorkPlace from './form/WorkPlace'
import Experience from './form/Experience'
import useAuthStore from '../../../../store/login/useAuthStore'

const WriteRecruitmentPostingForm = ({ defaultValues, onSubmit }) => {
  const { user } = useAuthStore()
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues })

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    }
  }, [defaultValues, reset])

  useEffect(() => {
    if (user?.nickname) {
      setValue('writer', user.nickname)
    }
  }, [user, setValue])

  return (
    <form id='recruitment-post-form' onSubmit={handleSubmit(onSubmit)}>
      <PersonalInfo register={register} />

      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>

      <JobFormLine />

      <div className='my-[30px]'>
        <ClosingDate register={register} setValue={setValue} />
      </div>

      <JobFormLine />

      <div className='my-[30px]'>
        <CompanyWebsite register={register} />
      </div>

      <JobFormLine />

      <WorkPlace register={register} errors={errors} />

      <JobFormLine />

      <JobCategory register={register} errors={errors} watch={watch} setValue={setValue} />

      <JobFormLine />

      <div className='my-[30px]'>
        <EmploymentType register={register} errors={errors} />
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <Experience register={register} errors={errors} />
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <PostContent register={register} errors={errors} />
      </div>
    </form>
  )
}

export default WriteRecruitmentPostingForm

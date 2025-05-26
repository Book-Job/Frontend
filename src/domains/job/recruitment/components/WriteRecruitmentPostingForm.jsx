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
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

const WriteRecruitmentPostingForm = ({ onSubmit, defaultValues }) => {
  const { user } = useAuthStore()

  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      writer: user?.nickname || '',
      ...defaultValues,
    },
  })

  const closingDateValue = watch('closingDate')

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
    if (formData.text && formData.text.getCurrentContent) {
      const rawContent = convertToRaw(formData.text.getCurrentContent())
      formData.text = draftToHtml(rawContent)
    }
    if (formData.closingDate) {
      formData.closingDate = `${formData.closingDate}T00:00:00`
    }

    onSubmit(formData)
  }

  return (
    <form id='recruitment-post-form' onSubmit={handleSubmit(handleFormSubmit)}>
      <PersonalInfo register={register} />
      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <ClosingDate control={control} />
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
        <PostContent control={control} errors={errors} />
      </div>
    </form>
  )
}

export default WriteRecruitmentPostingForm

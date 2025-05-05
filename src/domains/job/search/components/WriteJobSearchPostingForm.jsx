import { useForm } from 'react-hook-form'
import { createJobSeekPost } from '../../service/postService'
import JobFormLine from '../../common/components/JobFormLine'
import PersonalInfo from '../../common/components/form/PersonalInfo'
import PostTitle from '../../common/components/form/PostTitle'
import PostContent from '../../common/components/form/PostContent'
import EmploymentType from '../../common/components/form/EmploymentType'
import JobCategory from '../../common/components/form/JobCategory'
import WorkExperience from './form/WorkExperience'
import ContactEmail from './form/ContactEmail'

const WriteJobSearchPostingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createJobSeekPost(data)
      console.log('게시글 작성 성공')
    } catch (err) {
      console.error('게시글 작성 실패', err)
    }
  }

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
        <JobCategory register={register} errors={errors} watch={watch} setValue={setValue} />
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

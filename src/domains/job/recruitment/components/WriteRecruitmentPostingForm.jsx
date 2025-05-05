import { useForm } from 'react-hook-form'
import { createRecruitmentPost } from '../../service/postService'
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

const WriteRecruitmentPostingForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createRecruitmentPost(data)
      console.log('게시글 작성 성공')
    } catch (err) {
      console.error('게시글 작성 실패', err)
    }
  }

  return (
    <form id='recruitment-post-form' onSubmit={handleSubmit(onSubmit)}>
      <PersonalInfo register={register} />

      <div className='my-[30px]'>
        <PostTitle register={register} errors={errors} />
      </div>

      <JobFormLine />

      <div className='my-[30px]'>
        <ClosingDate register={register} />
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

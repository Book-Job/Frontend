import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom'
import Experience from './form/Experience'
import useAuthStore from '../../../../store/login/useAuthStore'
import ROUTER_PATHS from '../../../../routes/RouterPath'

const WriteRecruitmentPostingForm = () => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (user?.nickname) {
      setValue('writer', user.nickname)
    }
  }, [user, setValue])

  const onSubmit = async (data) => {
    try {
      await createRecruitmentPost(data)
      alert('게시글이 등록되었습니다.')
      reset()
      navigate(ROUTER_PATHS.JOB_MAIN)
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

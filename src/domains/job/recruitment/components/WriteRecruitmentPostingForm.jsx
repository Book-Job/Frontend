import { useForm } from 'react-hook-form'
import { createPost } from '../service/postService'
import JobFormLine from '../../common/components/JobFormLine'
import JobInputBox from '../../../../components/web/JobInputBox'
import FormItem from '../../common/components/FormItem'

const WriteRecruitmentPostingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createPost(data)
      console.log('게시글 작성 성공')
    } catch (err) {
      console.error('게시글 작성 실패', err)
    }
  }

  return (
    <form id='recruitment-post-form' onSubmit={handleSubmit(onSubmit)}>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={false} register={register} name='nickname'>
          <div className='flex flex-col w-full'>
            <JobInputBox
              placeholder='받아올거임'
              className='w-full sm:w-[171px]'
              {...register('nickname', { required: '닉네임은 필수입니다' })}
            />
          </div>
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='이메일' dot={false} register={register} name='email' required={true}>
          <JobInputBox
            placeholder='받아올거임'
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일을 입력해주세요',
              },
            })}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='구인 / 구직' dot={true} register={register} name='type' required={true}>
          <div className='w-full flex justify-start'>
            <select
              className='border border-dark-gray w-[157px] h-[58px] p-2 rounded-md cursor-pointer'
              {...register('type', { required: '구인/구직은 필수 선택입니다' })}
            >
              <option value='구인'>구인</option>
              <option value='구직'>구직</option>
            </select>
          </div>
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='글 제목' dot={true} register={register} name='title' required={true}>
          <JobInputBox
            placeholder='ex) 아이들나라 편집자 구해요'
            {...register('title', { required: '글 제목은 필수입니다' })}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='구인마감' dot={false} register={register} name='endDate'>
          <JobInputBox
            placeholder='미선택시 채용시 마감으로 자동 입력됩니다.'
            {...register('endDate')}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='근무지역' dot={true} register={register} name='location' required={true}>
          <JobInputBox
            placeholder='ex) 강남구~ xxx'
            {...register('location', { required: '근무지역은 필수입니다' })}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='근무형태' dot={false} register={register} name='workType'>
          <JobInputBox placeholder='ex) 신입 / 경력 3~5 년' {...register('workType')} />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='직군' dot={true} register={register} name='jobCategory' required={true}>
          <JobInputBox
            placeholder='gildong@naver.com'
            {...register('jobCategory', { required: '직군은 필수입니다' })}
          />
        </FormItem>{' '}
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='경력' dot={true} register={register} name='experience' required={true}>
          <JobInputBox
            placeholder='gildong@naver.com'
            {...register('experience', { required: '경력은 필수입니다' })}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='내용' dot={true} register={register} name='content' required={true}>
          <textarea
            placeholder='내용을 입력하세요'
            {...register('content', { required: '내용은 필수입니다' })}
            className='w-full sm:w-[686px] h-[360px] border border-dark-gray rounded-md px-4 py-4 focus:outline-none focus:border-main-pink'
          />
          {errors.text && (
            <span className='self-start text-red-500 text-xs mt-1'>내용은 필수입니다</span>
          )}
        </FormItem>
      </div>
    </form>
  )
}

export default WriteRecruitmentPostingForm

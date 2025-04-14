import { useForm } from 'react-hook-form'
import { createPost } from '../service/postService'
import JobLabel from '../../../../components/web/JobLabel'
import JobFormLine from '../../common/components/JobFormLine'
import JobInputBox from '../../../../components/web/JobInputBox'
import FormItem from '../../common/components/FormItem'

const WriteJobSearchPostingForm = () => {
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
    <form id='job-search-post-form' onSubmit={handleSubmit(onSubmit)}>
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
              className='border border-dark-gray w-full  h-[58px] p-2 rounded-md cursor-pointer focus:outline-none focus:border-main-pink'
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
        <FormItem label='글 제목' dot={true}>
          <JobInputBox
            placeholder='ex) 아이들나라 편집자 구해요'
            {...register('title', { required: '글 제목은 필수입니다' })}
          />
          {errors.title && <span className='text-red-500 text-xs'>{errors.title.message}</span>}
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='근무형태' dot={false}>
          <div className='w-full flex justify-start flex-col'>
            <select
              className='border border-dark-gray w-full h-[58px] p-2 rounded-md cursor-pointer focus:outline-none focus:border-main-pink'
              {...register('workType', { required: '근무형태를 선택하세요' })}
            >
              <option value='정규직'>정규직</option>
              <option value='계약직'>계약직</option>
              <option value='인턴'>인턴</option>
            </select>
            {errors.workType && (
              <span className='text-red-500 text-xs mt-1'>{errors.workType.message}</span>
            )}
          </div>
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='직군' dot={true}>
          <div className='w-full flex justify-start'>
            <select
              className='border border-dark-gray w-full h-[58px] p-2 rounded-md cursor-pointer focus:outline-none focus:border-main-pink'
              {...register('jobCategory', { required: '직군을 선택하세요' })}
            >
              <option value='편집자'>편집자</option>
              <option value='디자이너'>디자이너</option>
              <option value='일러스트레이터'>일러스트레이터</option>
            </select>
            {errors.jobCategory && (
              <span className='text-red-500 text-xs'>{errors.jobCategory.message}</span>
            )}
          </div>
        </FormItem>
      </div>
      <JobFormLine />

      <div className='my-[30px]'>
        <FormItem label='경력' dot={false}>
          <JobInputBox
            placeholder='ex) 신입 / 경력 3~5 년'
            {...register('experience', { required: '경력을 입력하세요' })}
          />
          {errors.experience && (
            <span className='text-red-500 text-xs'>{errors.experience.message}</span>
          )}
        </FormItem>{' '}
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='연락 가능한 이메일' dot={true}>
          <JobInputBox
            placeholder='gildong@naver.com'
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '유효한 이메일을 입력해주세요',
              },
            })}
          />
          {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='내용' dot={true}>
          <textarea
            placeholder='내용을 입력하세요'
            {...register('content', { required: '내용은 필수입니다' })}
            className='w-full h-[360px] border border-dark-gray rounded-md px-4 py-4 focus:outline-none focus:border-main-pink'
          />
          {errors.content && <span className='text-red-500 text-xs'>{errors.content.message}</span>}
        </FormItem>
      </div>
    </form>
  )
}

export default WriteJobSearchPostingForm

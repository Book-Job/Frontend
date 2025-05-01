import FormItem from '../FormItem'
import JobInputBox from '../../../../../components/web/JobInputBox'
import JobFormLine from '../JobFormLine'

//받아와야하는 데이터
const PersonalInfo = ({ register }) => {
  return (
    <>
      <div className='my-[10px]'>
        <FormItem label='닉네임' dot={false} register={register} name='writer'>
          <JobInputBox
            placeholder='ex) 홍길동'
            className='w-full sm:w-[171px]'
            {...register('writer', { required: '닉네임은 필수입니다' })}
          />
        </FormItem>
      </div>
      <JobFormLine />
      <div className='my-[30px]'>
        <FormItem label='이메일' dot={false} register={register} name='email'>
          <JobInputBox
            placeholder='example@email.com'
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
    </>
  )
}

export default PersonalInfo

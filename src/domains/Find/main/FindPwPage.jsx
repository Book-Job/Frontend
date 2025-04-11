import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import LabelWithInput from '../../../components/web/LabelWithInput'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/web/Button'

const FindPwPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log('폼 데이터:', data)
  }

  const navigate = useNavigate()
  return (
    <div>
      비밀번호 찾기
      <div className='flex flex-col items-center'>
        <PageTitle
          title={'비밀번호 찾기'}
          subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'}
        />
        <div className='flex justify-center w-full'>
          <PageBox>
            <div className='flex-auto'>
              <LabelWithInput
                label='아이디'
                type='text'
                placeholder='ex) bookjob'
                size='biggest'
                {...register('userId', { required: '이메일을 입력하세요' })}
              />
            </div>
            <div className='flex items-start'>
              {errors.userId && <p className='text-red-500 text-[14px]'>{errors.userId.message}</p>}
            </div>
            <div className='flex items-end mt-6'>
              <Button
                size='biggest'
                label='다음'
                bgColor='light-gray'
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </PageBox>
        </div>
      </div>
    </div>
  )
}

export default FindPwPage

import { useForm } from 'react-hook-form'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import InputEmail from '../common/components/InputEmail'
import OTPInput from '../common/components/OTPInput'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import Button from '../../../components/web/Button'

const FindIDPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('폼 데이터:', filteredData)
    navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)
  }

  const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center'>
      <PageTitle title={'아이디 찾기'} subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
      <div className='flex justify-center w-full justify-evenly'>
        <PageBox>
          <InputEmail register={register} errors={errors} watch={watch} setValue={setValue} />
          
          <div className='mt-6'>
            <OTPInput
              size='biggest'
              placeholder='이메일로 전송된 인증코드를 입력해주세요'
              startTimer={startTimer}
              onVerify={(code) => handleIsExpiredEmail(code)}
            />
          </div>
          <div className='mt-6 '>
            <Button
              size='biggest'
              label='확인'
              bgColor='light-gray'
              onClick={() => navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)}
            />
          </div>
        </PageBox>
      </div>
    </div>
  )
}

export default FindIDPage

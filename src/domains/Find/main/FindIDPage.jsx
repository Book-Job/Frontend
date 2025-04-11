import { useForm } from 'react-hook-form'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import InputEmail from '../common/components/InputEmail'
import OTPInput from '../common/components/OTPInput'

const FindIDPage = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('폼 데이터:', filteredData)
  }
  return (
    <div className='flex flex-col items-center'>
      <PageTitle title={'아이디 찾기'} subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
      <div className='flex justify-center w-full'>
        <PageBox>
          <InputEmail register={register} errors={errors} watch={watch} setValue={setValue} />
          <OTPInput />
        </PageBox>
      </div>
    </div>
  )
}

export default FindIDPage

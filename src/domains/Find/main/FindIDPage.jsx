import { useForm } from 'react-hook-form'
import EmailInput from '../../login/common/components/EmailInput'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'

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
      <PageBox>
        <EmailInput register={register} errors={errors} watch={watch} setValue={setValue} />
      </PageBox>
    </div>
  )
}

export default FindIDPage

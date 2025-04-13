import Button from '../../../../components/web/Button'
import { useForm } from 'react-hook-form'
import IDInput from './IDInput'
import NicknameInput from './NicknameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import PageTitle from './../../../Find/common/components/PageTitle'

const JoinForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('폼 데이터:', filteredData)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      {/* <h1 className='flex text-[28px] font-bold'>회원정보 입력</h1> */}
      <PageTitle title={'회원정보 입력'} />
      <div className='flex flex-col w-full max-w-[575px] gap-4'>
        <IDInput register={register} errors={errors} />
        <NicknameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} watch={watch} setValue={setValue} />
        <div className='flex flex-col gap-8'>
          <PasswordInput register={register} errors={errors} watch={watch} />
          <Button
            label='회원가입'
            size='biggest'
            bgColor='light-gray'
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  )
}

export default JoinForm

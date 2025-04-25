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
    trigger, // trigger 추가
    getValues, // getValues 추가
    formState: { errors },
  } = useForm({
    mode: 'onChange', // 선택사항: 실시간 유효성 검사를 원할 경우 추가
  })

  const onSubmit = (data) => {
    const { emailId, passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('폼 데이터:', filteredData)
  }

  return (
    <div className='flex flex-col items-center w-full'>
      <PageTitle title={'회원정보 입력'} />
      <div className='flex flex-col w-full max-w-[575px] gap-4'>
        <IDInput
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          watch={watch}
        />
        <NicknameInput
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          watch={watch}
        />
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

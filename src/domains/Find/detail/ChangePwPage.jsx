import { useForm } from 'react-hook-form'
import PageBox from '../common/components/PageBox'
import PageTitle from '../common/components/PageTitle'
import Button from '../../../components/web/Button'
import NewPasswordInput from '../common/components/NewPasswordInput'

const ChangePwPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const { passwordCheck, ...filteredData } = data // passwordCheck 필터링
    console.log('새 비밀번호:', filteredData)
    alert
  }
  return (
    <div>
      <PageTitle title={'비밀번호 변경'} />
      <div className='flex justify-center w-full'>
        <PageBox>
          <div className='flex justify-start text-3xl font-bold mb-9'>비밀번호 변경</div>
          <NewPasswordInput register={register} errors={errors} watch={watch} />
          <div className='mt-8'>
            <Button
              label='완료'
              size='biggest'
              bgColor='light-gray'
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </PageBox>
      </div>
    </div>
  )
}

export default ChangePwPage

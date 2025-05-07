import { useForm } from 'react-hook-form'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import InputEmail from '../common/components/InputEmail'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'
import Button from '../../../components/web/Button'
import { useState } from 'react'

const FindIDPage = () => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm()
  const [validationStatus, setValidationStatus] = useState(null)
  const navigate = useNavigate()

  const onSubmit = (data) => {
    if (validationStatus === 'success') {
      console.log('ID찾기 폼 데이터:', { email: data.email })
      navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <PageTitle title={'아이디 찾기'} subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
      <div className='flex w-full justify-evenly'>
        <PageBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputEmail
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              trigger={trigger}
              setValidationStatus={setValidationStatus}
            />
            <div className='mt-6'>
              <Button
                type='submit'
                size='biggest'
                label='확인'
                bgColor={validationStatus === 'success' ? 'main-pink' : 'light-gray'}
                disabled={validationStatus !== 'success'}
              />
            </div>
          </form>
        </PageBox>
      </div>
    </div>
  )
}

export default FindIDPage

import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import { useForm } from 'react-hook-form'
import InputBox from '../../../components/web/InputBox'
import Button from '../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../routes/RouterPath'

const FindPwCheckIDPage = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // setValue,
    trigger, // ✨ 추가
    getValues, // ✨ 필요한 경우 이메일 값 확인용
    formState: { errors },
  } = useForm()

  // 인증 버튼 클릭 핸들러 (이메일만 유효성 검사)
  const handleEmailAuth = async () => {
    const isValid = await trigger('userEmail')
    if (isValid) {
      const email = getValues('userEmail')
      console.log('이메일 인증 로직 실행:', email)
      // 여기에 인증 요청 API 호출 등을 넣으면 됨
    }
  }
  // 전체 인증 버튼 클릭 (두 개 필드 다 검사)
  const onSubmit = (data) => {
    console.log('폼 데이터:', data)
    navigate(ROUTER_PATHS.FIND_PW_CHANGE_PW)
  }

  const navigate = useNavigate()

  return (
    <div>
      입력한 아이디 존재 확인
      <PageTitle title={'비밀번호 찾기'} subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
      <div className='flex justify-center w-full'>
        <PageBox>
          <div>
            <div className='flex text-3xl font-bold'>임시 비밀번호 발급</div>
            <div className='flex my-5 text-xl'>
              <p>본인확인 이메일로 인증</p>
              <p className='text-main-pink'>
                {'('}ddc***@n****.com{')'}
              </p>
            </div>
            <div className='flex flex-col text-dark-gray'>
              <p className='flex'>본인확인 이메일 주소와 이력한 이메일 주소가 같아야,</p>
              <p className='flex'>임시비밀번호를 받을 수 있습니다.</p>
            </div>
            <div>
              <div className='flex flex-row gap-2 mt-7'>
                <div className='w-full'>
                  <InputBox
                    placeholder='이메일 주소를 입려해주세요'
                    size='medium'
                    {...register('userEmail', { required: '이메일 주소를 입려해주세요' })}
                  />
                  {errors.userEmail && (
                    <p className='flex items-start text-red-500'>{errors.userEmail.message}</p>
                  )}
                </div>
                <Button label='인증' size='small' bgColor='light-gray' onClick={handleEmailAuth} />
              </div>
              <div className='mt-7'>
                <InputBox
                  placeholder='이메일로 전송된 임시비밀번호를 입력해주세요'
                  size='biggest'
                  {...register('userEmailCheck', {
                    required: '이메일로 전송된 임시비밀번호를 입력해주세요',
                  })}
                />
                {errors.userEmailCheck && (
                  <p className='flex items-start text-red-500'>{errors.userEmailCheck.message}</p>
                )}
              </div>
              <div className='mt-7'>
                <Button
                  label='인증하기'
                  size='biggest'
                  bgColor='light-gray'
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </div>
        </PageBox>
      </div>
    </div>
  )
}

export default FindPwCheckIDPage

import Button from '../../../../components/web/Button'
import { useForm } from 'react-hook-form'
import IDInput from './IDInput'
import NicknameInput from './NicknameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import PageTitle from './../../../Find/common/components/PageTitle'
import { postJoinData } from '../../services/userJoinServices'
import Alert from '../../../../components/web/Alert'
import { useState } from 'react'
import ROUTER_PATHS from '../../../../routes/RouterPath'

const JoinForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // 선택사항: 실시간 유효성 검사를 원할 경우 추가
  })

  // 검증 상태 관리
  const [validationStatus, setValidationStatus] = useState({
    idCheck: null, // 'success' or 'error'
    nicknameCheck: null, // 'success' or 'error'
    emailCheck: null, // 'success' or 'error'
  })

  // 검증 상태 업데이트 함수
  const updateValidationStatus = (field, status) => {
    setValidationStatus((prev) => ({ ...prev, [field]: status }))
  }

  // 모든 검증 통과 여부 확인
  const isAllValid = () =>
    isValid &&
    validationStatus.idCheck === 'success' &&
    validationStatus.nicknameCheck === 'success' &&
    validationStatus.emailCheck === 'success'

  const onSubmit = (data) => {
    if (!isAllValid()) {
      setAlertState({
        isOpen: true,
        title: '검증 미완료',
        description: '아이디, 닉네임 중복 확인과 이메일 인증을 모두 완료해주세요.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
      return
    }

    const { emailId, passwordCheck, ...filteredData } = data
    console.log('폼 데이터:', filteredData)
    handleJoinData(filteredData)
  }

  const handleJoinData = async (filteredData) => {
    try {
      const response = await postJoinData(filteredData)
      console.log('가입 데이터 확인:', response.data)

      if (response.data && response.data.message === 'success') {
        console.log('가입 성공:', response.data)
        setAlertState({
          isOpen: true,
          title: '회원가입입 성공',
          description: '로그인페이지로 이동합니다.',
          buttonLabel: '로그인인 페이지로',
          onButtonClick: (navigate) => navigate(ROUTER_PATHS.LOGIN_MAIN),
        })
      } else {
        console.log('가입 오류:', response.data)
        setAlertState({
          isOpen: true,
          title: '회원가입 실패',
          description: '아이디 또는 비밀번호를 확인해주세요.',
          buttonLabel: '확인',
          onButtonClick: null, // 모달만 닫기
        })
      }
    } catch (error) {
      console.error('가입중 오류:', error)
    }
  }

  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    description: '',
    buttonLabel: '',
    onButtonClick: null,
  })
  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }))
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
          setValidationStatus={(status) => updateValidationStatus('idCheck', status)}
        />
        <NicknameInput
          register={register}
          errors={errors}
          trigger={trigger}
          getValues={getValues}
          watch={watch}
          setValidationStatus={(status) => updateValidationStatus('nicknameCheck', status)}
        />
        <EmailInput
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
          trigger={trigger}
          setValidationStatus={(status) => updateValidationStatus('emailCheck', status)}
        />
        <div className='flex flex-col gap-8'>
          <PasswordInput register={register} errors={errors} watch={watch} />
          <Button
            label='회원가입'
            size='biggest'
            bgColor={isAllValid() ? 'main-pink' : 'light-gray'}
            disabled={!isAllValid()}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
      <Alert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        description={alertState.description}
        buttonLabel={alertState.buttonLabel}
        onButtonClick={alertState.onButtonClick}
      />
    </div>
  )
}

export default JoinForm

import Button from '../../../../components/web/Button'
import { useForm } from 'react-hook-form'
import IDInput from './IDInput'
import NicknameInput from './NicknameInput'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import PageTitle from './../../../Find/common/components/PageTitle'
import useModalStore from '../../../../store/modal/useModalStore'
import { useState } from 'react'
import ROUTER_PATHS from '../../../../routes/RouterPath'
import { postJoinData } from '../../services/useJoinServices'
import { useNavigate } from 'react-router-dom'
import useIsMobile from '../../../../hooks/header/useIsMobile'
const JoinForm = () => {
  const navigate = useNavigate()
  const { openModal } = useModalStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  })

  const [validationStatus, setValidationStatus] = useState({
    idCheck: null,
    nicknameCheck: null,
    emailCheck: null,
  })

  const updateValidationStatus = (field, status) => {
    setValidationStatus((prev) => ({ ...prev, [field]: status }))
  }

  const isAllValid = () =>
    isValid &&
    validationStatus.idCheck === 'success' &&
    validationStatus.nicknameCheck === 'success' &&
    validationStatus.emailCheck === 'success'

  const onSubmit = (data) => {
    if (!isAllValid()) {
      openModal({
        title: '검증 미완료',
        description: '아이디, 닉네임 중복 확인과 이메일 인증을 모두 완료해주세요.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
      return
    }

    const { emailId, passwordCheck, ...filteredData } = data
    handleJoinData(filteredData)
  }

  const handleJoinData = async (filteredData) => {
    try {
      const response = await postJoinData(filteredData)

      if (response.data && response.data.message === 'success') {
        openModal({
          title: '회원가입 성공',
          description: '로그인페이지로 이동합니다.',
          buttonLabel: '로그인 페이지로',
          onButtonClick: () => navigate(ROUTER_PATHS.LOGIN_MAIN),
        })
      } else {
        openModal({
          title: '회원가입 실패',
          description: '아이디 또는 비밀번호를 확인해주세요.',
          buttonLabel: '확인',
          onButtonClick: null,
        })
      }
    } catch (error) {
      console.error('가입중 오류:', error)
      openModal({
        title: '회원가입 오류',
        description: '서버 오류가 발생했습니다. 다시 시도해주세요.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
    }
  }

  return (
    <div className='flex flex-col items-center w-full'>
      {isMobile ? null : <PageTitle title={'회원정보 입력'} />}
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
    </div>
  )
}

export default JoinForm

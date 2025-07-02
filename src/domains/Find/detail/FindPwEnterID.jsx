import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ROUTER_PATHS from '../../../routes/RouterPath'
import PageTitle from '../common/components/PageTitle'
import PageBox from '../common/components/PageBox'
import LabelWithInput from '../../../components/web/LabelWithInput'
import Button from '../../../components/web/Button'
import FindLink from '../common/components/FindLink'
import { getFindPW } from './../services/useFindPWServices'
import useModalStore from '../../../store/modal/useModalStore'
import useFindPWStore from '../../../store/find/useFindPWStore'
import useIsMobile from '../../../hooks/header/useIsMobile'

const FindPwEnterID = () => {
  const navigate = useNavigate()
  const [idCheckMessage, setIdCheckMessage] = useState()
  const [idCheckStatus, setIDCheckStatus] = useState(null)
  const { setFindPWMaskEmail } = useFindPWStore()
  const { openModal } = useModalStore()
  const isMobile = useIsMobile()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm()

  const onSubmit = (ID) => {
    handleFindID(ID.userID)
  }

  const handleFindID = async (ID) => {
    try {
      const response = await getFindPW(ID)
      if (response.data && response.data.message === 'success') {
        setIdCheckMessage('존재하는 아이디입니다.')
        setIDCheckStatus('success')
        setFindPWMaskEmail(response.data.data.maskedEmail)
        openModal({
          title: '아이디 확인 성공',
          description: '임시 비밀번호 발급 페이지로 이동합니다.',
          buttonLabel: '비밀번호 발급 페이지로',
          onButtonClick: () => navigate(ROUTER_PATHS.FIND_PW_CHECK_ID_PAGE),
        })
      } else {
        setIdCheckMessage(response.data?.message || '존재하지 않는 아이디입니다.')
        setIDCheckStatus('error')
        openModal({
          title: '아이디 확인 실패',
          description: '존재하지 않는 아이디입니다.',
          buttonLabel: '확인',
          onButtonClick: null,
        })
      }
    } catch (error) {
      console.error('아이디 확인 중 오류:', error)
      setIdCheckMessage(error?.message || '아이디디 확인 중 오류가 발생했습니다.')
      openModal({
        title: '아이디 확인 실패',
        description: '이메일 확인 중 오류가 발생했습니다.',
        buttonLabel: '확인',
        onButtonClick: null,
      })
    }
  }
  const formContent = (
    <div className='w-full'>
      <div className='flex justify-start text-3xl font-bold'>임시비밀번호 발급</div>
      <form className='mt-8 ' onSubmit={handleSubmit(onSubmit)}>
        <LabelWithInput
          label='아이디'
          type='text'
          placeholder='가입했던 이메일을 입력해주세요'
          size='biggest'
          {...register('userID', {
            required: '아이디를 입력하세요',
            pattern: {
              value: /^[a-zA-Z0-9]{4,12}$/,
              message: '아이디는 영문, 숫자로 4~12자만 가능합니다.',
            },
          })}
        />
        <div className='flex items-start'>
          {errors.userID && <p className='text-red-500 text-[14px]'>{errors.userID.message}</p>}
          {idCheckMessage && (
            <p
              className={`${idCheckStatus === 'success' ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
              aria-live='polite'
            >
              {idCheckMessage}
            </p>
          )}
        </div>
        <div className='mt-2 sm:mt-5'>
          <Button
            size='biggest'
            label='다음'
            bgColor={isValid ? 'main-pink' : 'light-gray'}
            disabled={!isValid}
            type='submit'
          />
        </div>
      </form>
      <div>
        <FindLink
          title={'가입한 아이디를 잊어버렸어요!'}
          onClick={() => navigate(ROUTER_PATHS.FIND_ID)}
          linkName={'아이디 찾기'}
        />
      </div>
    </div>
  )
  return (
    <div>
      <div className='flex flex-col items-center'>
        {isMobile ? (
          <PageTitle subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'} />
        ) : (
          <PageTitle
            title={'비밀번호 찾기'}
            subTitle={'북잡에서는 이메일로 본인인증을 진행합니다.'}
          />
        )}
        <div className='flex w-full justify-evenly'>
          {isMobile ? formContent : <PageBox>{formContent}</PageBox>}
        </div>
      </div>
    </div>
  )
}

export default FindPwEnterID

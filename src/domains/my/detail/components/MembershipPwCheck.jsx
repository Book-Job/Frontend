import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Button from '../../../../components/web/Button'
import { postPWCheck } from '../../services/userMyDataServices'
import { useState } from 'react'
import useAuthStore from '../../../../store/login/useAuthStore'
import { toast } from 'react-toastify'
import PwInputBox from '../../../../components/web/PwInputBox'

const MembershipPwCheck = ({ isOpen, onClose, onButtonClick, onSuccessAction }) => {
  const navigate = useNavigate()
  const [serverMessage, setServerMessage] = useState({ message: null, isSuccess: false })
  const [verifiedPW, setVerifiedPW] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setResetToken } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const onSubmit = async (data) => {
    const PW = data.userPW
    try {
      const response = await postPWCheck(PW)
      if (response.data && response.data.message === 'success') {
        setServerMessage({
          message: '비밀번호가 일치합니다.',
          isSuccess: true,
        })
        setVerifiedPW(PW)
        const { resetToken } = response.data.data || {}
        if (!resetToken) {
          toast.error('서버로부터 resetToken을 받지 못했습니다. 다시 시도해 주세요.')
          return
        }
        setResetToken(resetToken)
      } else {
        setServerMessage({
          message: response.data?.message || '비밀번호가 일치하지 않습니다.',
          isSuccess: false,
        })
      }
    } catch (error) {
      console.error('기존 비밀번호 확인 오류:', error)
      setServerMessage({
        message: error.message || '비밀번호 확인 중 오류가 발생했습니다.',
        isSuccess: false,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const handleButtonClick = () => {
    if (serverMessage.isSuccess && onSuccessAction) {
      onSuccessAction(navigate, verifiedPW)
    } else if (onButtonClick) {
      onButtonClick(navigate)
    }
    onClose()
  }

  return (
    <div className='fixed z-50 flex items-center justify-center inset-1'>
      <div className='fixed inset-0 bg-black opacity-50' onClick={onClose}></div>
      <div className='relative sm:w-full sm:max-w-xl  sm:py-16 py-10 px-10 mx-4 bg-white rounded-[5px] shadow-lg'>
        <h2 className='mb-4 text-2xl font-bold sm:text-3xl text-start sm:mb-7'>회원 탈퇴</h2>
        <p className='font-bold sm:text-xl text-dark-gray text-start'>
          북잡은 언제나 당신을 기다리고 있을게요.
          <br /> 다시 만날 날을 기대할게요!
        </p>
        <div className='flex justify-center'>
          <div className='flex-auto mt-7 sm:mt-10'>
            <div className='mb-[11px] sm:text-[20px] text-base font-bold text-start'>비밀번호</div>
            <PwInputBox
              label='비밀번호'
              placeholder='현재 비밀번호를 입력해주세요'
              size='biggest'
              {...register('userPW', { required: '현재 사용중인 비밀번호를 입력해 주세요.' })}
            />
          </div>
        </div>
        <div className='flex items-start'>
          {errors.userPW && <p className='text-red-500 text-[14px]'>{errors.userPW.message}</p>}
          {serverMessage.message && (
            <p
              className={`${serverMessage.isSuccess ? 'text-blue-500' : 'text-red-500'} text-[14px]`}
            >
              {serverMessage.message}
            </p>
          )}
        </div>
        <div className='flex items-end mt-6'>
          <Button
            size='biggest'
            label={isLoading ? '처리 중...' : '확인'}
            bgColor={serverMessage.isSuccess ? 'main-pink' : 'light-gray'}
            onClick={serverMessage.isSuccess ? handleButtonClick : handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default MembershipPwCheck

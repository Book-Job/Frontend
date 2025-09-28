import { useEffect, useState } from 'react'
import ToastService from '../../../../services/toast/ToastService'
import Button from '../../../../components/web/Button'
import PropTypes from 'prop-types'

const OTPInput = ({ placeholder, startTimer, timeLeft, onVerify }) => {
  const [code, setCode] = useState('')

  const isExpired = !startTimer || timeLeft <= 0

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  const handleVerify = () => {
    if (isExpired) {
      ToastService.info('시간이 만료되었습니다. 인증번호를 다시 요청해주세요.')
      return
    }

    if (!code) {
      ToastService.info('인증번호를 입력해주세요.')
      return
    }
    onVerify(code)
  }

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 640,
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='w-full max-w-[575px] sm:flex-row flex-col flex gap-2'>
      <div className='relative flex items-center w-full'>
        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          disabled={isExpired}
          className=' border border-dark-gray rounded sm:px-4 px-2 sm:text-base text-sm text-black placeholder:text-gray-8e8e8e focus:border-main-pink focus:outline-none w-full max-w-[575px] h-[56px]'
        />
        {startTimer && !isExpired && (
          <p className='absolute right-6 text-error-red'>{formatTime(timeLeft)}</p>
        )}
      </div>
      <Button
        label={'인증확인'}
        bgColor={code ? 'main-pink' : 'light-gray'}
        size={windowWidth >= 640 ? 'small' : 'biggest'}
        onClick={handleVerify}
        disabled={!code}
      />
    </div>
  )
}
OTPInput.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  startTimer: PropTypes.bool,
  timeLeft: PropTypes.number.isRequired,
  onVerify: PropTypes.func.isRequired,
}
export default OTPInput

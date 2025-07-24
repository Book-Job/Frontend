import { useEffect, useState } from 'react'
import ToastService from '../../../../services/toast/ToastService'
import Button from '../../../../components/web/Button'

const OTPInput = ({ size, placeholder, startTimer, onVerify }) => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(300)
  const [isExpired, setIsExpired] = useState(true)

  useEffect(() => {
    if (!startTimer || isExpired) {
      return
    }
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isExpired])

  useEffect(() => {
    if (!startTimer) {
      setTimeLeft(300)
      setIsExpired(true)
      setCode('')
    } else {
      setIsExpired(false)
    }
  }, [startTimer])
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
        size={window.innerWidth >= 640 ? 'small' : 'biggest'}
        onClick={handleVerify}
        disabled={!code}
      />
    </div>
  )
}

export default OTPInput

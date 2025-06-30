import { useEffect, useState } from 'react'
import ToastService from '../../../../services/toast/ToastService'

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
    <div className='w-full max-w-[575px]'>
      <div className='relative flex items-center w-full'>
        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={placeholder}
          disabled={isExpired}
          className=' border border-dark-gray rounded px-4 sm:text-base text-sm text-black placeholder:text-gray-8e8e8e focus:border-main-pink focus:outline-none w-full max-w-[575px] h-[58px]'
        />
        {startTimer && !isExpired && (
          <div className='absolute flex items-center right-6'>
            {code ? (
              <button
                onClick={handleVerify}
                disabled={isExpired || !code}
                className={`text-main-pink ${
                  isExpired || !code ? 'bg-gray-400 cursor-not-allowed' : 'hover:text-hover-pink'
                }`}
              >
                <span className='text-red-500'>{formatTime(timeLeft)}</span>{' '}
                <span className='px-3 py-1 rounded-[5px] hover:bg-main-pink/10 transition'>
                  인증
                </span>
              </button>
            ) : (
              <p className='text-red-500'>{formatTime(timeLeft)}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OTPInput

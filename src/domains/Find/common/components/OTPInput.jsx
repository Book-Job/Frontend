import { useEffect, useState } from 'react'
import Button from '../../../../components/web/Button'
import { useNavigate } from 'react-router-dom'
import ROUTER_PATHS from '../../../../routes/RouterPath'

const OTPInput = () => {
  const [code, setCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(10) // 3분
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  const handleVerify = () => {
    if (isExpired) {
      alert('시간이 만료되었습니다. 인증번호를 다시 요청해주세요.')
      return
    }

    // TODO: 인증번호 검증 로직 추가
    console.log('입력된 인증번호:', code)
  }

  const navigate = useNavigate()

  return (
    <div className='w-full max-w-[575px]'>
      <div className='relative flex items-center w-full mt-6'>
        <input
          type='text'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder='인증번호 입력'
          disabled={isExpired}
          className=' border border-dark-gray rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e focus:border-main-pink focus:outline-none w-full max-w-[575px] h-[58px]'
        />
        <p className='absolute items-center text-red-500 right-6'>{formatTime(timeLeft)}</p>
      </div>
      <div className='mt-6 '>
        <Button
          size='biggest'
          label='확인'
          bgColor='light-gray'
          onClick={() => navigate(ROUTER_PATHS.FIND_ID_COMPLETE_PAGE)}
        />
      </div>
    </div>
  )
}

export default OTPInput

import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
const SnsLogin = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4 mt-4 sm:mt-4 sm:gap-4'>
      <div className='flex flex-row justify-center w-full max-w-[532px] gap-7 items-center text-dark-gray'>
        <hr className='w-full border-[1px] ' />
        <span>OR</span>
        <hr className='w-full border-[1px]' />
      </div>
      <NaverLogin />
      <KakaoLogin />
    </div>
  )
}

export default SnsLogin

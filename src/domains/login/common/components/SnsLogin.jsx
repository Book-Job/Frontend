import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
const SnsLogin = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-2 mt-2 sm:mt-3 sm:gap-3'>
      <NaverLogin />
      <KakaoLogin />
    </div>
  )
}

export default SnsLogin

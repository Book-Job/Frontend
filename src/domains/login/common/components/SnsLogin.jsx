import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
const SnsLogin = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-5 mt-5'>
        <NaverLogin />
        <KakaoLogin />
    </div>
  )
}

export default SnsLogin

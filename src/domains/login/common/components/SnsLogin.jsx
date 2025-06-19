import KakaoLogin from './KakaoLogin'
import NaverLogin from './NaverLogin'
const SnsLogin = () => {
  return (
    <div className='mt-5 '>
      {/* <div className='flex items-center justify-center gap-5'>
        <hr className='w-1/3 border-1 border-dark-gray' />
        <span className='text-lg whitespace-normal sm:text-2xl text-dark-gray break-keep sm:max-w-none sm:whitespace-nowrap'>
          간편 로그인
        </span>
        <hr className='w-1/3 border-1 border-dark-gray' />
      </div> */}
      <div className='flex flex-col gap-5'>
        <NaverLogin />
        <KakaoLogin />
      </div>
    </div>
  )
}

export default SnsLogin

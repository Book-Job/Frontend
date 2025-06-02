import kakaoicon from '../../../../assets/icons/common/kakaoIcon.svg'
import navericon from '../../../../assets/icons/common/naverIcon.svg'
const SnsLogin = () => {
  const handleKakaoLogin = () => {
    window.location.href = 'http://43.200.107.80:8080/oauth2/authorization/kakao'
  }
  const handleNaverLogin = () => {
    window.location.href = 'http://43.200.107.80:8080/oauth2/authorization/naver'
  }
  return (
    <div className='mt-11'>
      <div className='flex items-center justify-center gap-5'>
        <hr className='w-1/3 border-1 border-dark-gray' />
        <span className='text-lg sm:text-2xl text-dark-gray font'>소셜 계정으로 간편 로그인</span>
        <hr className='w-1/3 border-1 border-dark-gray' />
      </div>
      <div className='flex justify-center gap-16 mt-9'>
        <button
          onClick={handleNaverLogin}
          className='transition-transform duration-200 rounded-full w-14 h-14 sm:w-20 sm:h-20 hover:scale-110 '
        >
          <img src={navericon} alt='네이버 로그인' />
        </button>
        <button
          onClick={handleKakaoLogin}
          className='transition-transform duration-200 rounded-full hover:scale-110 w-14 h-14 sm:w-20 sm:h-20'
        >
          <img src={kakaoicon} alt='카카오 로그인' />
        </button>
      </div>
    </div>
  )
}

export default SnsLogin

import navericon_s from '../../../../assets/icons/common/naverIcon_s.svg'

const NaverLogin = () => {
  const handleNaverLogin = () => {
    window.location.href = 'https://api.bookjob.co.kr/oauth2/authorization/naver'
  }
  return (
    <div className='w-full max-w-[532px] h-[56px] '>
      <button
        onClick={handleNaverLogin}
        className='bg-[#03C75A] w-full h-full rounded-[5px] items-center flex flex-row px-8 relative'
      >
        <img src={navericon_s} alt='네이버 로그인' className='h-[30%] absolute' />
        <span className='flex-grow text-base text-center text-white sm:text-lg'>네이버 로그인</span>
      </button>
    </div>
  )
}

export default NaverLogin

import navericon_s from '../../../../assets/icons/common/naverIcon_s.svg'

const NaverLogin = () => {
  const handleNaverLogin = () => {
    window.location.href = 'https://api.bookjob.co.kr/oauth2/authorization/naver'
  }
  return (
    <div className='w-full max-w-[532px] h-[58px] '>
      <button onClick={handleNaverLogin} className='bg-[#03C75A] gap-8 w-full h-full rounded-[5px] justify-center items-center flex flex-row'>
        <img src={navericon_s} alt='네이버 로그인' className='h-1/3' /> 
        <span className='text-xl text-white'>네이버 로그인</span>
      </button>
    </div>
  )
}

export default NaverLogin

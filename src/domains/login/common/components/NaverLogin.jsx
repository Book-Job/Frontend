import navericon from '../../../../assets/icons/common/naverIcon.svg'
import navericon_lg from '../../../../assets/icons/common/naverIcon_lg.png'
import useIsMobile from '../../../../hooks/header/useIsMobile'

const NaverLogin = () => {
  const isMobile = useIsMobile()
  const handleNaverLogin = () => {
    window.location.href = 'https://api.bookjob.co.kr/oauth2/authorization/naver'
  }
  return (
    <div className='bg-[#03C75A] max-w-[532px] h-[58px] rounded-[5px] flex justify-center'>
      <button onClick={handleNaverLogin} className=''>
        <img src={navericon_lg} alt='네이버 로그인' className='w-full h-[58px]' />
      </button>
    </div>
    // <div>
    //   <button
    //     onClick={handleNaverLogin}
    //     className='transition-transform duration-200 rounded-full w-14 h-14 sm:w-20 sm:h-20 hover:scale-110 '
    //   >
    //     {isMobile ? (
    //       <img src={navericon_lg} alt='네이버 로그인' className='w-auto h-36' />
    //     ) : (
    //       <img src={navericon} alt='네이버 로그인' />
    //     )}
    //   </button>
    // </div>
  )
}

export default NaverLogin

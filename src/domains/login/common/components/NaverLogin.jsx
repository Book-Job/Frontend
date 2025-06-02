import navericon from '../../../../assets/icons/common/naverIcon.svg'

const NaverLogin = () => {
  return (
    <div>
      <button className='transition-transform duration-200 rounded-full w-14 h-14 sm:w-20 sm:h-20 hover:scale-110 '>
        <img src={navericon} alt='네이버 로그인' />
      </button>
    </div>
  )
}

export default NaverLogin

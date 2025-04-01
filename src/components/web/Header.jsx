import PropTypes from 'prop-types'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
const Header = ({ login, onClick }) => {
  return (
    <div className='flex w-full h-[123px] items-center justify-between'>
      <div className='flex'>
        <span onClick={onClick} className='ml-[128px] text-[#E36397] text-[60px] font-logo'>
          bookjob
        </span>
        <span className='flex justify-around ml-[86px] gap-16 text-[25px]'>
          <button onClick={onClick} className=''>
            자유게시판
          </button>
          <button onClick={onClick}>구인/구직</button>
          <button onClick={onClick}>오픈채팅</button>
          <button onClick={onClick}>문의</button>
        </span>
      </div>
      {login ? (
        <button
          onClick={onClick}
          className='inline-flex bg-[#F4F6FA] mr-[128px] text-[20px] h-[52px] rounded-full items-center px-8'
        >
          <img src={babyChick} alt='arrowDown' className='mr-4 w-7 h-7' />
          <span className='font-bold'>{login}님</span>
          <img src={arrowDown} alt='arrowDown' className='w-5 h-5 ml-3' />
        </button>
      ) : (
        <span className='flex mr-[128px] gap-8 text-[20px]'>
          <button onClick={onClick} className='font-bold row text-[#E36397]'>
            로그인
          </button>
          <button onClick={onClick} className=''>
            회원가입
          </button>
        </span>
      )}
    </div>
  )
}

Header.propTypes = {
  login: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default Header

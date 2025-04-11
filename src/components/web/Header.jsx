import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'

const Header = ({ login, onClick }) => {
  const navigate = useNavigate()

  return (
    <div className='flex w-full h-auto md:h-[123px] items-center justify-between px-6 md:px-32 py-4 md:py-0 flex-col md:flex-row gap-4 md:gap-0'>
      <div className='flex flex-col md:flex-row items-center gap-4 md:gap-20'>
        <span
          onClick={() => navigate('/')}
          className='text-main-pink text-2xl md:text-[35px] font-logo cursor-pointer'
        >
          bookjob
        </span>
        <span className='flex gap-6 md:gap-16 text-sm md:text-[15px]'>
          <button onClick={() => navigate('/community')}>자유게시판</button>
          <button onClick={() => navigate('/job')}>구인/구직</button>
          <button onClick={onClick}>오픈채팅</button>
          <button onClick={onClick}>문의</button>
        </span>
      </div>
      {login ? (
        <button
          onClick={onClick}
          className='inline-flex bg-[#F4F6FA] text-sm md:text-[16px] h-[44px] md:h-[52px] rounded-full items-center px-6 md:px-8'
        >
          <img src={babyChick} alt='babyChick' className='mr-2 md:mr-4 w-6 h-6 md:w-7 md:h-7' />
          <span className='font-bold'>{login}님</span>
          <img src={arrowDown} alt='arrowDown' className='w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3' />
        </button>
      ) : (
        <span className='flex gap-6 md:gap-8 text-sm md:text-[16px]'>
          <button onClick={() => navigate('/loginMain')} className='font-bold text-main-pink'>
            로그인
          </button>
          <button onClick={() => navigate('/join')}>회원가입</button>
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

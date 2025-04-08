import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'

const Header = ({ login, onClick }) => {
  const navigate = useNavigate()

  return (
    <div className='flex w-full h-[123px] items-center justify-between'>
      <div className='flex'>
        <span
          onClick={() => navigate('/')}
          className='ml-[101px] text-main-pink text-[35px] font-logo cursor-pointer'
        >
          bookjob
        </span>
        <span className='flex justify-around ml-[86px] gap-16 text-[15px]'>
          <button onClick={() => navigate('/community')}>자유게시판</button>
          <button onClick={() => navigate('/job')}>구인/구직</button>
          <button onClick={onClick}>오픈채팅</button>
          <button onClick={onClick}>문의</button>
        </span>
      </div>
      {login ? (
        <button
          onClick={onClick}
          className='inline-flex bg-[#F4F6FA] mr-[128px] text-[16px] h-[52px] rounded-full items-center px-8'
        >
          <img src={babyChick} alt='arrowDown' className='mr-4 w-7 h-7' />
          <span className='font-bold'>{login}님</span>
          <img src={arrowDown} alt='arrowDown' className='w-5 h-5 ml-3' />
        </button>
      ) : (
        <span className='flex mr-[128px] gap-8 text-[16px]'>
          <button onClick={() => navigate('/loginMain')} className='font-bold row text-main-pink'>
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

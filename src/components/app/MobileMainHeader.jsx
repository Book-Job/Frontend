import PropTypes from 'prop-types'
import arrowDown from '../../assets/icons/common/common_arrow_down.svg'
import babyChick from '../../assets/icons/common/common_babyChick.svg'
import mobileMenu from '../../assets/icons/mobile/mobile_menu.svg'
const MobileMainHeader = ({ login, onClick }) => {
  return (
    <div className='flex w-full h-[50px] px-5 items-center justify-between'>
      <div onClick={onClick} className='flex text-[#E36397] font-bold text-2xl'>
        bookjob
      </div>
      <div className='flex text-base'>
        {login ? (
          <button
            onClick={onClick}
            className='inline-flex bg-[#F4F6FA] h-[30px] rounded-full items-center px-4'
          >
            <img src={babyChick} alt='arrowDown' className='w-5 h-5 mr-4' />
            <span className='font-bold '>{login}님</span>
            <img src={arrowDown} alt='arrowDown' className='w-3 h-3 ml-2' />
          </button>
        ) : (
          <div className='flex gap-5'>
            <button onClick={onClick} className='font-bold row'>
              로그인
            </button>
            <button onClick={onClick}>
              <img src={mobileMenu} alt='mobileMenu' className='w-5 h-5' />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

MobileMainHeader.propTypes = {
  login: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default MobileMainHeader

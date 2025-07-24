import PropTypes from 'prop-types'
import headerArrow from '../../assets/icons/mobile/mobile_header_arrow.svg'

const MobileHeader = ({ icon = headerArrow, label, onClick }) => {
  return (
    <header className='relative flex w-full h-[56px] '>
      <button className='absolute left-[24px] top-1/2 -translate-y-1/2' onClick={onClick}>
        <img src={icon} alt='뒤로가기 버튼' className='w-[12px] h-[24px]' />
      </button>
      <span className='text-[20px] font-bold text-center flex items-center justify-center w-full'>
        {label}
      </span>
    </header>
  )
}

MobileHeader.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MobileHeader

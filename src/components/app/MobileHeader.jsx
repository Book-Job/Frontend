import PropTypes from 'prop-types'

const MobileHeader = ({ icon, label, onClick }) => {
  return (
    <button className='flex items-center gap-[5px]' onClick={onClick}>
      <img src={icon} alt='뒤로가기 버튼' className='w-[7px] h-[12px] mr-[115px]' />
      <span className='text-[22px] font-bold'>{label}</span>
    </button>
  )
}

MobileHeader.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default MobileHeader

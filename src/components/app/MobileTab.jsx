import PropTypes from 'prop-types'

const MobileTab = ({ icon, label, onClick, active }) => {
  return (
    <button
      className={`flex items-center ${active ? 'text-[#000000]' : 'text-[#8e8e8e]'}`}
      onClick={onClick}
    >
      <img src={icon} alt='mobile tab icon' className='w-[20px] h-[20px] mr-[13px]' />
      <span className='text-[18px] font-semibold'>{label}</span>
    </button>
  )
}

MobileTab.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
}

MobileTab.defaultProps = {
  active: false,
}

export default MobileTab

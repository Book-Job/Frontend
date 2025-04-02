import PropTypes from 'prop-types'

const MainTab = ({ label, bgColor = '#D9d9d9', isSelected, onClick }) => {
  return (
    <button
      className='w-[157px] h-[57px] rounded-[30px]'
      style={{ backgroundColor: isSelected ? '#E36397' : bgColor }}
      onClick={() => onClick(label)}
    >
      <span className='font-medium text-[25px] text-white'>{label}</span>
    </button>
  )
}

MainTab.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MainTab

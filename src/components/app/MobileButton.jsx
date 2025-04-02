import PropTypes from 'prop-types'

const MobileButton = ({ label, size = 'big', bgColor = 'bg-gray-d9d9d9', onClick }) => {
  const buttonSize = {
    small: 'w-[92px] h-[45px] text-[16px]',
    big: 'w-[336px] h-[50px] text-[18px]',
  }

  return (
    <button
      className={`${buttonSize[size]} rounded-[5px]`}
      style={{ backgroundColor: bgColor }}
      onClick={() => onClick(label)}
    >
      <span className='font-bold text-white'>{label}</span>
    </button>
  )
}

MobileButton.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'big']),
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
}

export default MobileButton

import PropTypes from 'prop-types'

const Button = ({ label, size = 'medium', bgColor = '#d9d9d9', onClick }) => {
  const buttonSize = {
    small: 'w-[148px] h-[58px]',
    medium: 'w-[332px] h-[58px]',
    big: 'w-[532px] h-[58px]',
    biggest: 'w-[575px] h-[58px]',
  }

  return (
    <button
      className={`${buttonSize[size]} rounded-[5px]`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'big', 'biggest']),
  bgColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button

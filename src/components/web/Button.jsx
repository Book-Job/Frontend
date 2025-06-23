import PropTypes from 'prop-types'

const Button = ({ label, size = 'medium', onClick, bgColor = 'light-gray', className = '' }) => {
  const buttonSize = {
    small: 'w-full max-w-[148px] h-[58px]',
    semiMedium: 'w-full max-w-[205px] h-[58px]',
    medium: 'w-full max-w-[332px] h-[58px]',
    big: 'w-full max-w-[532px] h-[58px]',
    biggest: 'w-full max-w-[575px] h-[58px]',
  }

  return (
    <button
    type='button'
      className={`${buttonSize[size]} bg-${bgColor} rounded-[5px] ${className}`}
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
  className: PropTypes.string,
}

export default Button

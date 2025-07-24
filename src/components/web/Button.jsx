import PropTypes from 'prop-types'

const Button = ({
  label,
  size = 'medium',
  onClick,
  disabled = false,
  bgColor = 'light-gray',
  type = 'button',
  className = '',
}) => {
  const buttonSize = {
    small: 'w-full max-w-[148px] h-[56px]',
    semiMedium: 'w-full max-w-[205px] h-[56px]',
    medium: 'w-full max-w-[332px] h-[56px]',
    big: 'w-full max-w-[532px] h-[56px]',
    biggest: 'w-full max-w-[575px] h-[56px]',
  }

  return (
    <button
      type={type}
      className={`${buttonSize[size]} bg-${bgColor} rounded-[5px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='text-base font-bold text-white sm:text-lg'>{label}</span>
    </button>
  )
}
Button.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'big', 'biggest']),
  bgColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

export default Button

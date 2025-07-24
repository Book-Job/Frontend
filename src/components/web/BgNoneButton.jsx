import PropTypes from 'prop-types'

const BgNoneButton = ({
  label,
  size = 'small',
  onClick,
  disabled = false,
  type = 'button',
  textColor = 'main-pink',
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
      className={`${buttonSize[size]} rounded-[5px]`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`text-base font-bold text-${textColor} ${className} sm:text-lg`}>
        {label}
      </span>
    </button>
  )
}
BgNoneButton.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'big', 'biggest']),
  textColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
}

export default BgNoneButton

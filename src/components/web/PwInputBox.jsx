import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import viewGray from '../../assets/icons/common/common_view_gray.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
const PwInputBox = forwardRef(({ placeholder, size = 'medium', ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const PwInputBoxSize = {
    small: 'w-full max-w-[148px] h-[56px]',
    medium: 'w-full max-w-[424px] h-[56px]',
    big: 'w-full max-w-[532px] h-[56px]',
    biggest: 'w-full max-w-[575px] h-[56px]',
  }

  return (
    <div className='relative flex flex-col items-start justify-center w-full line-clamp-1'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`${PwInputBoxSize[size]} border border-dark-gray rounded sm:pl-4 pl-2 pr-12 sm:text-base text-sm text-black placeholder:text-dark-gray focus:border-main-pink focus:outline-none`}
        ref={ref}
        {...rest}
      />
      <button
        type='button'
        className='absolute right-5'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <img src={viewPink} className='w-6 h-6' alt='비밀번호 표시' />
        ) : (
          <img src={viewGray} className='w-6 h-6' alt='비밀번호 숨김' />
        )}
      </button>
    </div>
  )
})

PwInputBox.displayName = 'PwInputBox'

PwInputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default PwInputBox

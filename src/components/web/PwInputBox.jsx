import PropTypes from 'prop-types'
import { forwardRef, useState } from 'react'
import viewGray from '../../assets/icons/common/common_view_gray.svg'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
const PwInputBox = forwardRef(({ placeholder, size = 'medium', ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false)
  const PwInputBoxSize = {
    small: 'w-[148px] h-[58px]',
    medium: 'w-[424px] h-[58px]',
    big: 'w-[532px] h-[58px]',
    biggest: 'w-[575px] h-[58px]',
  }

  return (
    <div className='relative flex flex-col items-start justify-center line-clamp-1'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`${PwInputBoxSize[size]} border border-dark-gray rounded px-4 text-[16px] text-black placeholder:text-dark-gray focus:border-main-pink focus:outline-none`}
        ref={ref} // react-hook-form에서 사용할 ref 추가
        {...rest} // 기타 속성 전달
      />
      <button
        type='button'
        className='absolute right-5'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <img src={viewPink} className='w-6 h-6' />
        ) : (
          <img src={viewGray} className='w-6 h-6' />
        )}
      </button>
    </div>
  )
})

PwInputBox.displayName = 'PwInputBox' // forwardRef 사용 시 필요

PwInputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
}

export default PwInputBox

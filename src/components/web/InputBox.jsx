import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const InputBox = forwardRef(({ placeholder, size, ...rest }, ref) => {
  const InputBoxSize = {
    small: 'w-full max-w-[148px] h-[58px]',
    medium: 'w-full max-w-[424px] h-[58px]',
    big: 'w-full max-w-[532px] h-[58px]',
    biggest: 'w-full max-w-[575px] h-[58px]',
  }
  return (
    <div className='flex flex-col items-start justify-center w-full line-clamp-1'>
      <input
        placeholder={placeholder}
        className={`${InputBoxSize[size]} border border-dark-gray rounded px-4 text-[18px] text-black placeholder:text-dark-gray focus:border-main-pink focus:outline-none `}
        ref={ref} // react-hook-form에서 사용할 ref 추가
        {...rest} // 기타 속성 전달
      />
    </div>
  )
})

InputBox.displayName = 'InputBox' // forwardRef 사용 시 필요

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  width: PropTypes.number,
}

export default InputBox

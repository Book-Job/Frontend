import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const InputBox = forwardRef(({ placeholder, size, ...rest}, ref ) => {
  const InputBoxSize = {
    small: 'w-[148px] h-[58px]',
    medium: 'w-[424px] h-[58px]',
    big: 'w-[532px] h-[58px]',
    biggest: 'w-[575px] h-[58px]',
  }
  return (
    <div className='flex flex-col items-start justify-center line-clamp-1'>
      <input
        type='text'
        placeholder={placeholder}
        className={`${InputBoxSize[size]} border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e focus:border-main-color-pink focus:outline-none `}
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

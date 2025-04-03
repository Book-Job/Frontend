import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const InputBox = forwardRef(({ placeholder, width, active, ...rest}, ref ) => {

  return (
    <div className='flex flex-col items-start justify-center line-clamp-1'>
      <input
        type='text'
        placeholder={placeholder}
        style={{ width: `${width}px`, height: '58px' }}
        className='border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e focus:border-main-color-pink focus:outline-none '
        ref={ref} // react-hook-form에서 사용할 ref 추가
        {...rest} // 기타 속성 전달
      />
    </div>
  )
})

InputBox.displayName = 'InputBox' // forwardRef 사용 시 필요

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number,
}

export default InputBox

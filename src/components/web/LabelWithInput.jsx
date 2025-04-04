import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const LabelWithInput = forwardRef(({ placeholder, label, width, ...rest }, ref) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <span className='mb-[11px] text-[20px] font-bold'>{label}</span>
      <input
        type='text'
        placeholder={placeholder}
        style={{ width: `${width}px`, height: '44px' }}
        className='border border-gray-8e8e8e rounded px-4 text-[14px] text-black placeholder:text-gray-8e8e8e focus:border-main-color-pink focus:outline-none'
        ref={ref} // react-hook-form에서 사용할 ref 추가
        {...rest} // 기타 속성 전달
      />
    </div>
  )
})

LabelWithInput.displayName = 'LabelWithInput'

LabelWithInput.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default LabelWithInput

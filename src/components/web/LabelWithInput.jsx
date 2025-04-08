import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const LabelWithInput = forwardRef(({ placeholder, label, size, ...rest }, ref) => {
  const LabelWithInputBoxSize = {
    small: 'w-[234px] h-[58px]',
    medium: 'w-[419px] h-[58px]',
    big: 'w-[532px] h-[58px]',
    biggest: 'w-[575px] h-[58px]',
  }

  return (
    <div className='flex flex-col items-start justify-center'>
      <span className='mb-[11px] text-[20px] font-bold'>{label}</span>
      <input
        type='text'
        placeholder={placeholder}
        // style={{ width: `${width}px`, height: '58px' }}
        className={`${LabelWithInputBoxSize[size]} border border-dark-gray rounded px-4 text-[16px] text-black placeholder:text-dark-gray focus:border-main-color-pink focus:outline-none`}
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
  size: PropTypes.string.isRequired,
}

export default LabelWithInput

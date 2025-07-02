import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const LabelWithInput = forwardRef(({ placeholder, label, size, ...rest }, ref) => {
  const LabelWithInputBoxSize = {
    small: 'w-full max-w-[234px] h-[56px]',
    medium: 'w-full max-w-[419px] h-[56px]',
    big: 'w-full max-w-[532px] h-[56px]',
    biggest: 'w-full max-w-[575px] h-[56px]',
  }

  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <span className='mb-[11px] sm:text-[20px] text-base font-bold'>{label}</span>
      <input
        type='text'
        placeholder={placeholder}
        className={`${LabelWithInputBoxSize[size]} border border-dark-gray rounded sm:px-4 px-2 sm:text-base text-sm text-black placeholder:text-dark-gray focus:border-main-pink focus:outline-none`}
        ref={ref}
        {...rest}
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

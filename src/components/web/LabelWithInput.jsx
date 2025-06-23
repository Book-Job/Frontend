import PropTypes from 'prop-types'
import { forwardRef } from 'react'

const LabelWithInput = forwardRef(({ placeholder, label, size, ...rest }, ref) => {
  const LabelWithInputBoxSize = {
    small: 'w-full max-w-[234px] h-[58px]',
    medium: 'w-full max-w-[419px] h-[58px]',
    big: 'w-full max-w-[532px] h-[58px]',
    biggest: 'w-full max-w-[575px] h-[58px]',
  }

  return (
    <div className='flex flex-col items-start justify-center w-full'>
      <span className='mb-[11px] sm:text-[20px] text-base font-bold'>{label}</span>
      <input
        type='text'
        placeholder={placeholder}
        className={`${LabelWithInputBoxSize[size]} border border-dark-gray rounded px-4 sm:text-base text-sm text-black placeholder:text-dark-gray focus:border-main-pink focus:outline-none`}
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

import PropTypes from 'prop-types'
import React from 'react'

const JobInputBox = React.forwardRef(({ placeholder, className = '', ...props }, ref) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <input
        ref={ref}
        type='text'
        placeholder={placeholder}
        className={`w-full h-[56px] border border-dark-gray rounded px-4 text-black focus:border-main-pink focus:outline-none ${className}`}
        {...props}
      />
    </div>
  )
})

JobInputBox.displayName = 'JobInputBox'

JobInputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default JobInputBox

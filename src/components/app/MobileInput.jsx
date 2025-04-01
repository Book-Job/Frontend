import PropTypes from 'prop-types'

const MobileInput = ({ placeholder, size = 'big' }) => {
  const inputSize = {
    medium: 'w-[238px] h-[45px]',
    large: 'w-[336px] h-[45px]',
  }

  return (
    <div className='flex flex-col items-start justify-center ml-[16px]'>
      <input
        type='text'
        placeholder={placeholder}
        className={`${inputSize[size]} border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e`}
      />
    </div>
  )
}

MobileInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['medium', 'large']),
}

export default MobileInput

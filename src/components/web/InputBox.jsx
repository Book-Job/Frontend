import PropTypes from 'prop-types'

const InputBox = ({ placeholder, size = 'medium' }) => {
  const inputSize = {
    medium: 'w-[424px] h-[58px]',
    large: 'w-[656px] h-[58px]',
  }

  return (
    <div className='flex flex-col items-start justify-center ml-[16px]'>
      <input
        type='text'
        placeholder={placeholder}
        className={`${inputSize[size]} border border-gray-300 rounded px-4 text-[18px] text-gray-600 placeholder:text-[#8e8e8e]`}
      />
    </div>
  )
}

InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['medium', 'large']),
}

export default InputBox

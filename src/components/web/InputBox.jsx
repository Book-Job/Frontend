import PropTypes from 'prop-types'

const InputBox = ({ placeholder, width, active }) => {
  // const inputSize = {
  //   medium: 'w-[424px] h-[58px]',
  //   large: 'w-[565px] h-[58px]',
  // }

  return (
    <div className='flex flex-col items-start justify-center ml-[16px] line-clamp-1'>
      <input
        type='text'
        placeholder={placeholder}
        style={{ width: `${width}px`, height: '58px' }}
        className='border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e'
      />
    </div>
  )
}
InputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number,
}

export default InputBox

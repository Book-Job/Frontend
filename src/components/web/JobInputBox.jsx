import PropTypes from 'prop-types'

const JobInputBox = ({ placeholder }) => {
  return (
    <div className='flex flex-col items-start justify-center'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-[686px] h-[58px] border border-gray-8e8e8e rounded px-4 text-black focus:border-main-color-pink focus:outline-none'
      />
    </div>
  )
}

JobInputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
}

export default JobInputBox

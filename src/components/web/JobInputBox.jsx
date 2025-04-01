import PropTypes from 'prop-types'

const JobInputBox = ({ placeholder }) => {
  return (
    <div className='flex flex-col items-start justify-center ml-[19px]'>
      <input
        type='text'
        placeholder={placeholder}
        className='w-[686px] h-[58px] border border-gray-8e8e8e rounded px-4 text-[18px] text-black placeholder:text-gray-8e8e8e'
      />
    </div>
  )
}

JobInputBox.propTypes = {
  placeholder: PropTypes.string.isRequired,
}

export default JobInputBox

import PropTypes from 'prop-types'

const JobOption = ({ optionTitle, optionAnswer, className }) => {
  return (
    <div className={`grid grid-cols-[150px_1fr] ${className}`}>
      <span className='text-[16px] text-gray-8e8e8e font-medium text-left'>{optionTitle}</span>
      <span className='text-[16px] text-black font-medium text-left'>{optionAnswer}</span>
    </div>
  )
}

JobOption.propTypes = {
  optionTitle: PropTypes.string.isRequired,
  optionAnswer: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default JobOption

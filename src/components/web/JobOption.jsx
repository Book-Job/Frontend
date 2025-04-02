import PropTypes from 'prop-types'

const JobOption = ({ optionTitle, optionAnswer }) => {
  return (
    <div className='flex'>
      <span className='text-[16px] text-gray-8e8e8e mr-[44px] font-medium'>{optionTitle}</span>
      <span className='text-[16px] text-black font-medium'>{optionAnswer}</span>
    </div>
  )
}

JobOption.propTypes = {
  optionTitle: PropTypes.string.isRequired,
  optionAnswer: PropTypes.string.isRequired,
}

export default JobOption

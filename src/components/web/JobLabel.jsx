import PropTypes from 'prop-types'

const JobLabel = ({ label, dot }) => {
  return (
    <div className='flex'>
      {dot && <span className='text-red-500 text font-semibold'>*</span>}
      <span className='text-[24px] font-semibold'>{label}</span>
    </div>
  )
}

JobLabel.propTypes = {
  label: PropTypes.string.isRequired,
  dot: PropTypes.bool,
}

JobLabel.defaultProps = {
  dot: false,
}

export default JobLabel

import PropTypes from 'prop-types'

const JobLabel = ({ label, dot, className }) => {
  return (
    <div className={`flex ${className}`}>
      {dot && <span className='text-red-500 font-semibold'>*</span>}
      <span className='text-[24px] font-semibold'>{label}</span>
    </div>
  )
}

JobLabel.propTypes = {
  label: PropTypes.string.isRequired,
  dot: PropTypes.bool,
  className: PropTypes.string,
}

JobLabel.defaultProps = {
  dot: false,
  className: '',
}

export default JobLabel

import PropTypes from 'prop-types'

const JobLabel = ({ label, dot, className }) => {
  return (
    <div className='flex items-center'>
      {dot && <span className='text-error-red text-sm font-semibold'>*</span>}
      <span className={`font-semibold ${className} mr-[20px] inline-block`}>{label}</span>
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

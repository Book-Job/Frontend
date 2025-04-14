import PropTypes from 'prop-types'

const BoardCategory = ({ label, bgColor = '#ECFDF5', labelColor = '#1B7500', width = '81px' }) => {
  return (
    <button
      className='h-[24px] text-[14px] font-semibold'
      style={{
        backgroundColor: bgColor,
        color: labelColor,
        width,
        borderRadius: '6px',
      }}
    >
      {label}
    </button>
  )
}

BoardCategory.propTypes = {
  label: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  width: PropTypes.string,
}

export default BoardCategory

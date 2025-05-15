import PropTypes from 'prop-types'

const PinkButton = ({ label, type, ...props }) => {
  return (
    <button className='w-[226px] h-[58px] rounded-[5px] bg-main-pink' {...props}>
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

PinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  form: PropTypes.string,
}

export default PinkButton

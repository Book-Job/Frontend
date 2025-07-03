import PropTypes from 'prop-types'

const PinkButton = ({ label, ...props }) => {
  return (
    <button className='w-[226px] h-[56px] rounded-[5px] bg-main-pink' {...props}>
      <span className='text-base font-bold text-white sm:text-lg'>{label}</span>
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

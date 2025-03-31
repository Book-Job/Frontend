import PropTypes from 'prop-types'

const PinkButton = ({ label, onClick }) => {
  return (
    <button className='w-[226px] h-[58px] rounded-[5px] bg-[#E36397]' onClick={onClick}>
      <span className='font-bold text-[20px] text-white'>{label}</span>
    </button>
  )
}

PinkButton.PropTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PinkButton

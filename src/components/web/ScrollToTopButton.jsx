import PropTypes from 'prop-types'

const ScrollTopButton = ({ icon, onClick }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        className='w-[50px] h-[50px] rounded-full bg-white border-[0.5px] border-dark-gray flex items-center justify-center'
        onClick={onClick}
      >
        <img src={icon} alt='위로 올리는 버튼' className='w-[10px] h-[13px]' />
      </button>
    </div>
  )
}

ScrollTopButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ScrollTopButton

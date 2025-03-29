import PropTypes from 'prop-types'

const MyPageButton = ({ icon, label, onClick }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <button
        className='w-[100px] h-[100px] rounded-full bg-[#FDF8FA] flex items-center justify-center'
        onClick={onClick}
      >
        <img src={icon} alt='마이페이지 아이콘' className='w-[37px] h-[37px]' />
      </button>
      <span className='mt-[34px] text-[24px] text-center'>{label}</span>
    </div>
  )
}

MyPageButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

export default MyPageButton

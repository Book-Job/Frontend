import PropTypes from 'prop-types'

const CreatePostButton = ({ icon, label, onClick }) => {
  return (
    <button
      className='w-[60px] h-[60px] rounded-full bg-[#FFFFFF] border-[0.5px] border-[#8E8E8E] flex flex-col items-center justify-center gap-[5px]'
      onClick={onClick}
    >
      <img src={icon} alt='글 작성 버튼' className='w-[23px] h-[23px] mt-[7px]' />
      <span className='text-[10px] font-bold text-[#8E8E8E]'>{label}</span>
    </button>
  )
}

CreatePostButton.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CreatePostButton

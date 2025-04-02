import PropTypes from 'prop-types'
const TagIcon = ({ label, icon }) => {
  return (
    <div className='inline-flex items-center gap-1 rounded-[5px] w-auto h-[24px] bg-[#F6F6F6] px-1'>
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      <span className='flex font-semibold text-[12px] text-black'>{label}</span>
    </div>
  )
}

TagIcon.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default TagIcon

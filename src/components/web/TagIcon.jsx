import PropTypes from 'prop-types'

const TagIcon = ({ label, icon }) => {
  return (
    <div className='inline-flex items-center gap-1 rounded-[5px] h-[24px] bg-[#F6F6F6] px-2 pr-2 pl-2'>
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      <span className='text-[12px] font-semibold text-black'>{label}</span>
    </div>
  )
}

TagIcon.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default TagIcon

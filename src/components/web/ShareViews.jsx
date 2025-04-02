import PropTypes from 'prop-types'

const ShareViews = ({ label, icon, textColor }) => {
  return (
    <div className='inline-flex items-center gap-1 w-auto h-[24px] bg-none px-1'>
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      <span className={`flex font-semibold text-[12px] ${textColor}`}>{label}</span>
    </div>
  )
}

ShareViews.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
}

export default ShareViews

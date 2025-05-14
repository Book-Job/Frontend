import PropTypes from 'prop-types'

const MobileShare = ({ label, icon, textColor, weblink }) => {
  return (
    <div className='inline-flex items-center gap-1 w-auto h-[24px] bg-none'>
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      {weblink ? (
        <a href={weblink} target='_blank' rel='noopener noreferrer'>
          <span className={`flex font-semibold text-[12px] ${textColor}`}>{label}</span>
        </a>
      ) : (
        <span className={`flex font-semibold text-[12px] ${textColor}`}>{label}</span>
      )}
    </div>
  )
}

MobileShare.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  weblink: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
}

export default MobileShare

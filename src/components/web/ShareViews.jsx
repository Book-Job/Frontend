import PropTypes from 'prop-types'

const ShareViews = ({ label, icon, textColor = 'text-black', weblink }) => {
  return (
    <div className='inline-flex items-center gap-1 w-auto h-[24px] bg-none px-1'>
      {icon && <img src={icon} alt={label} className='w-[18px] h-[18px]' />}
      {weblink ? (
        <a href={weblink} target='_blank' rel='noopener noreferrer'>
          <span className={`flex font-semibold text-[14px] ${textColor}`}>{label}</span>
        </a>
      ) : (
        <span className={`flex font-semibold text-[14px] ${textColor}`}>{label}</span>
      )}
    </div>
  )
}

ShareViews.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  weblink: PropTypes.string,
  textColor: PropTypes.string,
}

export default ShareViews

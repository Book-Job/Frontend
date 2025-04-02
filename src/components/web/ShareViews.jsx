import PropTypes from 'prop-types'

<<<<<<< HEAD
const ShareViews = ({ label, icon, textColor, weblink }) => {
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
=======
const ShareViews = ({label,icon,textColor}) => {
  return (
    <div className='inline-flex items-center gap-1 w-auto h-[24px] bg-none px-1'>
      {icon && <img src={icon} alt={label} className='w-[16px] h-[16px]' />}
      <span className={`flex font-semibold text-[12px] ${textColor}`}>{label}</span>
    </div>
  );
};
>>>>>>> 66500cf (style: 1차 설정)

ShareViews.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
<<<<<<< HEAD
  weblink: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
}

export default ShareViews
=======
  textColor: PropTypes.string.isRequired,
}

export default ShareViews;
>>>>>>> 66500cf (style: 1차 설정)

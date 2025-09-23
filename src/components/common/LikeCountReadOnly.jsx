import PropTypes from 'prop-types'
import GoodIcon from '../../assets/icons/common/common_good.svg'

const LikeCountReadOnly = ({ count, className }) => {
  return (
    <div className={`flex items-center mb-1 ${className}`}>
      <img src={GoodIcon} alt='좋아요' className='w-4 h-4 mt-1 md:w-5 md:h-5' />
      <span className='flex mt-1 ml-1'>{count}</span>
    </div>
  )
}

LikeCountReadOnly.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
}

export default LikeCountReadOnly

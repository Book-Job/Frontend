import PropTypes from 'prop-types'
import viewPink from '../../assets/icons/common/common_view_pink.svg'
import comment from '../../assets/icons/common/comment.svg'
import MobileShare from './MobileShare'

const MobileFreeBoard = ({ title, content, name, date, onClick, comment1, view1 }) => {
  return (
    <div className='w-[336px] h-[160px]'>
      <div className='flex flex-col h-full  border border-dark-gray rounded-[10px] px-[20px] pt-[20px] pb-[16px] justify-between'>
        <div className='flex-row' onClick={onClick}>
          <div className='text-[18px] font-bold line-clamp-1'>{title}</div>
          <div className='mt-[5px] text-[14px] line-clamp-1'>{content}</div>
        </div>
        <div className='flex-row  text-dark-gray text-[14px]'>
          <div onClick={onClick} className='flex justify-between font-bold '>
            <MobileShare label={comment1} textColor='text-dark-gray' icon={comment} />
            <div>{name}</div>
          </div>
          <hr className='border-dark-gray my-1' />
          <div className='flex items-end justify-between'>
            {date}
            <MobileShare label={view1} textColor='text-main-pink' icon={viewPink} />
          </div>
        </div>
      </div>
    </div>
  )
}

MobileFreeBoard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment1: PropTypes.number.isRequired,
  view1: PropTypes.number.isRequired,
  onClick: PropTypes.func,
}
export default MobileFreeBoard
